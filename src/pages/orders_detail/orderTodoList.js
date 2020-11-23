import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import { findIndex } from 'lodash';

import CanShow from 'components/layout/canshow';
import Button from 'components/common/button';
import { PERMITTIONS_CONFIG } from 'configs';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import { getOrderTodoListAction, createOrderTodoListAction, editOrderTodoListAction, resolvedOrderTodoListAction } from './actions';

const OrderCustomerBox = ({ order, todos, loadingTodo, getOrderTodoList, createOrderTodoList, editOrderTodoList, resolvedOrderTodoList }) => {
  useEffect(() => {
    getOrderTodoList(order.id);
  }, [order.id, getOrderTodoList]);

  const textBox = useRef(null);

  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  const handleChangeText = (e) => {
    const { value } = e.target;
    if (value === '') {
      setEditId(null);
    }
    setText(value);
  };

  const handleCreateTodo = (e) => {
    e.preventDefault();

    if (!text) {
      toast.warn('Please descript what need to do!');
    }

    const payload = {
      detail: text,
    };

    if (editId) {
      const index = findIndex(todos, (to) => to.id === editId);
      console.log('🚀 ~ file: orderTodoList.js ~ line 44 ~ handleCreateTodo ~ index', index);
      editOrderTodoList(order.id, editId, payload, index, () => {
        setText('');
        setEditId(null);
        toast.dark(`[${order.number}] updated todo`);
      });
    } else {
      createOrderTodoList(order.id, payload, () => {
        setText('');
        setEditId(null);
        toast.dark(`[${order.number}] added todo`);
      });
    }
  };

  const handleSetUpdate = (to) => {
    setEditId(to.id);
    setText(to.detail);

    if (textBox.current) {
      textBox.current.focus();
    }
  };

  const handleResolvedTodo = (to) => {
    const index = findIndex(todos, (t) => t.id === to.id);
    resolvedOrderTodoList(order.id, to.id, index, () => {
      toast.dark(`[${order.number}] resolved todo`);
    });
  };

  if (!todos.length && loadingTodo) {
    return (
      <div style={{ minHeight: '100px' }} className='order_detail__customer box d-flex align-items-center justify-content-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={`order_detail__customer box`}>
      <div className='box__header mb-3'>
        <div className='box__title'>To-dos </div>
        <div className='control'></div>
      </div>
      <div className='box__body'>
        <div className='order_detail__todos todo'>
          <CanShow permission={PERMITTIONS_CONFIG.CREATE_ORDER_TODO_LIST}>
            <div className='todo__create'>
              <form onSubmit={handleCreateTodo} className='todo__form'>
                <input ref={textBox} type='text' placeholder='Todo description' value={text} onChange={handleChangeText} className='todo__input form-control' />
                <Button color='primary' style={{ minHeight: 'auto', height: 35 }} onClick={handleCreateTodo}>
                  {editId ? 'Edit' : 'Add'}
                </Button>
              </form>
            </div>
          </CanShow>

          {todos.map((to) => (
            <div key={`order__todo__item__${to.id}`} className={`todo__item ${to.status}`}>
              <CanShow permission={PERMITTIONS_CONFIG.RESOLVED_ORDER_TODO_LIST}>
                <div className='todo__icon'>
                  <label className='cus-checkbox'>
                    <input className='form-control sr-only' type='checkbox' onChange={() => handleResolvedTodo(to)} checked={to.status !== 'CREATED'} />
                    <span className='checkmark'></span>
                  </label>
                </div>
              </CanShow>

              <div className='todo__text'>{to.detail}</div>
              <CanShow permission={PERMITTIONS_CONFIG.EDIT_ORDER_TODO_LIST}>
                <button type='button' className='todo__edit' onClick={() => handleSetUpdate(to)}>
                  <div className='span'>
                    <Pencil />
                  </div>
                </button>
              </CanShow>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ orderDetail, auth }) => ({
  accountInfo: auth.data.accountInfo,
  loadingTodo: orderDetail.ui.loadingTodo,
  order: orderDetail.data.order,
  todos: orderDetail.data.todos || [],
});

const mapDispatchToProps = {
  getOrderTodoList: getOrderTodoListAction,
  createOrderTodoList: createOrderTodoListAction,
  editOrderTodoList: editOrderTodoListAction,
  resolvedOrderTodoList: resolvedOrderTodoListAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderCustomerBox);
