import React from 'react';
import { connect } from 'react-redux';
import { isEmpty, filter } from 'lodash';

import InPageLoading from 'components/common/inPageLoading';

import { PERMITTIONS_CONFIG } from 'config';
import { dateTimeStringFromDate, getSelectedStatus, getOrderItem } from 'utils';

import OrderSumaryBox from './orderSumaryBox';
import OrderItemBox from './orderItemBox';
import OrderArtWorkBox from './orderArtWorkBox';
import EmaiNotify from './emailNotify';
import OrderBudget from './orderBudget';
import OrderAssignedBox from './orderAssignedBox';

const OrderDetail = ({ loading, order, status, accountInfo }) => {
  if (isEmpty(order) || !status.length) {
    return <InPageLoading isLoading={loading} />;
  }

  let hasFaster = false;

  const filteredItems = filter(order.items, (item) => {
    if (getOrderItem(item.name) === 'Faster Processing') {
      hasFaster = true;
    }
    return getOrderItem(item.name) !== 'Faster Processing';
  });

  const canEditAssign =
    accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.ASSIGN_BOOKING) ||
    false;

  return (
    <div className='order_detail'>
      <div className='order_detail__header'>
        <div className='row no-gutters align-items-center'>
          <div className='col-md-7'>
            <div className='d-flex align-items-center flex-wrap'>
              <span className='number'>#{order?.number}</span>
              <span className='status'>
                <span
                  className={`order__status ${
                    getSelectedStatus(order.status, status).name
                  }`}>
                  {getSelectedStatus(order.status, status).description}
                </span>
              </span>
              <span className='deadline'>
                <strong>Deadline: </strong>
                {dateTimeStringFromDate(order.deadline)}
              </span>
            </div>
          </div>
          <div className='col-md-5 text-right'>
            <div className='d-flex justify-content-end align-items-end'>
              {canEditAssign && <OrderAssignedBox order={order} />}
              <OrderBudget order={order} />
            </div>
          </div>
        </div>
      </div>

      {filteredItems.map((item, index) => (
        <div className='row' key={`order_list_item_${item.id}`}>
          <div className='col-lg-6'>
            <div className='order_detail__wrapper'>
              <OrderItemBox hasFaster={hasFaster} item={item} order={order} />
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='order_detail__wrapper'>
              <OrderSumaryBox item={item} order={order} index={index} />
            </div>
          </div>
        </div>
      ))}
      <OrderArtWorkBox order={order} />

      <InPageLoading isLoading={loading} />
      <EmaiNotify order={order} />
    </div>
  );
};

const mapStateToProps = ({ orderDetail, order, auth }) => {
  return {
    loading: orderDetail.ui.loading,
    order: orderDetail.data.order,
    status: order.status,
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
