import React from 'react';
import { connect } from 'react-redux';

import { filterOrderItems } from 'configs';
import { getOrderItem } from 'utils';

import OrderSumaryBox from './orderSumaryBox';
import OrderItemBox from './orderItemBox';
import OrderArtWorkBox from './orderArtWorkBox';

const OrderDetailItem = (props) => {
  const { item, order, active } = props;
  const hasFaster = getOrderItem(item.name) === filterOrderItems[1];
  return (
    <div className={`${active ? '' : 'd-none'}`}>
      <div className='row'>
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
      <OrderArtWorkBox order={order} item={item} />
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailItem);
