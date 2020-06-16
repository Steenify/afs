import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Popover from 'react-tiny-popover';

import Button from 'components/common/button';

import { formatMoney, formatNumber } from 'utils';

import { PERMITTIONS_CONFIG } from 'config';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

const OrderBudgetCell = ({
  row: { index, original },
  column: { id },
  updateCell,
  accountInfo,
}) => {
  const { budget } = original;
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
    if (value === budget) {
      toast.warn('Please update new Budget');
      return;
    }
    updateCell(index, id, value, original);
    toggle();
  };

  useEffect(() => {
    setValue(budget || '');
  }, [budget]);

  if (!accountInfo) {
    return '';
  }

  if (!accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.MODIFY_BUDGET)) {
    return <div className=''>{formatMoney(original?.budget)}</div>;
  }

  return (
    <Popover
      isOpen={isPopoverOpen}
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
          className='order__toggle order__user text-left w-100'>
          <div className='d-flex justify-content-end'>
            <span className='icon d-block mr-1'>
              <Pencil width='14px' height='14px' />
            </span>
            {formatNumber(original?.budget || 0)}$
          </div>
        </button>
      )}
    </Popover>
  );
};

const mapStateToProps = ({ order, auth }) => ({
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBudgetCell);
