import React from 'react';
import Button from 'components/common/button';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { forEach, filter } from 'lodash';

import { statusPayments } from 'config';

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
      {statusPayments.map((status) => (
        <Button
          key={`list__stastus__payment__${status}`}
          color='primary'
          className='order__bulk__item'
          onClick={() => handleChangeStatus(status)}>
          {status}
        </Button>
      ))}
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
