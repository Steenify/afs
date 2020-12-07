import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NumberFormat from 'react-number-format';
import { get } from 'lodash';
import { toast } from 'react-toastify';

import Button from 'components/common/button';

import { PERMITTIONS_CONFIG } from 'configs';
import { formatNumber } from 'utils';

import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

import { updateOrderTableItemsAction, updateOrderTableBudgetAction, updateOrderTableSelectedOrderBudgetAction, adjustOrderBudgetTableAction } from 'components/tables/orders/actions';

const ACTION_CHANGE_TYPES = {
  Update: 'MODIFY',
  Increase: 'INCREASE',
  Decrease: 'DECREASE',
};

const OrderUpdateBudgetModal = ({
  reducer,
  listActions,
  isOpenEditBudget,
  selectedOrder,
  updateOrderTableSelectedOrderBudget,
  updateOrderTableBudget,
  updateOrderTableItems,
  adjustOrderBudgetTable,
}) => {
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');
  const [type, setType] = useState(listActions[0]);

  const onSave = (e) => {
    e.preventDefault();

    const number = parseInt(amount || 0, 10);

    if (!type) {
      toast.warn('Please select action!');
    }

    if (!amount) {
      toast.warn(`Please enter number`);
      return;
    }

    if (type === 'Update') {
      updateOrderTableItems({
        payload: {
          id: selectedOrder?.id,
          field: 'budget',
          value: amount,
        },
        reducer,
      });

      const payload = {
        id: selectedOrder?.id,
        budget: amount,
      };
      updateOrderTableBudget({
        payload,
        id: selectedOrder?.id,
        reducer,
        onSuccess: () => {
          toast.dark(`Order [#${selectedOrder?.number}]'s budget is changed to ${formatNumber(amount || 0)}$`);
          updateOrderTableSelectedOrderBudget({ payload: { isOpenEditBudget: false, selectedOrder: {} }, reducer });
          setAmount(0);
          setNote('');
        },
      });
    }

    if (type === 'Increase' || type === 'Decrease') {
      const mark = type === listActions[1] ? 1 : -1;
      const currentBudget = selectedOrder?.budget || 0;

      updateOrderTableItems({
        payload: {
          id: selectedOrder?.id,
          field: 'budget',
          value: mark * number + currentBudget,
        },
        reducer,
      });

      const data = {
        note,
        amount: mark * number,
        action: ACTION_CHANGE_TYPES[type] || '',
      };

      adjustOrderBudgetTable({
        orderId: selectedOrder?.id,
        data,
        onDone: () => {
          toast.dark(`Order [#${selectedOrder?.number}]'s budget is changed`);
          updateOrderTableSelectedOrderBudget({ payload: { isOpenEditBudget: false }, reducer });
          setAmount(0);
          setNote('');
        },
      });
    }
  };

  const toggle = () => updateOrderTableSelectedOrderBudget({ payload: { isOpenEditBudget: !isOpenEditBudget, selectedOrder: {} }, reducer });
  return (
    <Modal isOpen={isOpenEditBudget} toggle={toggle} fade={false} size='md' className='modal-dialog-centered  modal-no-border order__updatebudget'>
      <div className='changeBudgetModal'>
        <ModalHeader toggle={toggle}>
          <div className='d-flex align-items-center'>
            <div>Change Budget</div>
          </div>
          <button type='button' className='modal-close' onClick={toggle}>
            <CloseIcon width='25px' height='25px' />
          </button>
        </ModalHeader>
        <ModalBody>
          <div className='changeBudgetModal__types text-center'>
            <div className='btn-group ' role='group' aria-label='Basic example'>
              {listActions.map((t) => (
                <button type='button' onClick={() => setType(t)} key={`order__update__budget__type__${t}`} className={`btn btn-dark changeBudgetModal__type ${t === type ? 'active' : ''}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className=' mb-3'>
            <div className='label'>{`Amount:`}</div>
            <NumberFormat prefix={'$  '} thousandSeparator={true} className='form-control amount' value={amount} onValueChange={(data) => setAmount(data?.value || 0)} />
          </div>
          <span className='label'>Note:</span>
          <textarea className='form-control note' placeholder='Change budget note' onChange={(e) => setNote(e?.target?.value || '')} value={note} rows='3'></textarea>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' containerClassName='w-100' className='changeBudgetModal__save' onClick={onSave}>
            Save
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

const mapStateToProps = ({ orderTable, auth }, ownProps) => {
  const { reducer = 'orders' } = ownProps;
  const { accountInfo } = auth.data;
  const table = get(orderTable, `${reducer}`);
  let listActions = [];

  const canModify = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.MODIFY_BUDGET) || false;
  const canAdjust = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.ADJUST_BUDGET) || false;

  if (canModify) {
    listActions = [...listActions, 'Update'];
  }
  if (canAdjust) {
    listActions = [...listActions, 'Increase', 'Decrease'];
  }

  return {
    accountInfo: auth.data.accountInfo,
    listActions: listActions,
    selectedOrder: table?.ui?.selectedOrder,
    isOpenEditBudget: table?.ui?.isOpenEditBudget,
  };
};

const mapDispatchToProps = {
  updateOrderTableSelectedOrderBudget: updateOrderTableSelectedOrderBudgetAction,
  updateOrderTableItems: updateOrderTableItemsAction,
  updateOrderTableBudget: updateOrderTableBudgetAction,
  adjustOrderBudgetTable: adjustOrderBudgetTableAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderUpdateBudgetModal);
