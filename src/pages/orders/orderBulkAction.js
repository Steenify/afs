import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { forEach, filter } from 'lodash';

import { statusPayments } from 'config';

import OrderSelectedCell from './orderSelectedAll';

import {
  updateOrderPaymentStatusBulkAction,
  updateAllOrderSelectedAction,
} from './actions';

const OrderBulkAction = ({
  selected,
  updateOrderPaymentStatusBulk,
  updateOrder,
  updateAllOrderSelected,
}) => {
  if (!selected || !selected?.length) {
    return null;
  }

  const handleChangeStatus = (status) => {
    const ids = selected.map((item) => item?.original?.id);
    updateOrderPaymentStatusBulk(
      status,
      {
        id: ids,
      },
      () => {
        toast.success('Status Updated');
        forEach(selected, (item) => {
          updateOrder({
            index: item.index,
            key: 'artistPaymentStatus',
            value: status,
          });
        });
        updateAllOrderSelected(false);
      },
    );
  };

  return (
    <div className='order__bulk'>
      <div className='btn-group'>
        <div className='btn btn-group__item'>
          <div className='d-flex align-items-center order__bulk__selected'>
            <OrderSelectedCell />
            <span className='number'>{selected?.length} selected</span>
          </div>
        </div>
        <button
          className='btn btn-group__item'
          onClick={() => handleChangeStatus(statusPayments[0])}>
          Paid
        </button>
        <button
          type='button'
          className='btn btn-group__item'
          onClick={() => handleChangeStatus(statusPayments[1])}>
          Unpaid
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ order, auth }) => {
  const { orders } = order.list;
  const selected = filter(orders, (or) => or.selected);
  return {
    accountInfo: auth.data.accountInfo,
    selected,
  };
};

const mapDispatchToProps = {
  updateOrderPaymentStatusBulk: updateOrderPaymentStatusBulkAction,
  updateAllOrderSelected: updateAllOrderSelectedAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBulkAction);
