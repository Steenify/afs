import React from 'react';
import { connect } from 'react-redux';
import { isEmpty, filter, includes } from 'lodash';

import InPageLoading from 'components/common/inPageLoading';

import { PERMITTIONS_CONFIG, filterOrderItems, filterOrderItemsAdmin } from 'configs';
import { dateTimeStringFromDate, getSelectedStatus, getOrderItem } from 'utils';

import OrderSumaryBox from './orderSumaryBox';
import OrderItemBox from './orderItemBox';
import OrderArtWorkBox from './orderArtWorkBox';
import OrderCanvasWorkBox from './orderCanvasWorkBox';
import EmaiNotify from './emailNotify';
import OrderBudget from './orderBudget';
import OrderAssignedBox from './orderAssignedBox';

const OrderDetail = ({ loading, order, status, accountInfo }) => {
  if (isEmpty(order) || !status.length) {
    return <InPageLoading isLoading={loading} />;
  }

  const canEditAssign = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.ASSIGN_BOOKING) || false;
  const canGetArtists = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.VIEW_ARTIST_LIST) || false;

  const SHOW_POSTER = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.SHOW_POSTER);
  const itemsToFilter = SHOW_POSTER ? filterOrderItemsAdmin : filterOrderItems;

  let hasFaster = false;
  let artworkItems = [],
    canvasItems = [];
  order.items.forEach((item) => {
    if (getOrderItem(item.name) === filterOrderItems[1] || getOrderItem(item.name) === filterOrderItems[0]) {
      hasFaster = true;
    }
    if (!includes(itemsToFilter, getOrderItem(item.name))) {
      if (item.productType === 'CANVAS') canvasItems.push(item);
      else artworkItems.push(item);
    }
  });
  // const filteredItems = filter(order.items, (item) => {
  //   if (getOrderItem(item.name) === filterOrderItems[1] || getOrderItem(item.name) === filterOrderItems[0]) {
  //     hasFaster = true;
  //   }
  //   return !includes(itemsToFilter, getOrderItem(item.name));
  // });

  return (
    <div className='order_detail'>
      <div className='order_detail__header'>
        <div className='row no-gutters align-items-center'>
          <div className='col-lg-6 col-xl-7'>
            <div className='info__left'>
              <div className='number'>#{order?.number}</div>
              <div className='status'>
                <span className={`order__status ${getSelectedStatus(order.status, status).name}`}>{getSelectedStatus(order.status, status).friendlyName}</span>
              </div>
              <div className='deadline'>
                <strong>Deadline: </strong>
                {dateTimeStringFromDate(order.deadline)}
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-xl-5 text-right'>
            <div className='info__right'>
              {canEditAssign && canGetArtists && <OrderAssignedBox order={order} />}
              <OrderBudget order={order} />
            </div>
          </div>
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
      <OrderArtWorkBox order={order} />

      {process.env.REACT_APP_BUILD === 'DEV' && canvasItems.length > 0 && (
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
          {order.status === 'DONE' && <OrderCanvasWorkBox order={order} />}
        </>
      )}

      <InPageLoading isLoading={loading} />
      <EmaiNotify order={order} />
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
