import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getSelectedStatus, getOrderItem } from 'utils';

import OrderDetailItem from './orderDetailItem';

import { getOrderWorkLogAction } from './actions';

const OrderDetailItemList = (props) => {
  const { order, status, getOrderWorkLogAction } = props;
  const [currentItemId, setCurrentItemId] = useState(order?.items?.[0]?.id);

  useEffect(() => {
    if (order.id) {
      getOrderWorkLogAction(order.id);
    }
  }, [getOrderWorkLogAction, order.id]);

  return (
    <div className='order_detail__work_list'>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='order_detail__tabs'>
            {order.items.map((item) => {
              const itemFriendlyName = getOrderItem(item.name);
              const _status = item.status;
              return (
                <button key={`item_${item.id}`} type='button' onClick={() => setCurrentItemId(item.id)} className={`order_detail__tab big ${currentItemId === item.id && 'active'}`}>
                  {itemFriendlyName}
                  {_status && (
                    <div>
                      <span className={`order__status ml-2 ${_status}`}>{getSelectedStatus(_status, status).friendlyName}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <div className='col-lg-12'>
          {order.items.map((item) => (
            <OrderDetailItem item={item} active={currentItemId === item.id} order={order} key={`order_list_item_${item.id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ orderDetail, orderTable }) => {
  return {
    order: orderDetail.data.order,
    status: orderTable.orders.status,
  };
};

const mapDispatchToProps = {
  getOrderWorkLogAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailItemList);
