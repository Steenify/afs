import React from 'react';
import { filter, map } from 'lodash';

import ImageGallery from 'components/common/imageGallery';
import P from 'components/common/parapraph';

import {
  getListImageUrl,
  dateTimeStringFromDate,
  getOrderItem,
  getOrderOption,
} from 'utils';

const OrderItemBox = ({ item, order, hasFaster }) => {
  return (
    <div className='order_detail__original order_detail__box box'>
      <div className='box__header'>
        <div className='box__title'>
          Order Original {hasFaster && '(Faster Processing)'}
        </div>
        <div className='deadline'>{dateTimeStringFromDate(order.paidAt)}</div>
      </div>
      <div className='box__body'>
        <div className='name'>{getOrderItem(item.name)}</div>
        {getOrderOption(item.name) && (
          <div className='options'>{getOrderOption(item.name)} </div>
        )}

        {item.note && (
          <div className='description'>
            <P text={item?.note || ''} id='OrderItemBox' />
          </div>
        )}

        {item.photos && item.photos.length > 0 && (
          <div className='photos'>
            <strong className='photos__title'>Photos</strong>
            <ImageGallery
              images={getListImageUrl(filter(item.photos, (p) => p.external))}
              alt={item.name}
              caption={item.name}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItemBox;
