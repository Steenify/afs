import React, { useState, useEffect } from 'react';
import { DropdownMenu, DropdownToggle, Dropdown } from 'reactstrap';
import Button from 'components/common/button';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { formatMoney } from 'utils';

import { PERMITTIONS_CONFIG } from 'config';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import { updateOrdersBudgetAction } from '../orders/actions';

const OrderBudget = ({ order, accountInfo, updateOrdersBudget }) => {
  const { budget } = order;
  const [value, setValue] = useState(budget || '');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSave = (e) => {
    e.preventDefault();

    if (value < 1) {
      toast.warn("Budget can't be negative");
      return;
    }
    if (value === order.budget) {
      toast.warn('Please update new Budget');
      return;
    }

    const payload = {
      id: order.id,
      budget: value,
    };
    updateOrdersBudget(payload, order.id, () => {
      toast.success('updated order budget!');
    });
    toggle();
  };

  useEffect(() => {
    setValue(budget || '');
  }, [budget]);

  if (!accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.MODIFY_BUDGET)) {
    return (
      <div className='budget'>
        Budget: <span>{formatMoney(order.budget)} </span>
      </div>
    );
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className='order__toggle budget p-0'>
        <div className='d-flex align-items-end'>
          <strong className='mb-1 mr-2'> Budget:</strong>
          <span>{formatMoney(order.budget)} </span>
          <span className='icon d-block ml-1'>
            <Pencil width='14px' height='14px' />
          </span>
        </div>
      </DropdownToggle>

      <DropdownMenu className='order__dropdowns'>
        <form action='' onSubmit={onSave}>
          <div className='order__budget'>
            <input
              type='number'
              name='newbudget'
              placeholder='new budget'
              value={value}
              onChange={onChange}
              className='form-control bugdet__input'
            />
            <Button
              onClick={onSave}
              className='bugdet__btn'
              type='button'
              color='primary'>
              Save
            </Button>
          </div>
        </form>
      </DropdownMenu>
    </Dropdown>
  );
};

const mapStateToProps = ({ auth }) => ({
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {
  updateOrdersBudget: updateOrdersBudgetAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBudget);
