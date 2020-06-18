import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { forEach, filter, findIndex, isEmpty, lowerCase } from 'lodash';
// import Popover from 'react-tiny-popover';
import { statusPayments, PERMITTIONS_CONFIG } from 'config';
// import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

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
  orders,
}) => {
  if (!selected || !selected?.length) {
    return null;
  }

  // const [search, setSearch] = useState('');
  // const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // const toggle = () => setIsPopoverOpen(!isPopoverOpen);

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
          const index = findIndex(orders, (o) => o.id === item.id);
          updateOrder({
            index: index,
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
    orders,
  };
};

const mapDispatchToProps = {
  updateOrderPaymentStatusBulk: updateOrderPaymentStatusBulkAction,
  updateAllOrderSelected: updateAllOrderSelectedAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBulkAction);
