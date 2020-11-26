import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import InPageLoading from 'components/common/inPageLoading';
import CanShow from 'components/layout/canshow';

import { PERMITTIONS_CONFIG, statusPayments, mapStatusPayment, ORDER_STATUS_FRIENDLY } from 'configs';
import { dateTimeStringFromDate, getSelectedStatus } from 'utils';

import EmaiNotify from './emailNotify';
import EmailRemind from './remindCustomer';
import AddProductModal from './addProductModal';
import AssignedBoxModal from './assignedBoxModal';
import BudgetHistoryModal from './budgetHistoryModal';
import ChangeArtistModal from './changeArtistModal';
import ChangeBudgetModal from './changeBudgetModal';
import OrderAssignedItem from './orderAssignedItem';
import OrderCustomerBox from './orderCustomerBox';
import OrderDetailItemList from './orderDetailItemList';

const OrderDetail = ({ loading, order, status }) => {
  if (isEmpty(order) || !status.length) {
    return <InPageLoading isLoading={loading} />;
  }

  return (
    <div className='order_detail'>
      <div className='order_detail__header'>
        <div className='row align-items-start'>
          <div className='col-12'>
            <div className='info__left mb-3'>
              <div className='number'>#{order?.number}</div>
              <div className='status'>
                <span className={`order__status mr-2 ${order?.artistPaymentStatus || statusPayments[1]}}`}> {mapStatusPayment[order?.artistPaymentStatus] || mapStatusPayment.UNPAID}</span>
                <span className={`order__status mr-2 ${order.overallStatus}`}>{getSelectedStatus(order.overallStatus, ORDER_STATUS_FRIENDLY).friendlyName}</span>
              </div>
              <div className='deadline'>
                <strong>Deadline: </strong>
                {dateTimeStringFromDate(order.deadline)}
              </div>
            </div>
          </div>
          <div className='col-12'>
            <OrderAssignedItem />
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-8'>
          <OrderDetailItemList />
        </div>
        <div className='col-lg-4 order_detail__customer_box'>
          <OrderCustomerBox order={order} customer={order.customer} />
        </div>
      </div>

      <InPageLoading isLoading={loading} />
      <EmaiNotify order={order} />
      <EmailRemind order={order} />
      <AddProductModal order={order} />
      <CanShow permission={PERMITTIONS_CONFIG.ASSIGN_BOOKING}>
        <AssignedBoxModal order={order} />
        <ChangeArtistModal order={order} />
      </CanShow>
      <BudgetHistoryModal order={order} />
      <ChangeBudgetModal order={order} />
    </div>
  );
};

const mapStateToProps = ({ orderDetail, orderTable }) => {
  return {
    loading: orderDetail.ui.loading,
    order: orderDetail.data.order,
    status: orderTable.orders.status,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
