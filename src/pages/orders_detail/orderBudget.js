import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import Button from 'components/common/button';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Popover from 'react-tiny-popover';

import { formatMoney } from 'utils';

import { PERMITTIONS_CONFIG } from 'config';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import { updateOrdersBudgetAction } from '../orders/actions';

const OrderBudget = ({ order, accountInfo, updateOrdersBudget }) => {
  const { budget } = order;
  const [value, setValue] = useState(budget || '');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const onChange = (data) => {
    setValue(data.value);
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
    <Popover
      isOpen={isPopoverOpen}
      position={'bottom'}
      padding={10}
      onClickOutside={toggle}
      content={() => (
        <div className='order__info order__user p-3'>
          <form action='' onSubmit={onSave}>
            <div className='order__budget'>
              <div className='data'>
                <strong className='title'>Budget</strong>
                <NumberFormat
                  prefix={'$  '}
                  thousandSeparator={true}
                  className='form-control bugdet__input'
                  value={value}
                  onValueChange={onChange}
                />
              </div>
              <div className='ctas'>
                <Button
                  onClick={toggle}
                  className='bugdet__cancel cta pl-0'
                  type='button'
                  color='link'>
                  Cancel
                </Button>
                <Button
                  onClick={onSave}
                  className='bugdet__save cta pr-0'
                  type='button'
                  color='link'>
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}>
      {(ref) => (
        <button
          ref={ref}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          className='order__toggle order__budget budget p-0'>
          <div className='d-flex align-items-end'>
            <strong className='mr-2'> Budget:</strong>
            <span>{formatMoney(order.budget)} </span>
            <span className='icon d-block ml-1'>
              <Pencil width='14px' height='14px' />
            </span>
          </div>
        </button>
      )}
    </Popover>
  );
};

const mapStateToProps = ({ auth }) => ({
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {
  updateOrdersBudget: updateOrdersBudgetAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBudget);
