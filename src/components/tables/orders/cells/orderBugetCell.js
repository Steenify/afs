import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Popover from 'react-tiny-popover';
import { get } from 'lodash';

import Button from 'components/common/button';

import { formatMoney, formatNumber } from 'utils';

import { PERMITTIONS_CONFIG } from 'configs';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import { updateOrderTableItemsAction, updateOrderTableBudgetAction } from 'components/tables/orders/actions';

const OrderBudgetCell = ({ budget, accountInfo, id, updateOrderTableBudgetAction, updateOrderTableItemsAction, number, reducer }) => {
  const [value, setValue] = useState(budget || '');

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  useEffect(() => {
    setValue(budget || '');
  }, [budget]);

  const onChange = (data) => {
    setValue(data.value);
  };

  const onSave = (e) => {
    e.preventDefault();

    if (value < 1) {
      toast.warn("Budget can't be negative");
      return;
    }
    if (value === budget) {
      toast.warn('Please update new Budget');
      return;
    }
    toggle();

    updateOrderTableItemsAction({
      payload: {
        id: id,
        field: 'budget',
        value: value,
      },
      reducer,
    });

    const payload = {
      id: id,
      budget: value,
    };
    updateOrderTableBudgetAction({ payload, id, reducer, onSuccess: () => toast.dark(`Order [#${number}]'s budget is changed to ${formatNumber(value || 0)}$`) });
  };

  if (!accountInfo) {
    return '';
  }

  if (!accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.MODIFY_BUDGET)) {
    return <div className=''>{formatMoney(budget)}</div>;
  }

  return (
    <Popover
      isOpen={isPopoverOpen}
      transitionDuration={0.000001}
      position={'bottom'}
      padding={10}
      disableReposition
      onClickOutside={toggle}
      content={() => (
        <div className='order__info order__user p-3'>
          <form action='' onSubmit={onSave}>
            <div className='order__budget'>
              <div className='data'>
                <strong className='title'>Budget</strong>
                <NumberFormat prefix={'$  '} thousandSeparator={true} className='form-control bugdet__input' value={value} onValueChange={onChange} />
              </div>
              <div className='ctas'>
                <Button onClick={toggle} className='bugdet__cancel cta pl-0' type='button' color='link'>
                  Cancel
                </Button>
                <Button onClick={onSave} className='bugdet__save cta pr-0' type='button' color='link'>
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}>
      <button onClick={() => setIsPopoverOpen(!isPopoverOpen)} className='order__toggle order__user text-left w-100'>
        <div className='d-flex justify-content-end'>
          <span className='icon d-block mr-1'>
            <Pencil width='14px' height='14px' />
          </span>
          {formatNumber(budget || 0)}$
        </div>
      </button>
    </Popover>
  );
};

const mapStateToProps = (reducers, ownProps) => {
  const { auth } = reducers;
  const { data, reducer = 'orders' } = ownProps;
  const item = get(reducers, `orderTable.${reducer}.table.items`)?.[data] || {};
  return {
    number: item?.number || '',
    id: item?.id,
    budget: item?.budget || 0,
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {
  updateOrderTableBudgetAction,
  updateOrderTableItemsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBudgetCell);
