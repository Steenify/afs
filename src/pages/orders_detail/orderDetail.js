import React from 'react';
import { connect } from 'react-redux';
import { isEmpty, includes } from 'lodash';

import InPageLoading from 'components/common/inPageLoading';
import CanShow from 'components/layout/canshow';

import { PERMITTIONS_CONFIG, filterOrderItems, filterOrderItemsAdmin, statusPayments, mapStatusPayment } from 'configs';
import { dateTimeStringFromDate, getSelectedStatus, getOrderItem } from 'utils';

import OrderSumaryBox from './orderSumaryBox';
import OrderItemBox from './orderItemBox';
import OrderArtWorkBox from './orderArtWorkBox';
import OrderCanvasWorkBox from './orderCanvasWorkBox';
import EmaiNotify from './emailNotify';
import EmailRemind from './remindCustomer';
import AddProductModal from './modal/addProductModal';
import AssignedBoxModal from './modal/assignedBoxModal';
import BudgetHistoryModal from './modal/budgetHistoryModal';
import ChangeArtistModal from './modal/changeArtistModal';
import ChangeBudgetModal from './modal/changeBudgetModal';
// import OrderAssignedItem from './orderAssignedItem';

import OrderAssignedBox from './orderAssignedBox';
import OrderBudget from './orderBudget';

import { updateShowAssignedBoxAction, ASSIGNED_MODAL_KEYs } from './actions';

const OrderDetail = ({ loading, order, status, accountInfo, updateShowAssignedBox }) => {
  if (isEmpty(order) || !status.length) {
    return <InPageLoading isLoading={loading} />;
  }

  const SHOW_POSTER = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.SHOW_POSTER);
  const itemsToFilter = SHOW_POSTER ? filterOrderItemsAdmin : filterOrderItems;

  const canEditAssign = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.ASSIGN_BOOKING) || false;
  const canGetArtists = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.VIEW_ARTIST_LIST) || false;
  // const isUnpaid = order?.artistPaymentStatus === 'UNPAID';

  let hasFaster = false;
  let artworkItems = [],
    canvasItems = [];
  order.items.forEach((item) => {
    if (getOrderItem(item.name) === filterOrderItems[1]) {
      hasFaster = true;
    }
    if (!includes(itemsToFilter, getOrderItem(item.name))) {
      if (item.productType === 'CANVAS') canvasItems.push(item);
      else artworkItems.push(item);
    }
  });

  return (
    <div className='order_detail'>
      <div className='order_detail__header'>
        <div className='row align-items-start'>
          <div className='col-lg-6 col-xl-7'>
            <div className='info__left mb-3'>
              <div className='number'>#{order?.number}</div>
              <div className='status'>
                <span className={`order__status mr-2 ${order?.artistPaymentStatus || statusPayments[1]}}`}> {mapStatusPayment[order?.artistPaymentStatus] || mapStatusPayment.UNPAID}</span>
                <span className={`order__status mr-2 ${getSelectedStatus(order.status, status).name}`}>{getSelectedStatus(order.status, status).friendlyName}</span>
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

      {artworkItems.map((item) => (
        <div className='row' key={`order_list_item_${item.id}`}>
          <div className='col-lg-6'>
            <div className='order_detail__wrapper'>
              <OrderItemBox hasFaster={hasFaster} item={item} order={order} />
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='order_detail__wrapper'>
              <OrderSumaryBox item={item} order={order} />
            </div>
          </div>
        </div>
      ))}
      <OrderArtWorkBox order={order} hasPoster={canvasItems.length > 0} />

      {SHOW_POSTER && canvasItems.length > 0 && (
        <>
          <div className='order_detail__header canvas'>
            <div className='row no-gutters align-items-center'>
              <div className='col-lg-6 col-xl-7'>
                <div className='info__left'>
                  <div className='number'>Canvas</div>
                  {order.statusForCanvas && (
                    <div className='status'>
                      <span className={`order__status ${getSelectedStatus(order.statusForCanvas, status).name}`}>{getSelectedStatus(order.statusForCanvas, status).friendlyName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {canvasItems.map((item) => (
            <div className='row' key={`order_list_item_${item.id}`}>
              <div className='col-lg-6'>
                <div className='order_detail__wrapper'>
                  <OrderItemBox hasFaster={hasFaster} item={item} order={order} />
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='order_detail__wrapper'>
                  <OrderSumaryBox item={item} order={order} />
                </div>
              </div>
            </div>
          ))}
          {(order.status === 'SEND_FILE' || order.status === 'DONE') && <OrderCanvasWorkBox order={order} />}
        </>
      )}

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

const mapStateToProps = ({ orderDetail, orderTable, auth }) => {
  return {
    loading: orderDetail.ui.loading,
    order: orderDetail.data.order,
    status: orderTable.orders.status,
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {
  updateShowAssignedBox: updateShowAssignedBoxAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
