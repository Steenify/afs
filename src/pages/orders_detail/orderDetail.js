import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import InPageLoading from 'components/common/inPageLoading';
import CanShow from 'components/layout/canshow';

import { PERMITTIONS_CONFIG, statusPayments, mapStatusPayment, ORDER_STATUS_FRIENDLY } from 'configs';
import { dateTimeStringFromDate, getSelectedStatus } from 'utils';

import EmaiNotify from './emailNotify';
import EmailRemind from './remindCustomer';
import AddProductModal from './modal/addProductModal';
import AssignedBoxModal from './modal/assignedBoxModal';
import BudgetHistoryModal from './modal/budgetHistoryModal';
import ChangeArtistModal from './modal/changeArtistModal';
import ChangeBudgetModal from './modal/changeBudgetModal';
import OrderDetailItemList from './orderDetailItemList';

import OrderAssignedBox from './orderAssignedBox';
import OrderBudget from './orderBudget';

import { updateShowAssignedBoxAction, ASSIGNED_MODAL_KEYs } from './actions';

const OrderDetail = ({ loading, order, status, accountInfo, updateShowAssignedBox }) => {
  if (isEmpty(order) || !status.length) {
    return <InPageLoading isLoading={loading} />;
  }

  return (
    <div className='order_detail'>
      <div className='order_detail__header'>
        <div className='row align-items-start'>
          <div className='col-lg-6 col-xl-7'>
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
          <div className='col-lg-6 col-xl-5'>
            <div className='info__right '>
              {canEditAssign && canGetArtists && <OrderAssignedBox order={order} />}
              <OrderBudget order={order} />
            </div>
            <CanShow permission={PERMITTIONS_CONFIG.VIEW_ALL_ARTIST_TABS}>
              <div className='d-flex flex-wrap justify-content-end align-items-center  mt-3'>
                <CanShow permission={PERMITTIONS_CONFIG.GET_ARTIST_BUDGET}>
                  <button type='button' onClick={() => updateShowAssignedBox(ASSIGNED_MODAL_KEYs.BUDGET_HISTORY)} className='btn info__cta info__history btn-dark'>
                    Budget History
                  </button>
                </CanShow>
                <CanShow permission={PERMITTIONS_CONFIG.ADJUST_BUDGET}>
                  <button type='button' onClick={() => updateShowAssignedBox(ASSIGNED_MODAL_KEYs.INCREASE_BUDGET)} className='btn info__cta info__increase btn-success'>
                    Increase $
                  </button>
                  <button type='button' onClick={() => updateShowAssignedBox(ASSIGNED_MODAL_KEYs.DECREASE_BUDGET)} className='btn info__cta info__decrease btn-danger'>
                    Decrease $
                  </button>
                </CanShow>
              </div>
            </CanShow>
          </div>

          {/* <div className='col-12'>
            <div className='d-lg-none'>
              <OrderAssignedItem />
            </div>
          </div> */}
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

const mapDispatchToProps = {
  updateShowAssignedBox: updateShowAssignedBoxAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
