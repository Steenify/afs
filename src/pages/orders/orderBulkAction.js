import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { forEach, filter } from 'lodash';
import { statusPayments } from 'config';

import OrderSelectedCell from './orderSelectedAll';
import OrderPayoutModal from './orderPayoutModal';

import {
  updateOrderPaymentStatusBulkAction,
  updateAllOrderSelectedAction,
  updateOrderItemsAcion,
  updateOrderStatusDoneBulkAction,
} from './actions';

const OrderBulkAction = ({
  selected,
  updateOrderPaymentStatusBulk,
  updateAllOrderSelected,
  updateOrderItems,
  updateOrderStatusDoneBulk,
}) => {
  const isHide = !selected || !selected?.length;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleChangeStatus = (status) => {
    updateOrderPaymentStatusBulk(
      status,
      {
        id: selected,
      },
      () => {
        toast.dark('Payment Status Updated');
        forEach(selected, (item) => {
          updateOrderItems({
            id: item,
            field: 'artistPaymentStatus',
            value: status,
          });
        });
        // updateAllOrderSelected(false);
      },
    );
  };

  const handleUpdateOrderStatusDone = () => {
    updateOrderStatusDoneBulk(
      {
        id: selected,
      },
      () => {
        toast.dark('Order Status Updated');
        forEach(selected, (item) => {
          updateOrderItems({
            id: item,
            field: 'status',
            value: 'DONE',
          });
        });
        // updateAllOrderSelected(false);
      },
    );
  };

  return (
    <div className={`order__bulk ${isHide && 'd-none'}`}>
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
        <button
          type='button'
          className='btn btn-group__item'
          onClick={handleUpdateOrderStatusDone}>
          Mark as Done
        </button>
        {/* <button type='button' className='btn btn-group__item' onClick={toggle}>
          Open payout modal
        </button> */}
      </div>

      <OrderPayoutModal isOpen={isOpen} toggle={toggle} />
    </div>
  );
};

const mapStateToProps = ({ order, auth }) => {
  const { items } = order.list;
  const selected = filter(items, (or) => or.selected).map((or) => or.id);
  return {
    accountInfo: auth.data.accountInfo,
    selected,
  };
};

const mapDispatchToProps = {
  updateOrderPaymentStatusBulk: updateOrderPaymentStatusBulkAction,
  updateAllOrderSelected: updateAllOrderSelectedAction,
  updateOrderItems: updateOrderItemsAcion,
  updateOrderStatusDoneBulk: updateOrderStatusDoneBulkAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBulkAction);
