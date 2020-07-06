import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import Button from 'components/common/button';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Popover from 'react-tiny-popover';

import { formatMoney } from 'utils';

import { PERMITTIONS_CONFIG } from 'config';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import { updateOrdersBudgetAction } from '../orders/actions';

class OrderBudget extends Component {
  constructor() {
    super();
    this.state = {
      isPopoverOpen: false,
      value: 0,
    };
  }

  toggle = () => {
    this.setState((prevState) => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  onChange = (data) => {
    this.setState({ value: data.value });
  };

  onSave = (e) => {
    e.preventDefault();
    const { value, isPopoverOpen } = this.state;
    const { order, updateOrdersBudget } = this.props;

    const number = parseInt(value || 0, 10);

    if (number < 1) {
      toast.warn("Budget can't be negative");
      return;
    }
    if (number === order.budget) {
      toast.warn('Please update new Budget');
      return;
    }

    this.setState(
      {
        isPopoverOpen: !isPopoverOpen,
      },
      () => {
        const payload = {
          id: order.id,
          budget: number,
        };
        updateOrdersBudget(payload, order.id, () => {
          toast.dark(
            `Order [#${order?.number}]'s budget is changed to ${formatMoney(
              number || 0,
            )}$`,
          );
        });
      },
    );
  };

  render() {
    const { accountInfo, order } = this.props;
    const { isPopoverOpen, value } = this.state;

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
        transitionDuration={0.000001}
        padding={10}
        onClickOutside={this.toggle}
        content={() => (
          <div className='order__info order__user p-3'>
            <form action='' onSubmit={this.onSave}>
              <div className='order__budget'>
                <div className='data'>
                  <strong className='title'>Budget</strong>
                  <NumberFormat
                    prefix={'$  '}
                    thousandSeparator={true}
                    className='form-control bugdet__input'
                    value={value}
                    onValueChange={this.onChange}
                  />
                </div>
                <div className='ctas'>
                  <Button
                    onClick={this.toggle}
                    className='bugdet__cancel cta pl-0'
                    type='button'
                    color='link'>
                    Cancel
                  </Button>
                  <Button
                    onClick={this.onSave}
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
        <button
          onClick={this.toggle}
          className='order__toggle order__budget budget p-0'>
          <div className='d-flex align-items-end'>
            <strong className='mr-2'> Budget:</strong>
            <span>{formatMoney(order.budget)} </span>
            <span className='icon d-block ml-1'>
              <Pencil width='14px' height='14px' />
            </span>
          </div>
        </button>
      </Popover>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {
  updateOrdersBudget: updateOrdersBudgetAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBudget);
