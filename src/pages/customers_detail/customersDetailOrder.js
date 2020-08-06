import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { Link } from 'react-router-dom';

import Button from 'components/common/button';
import ImageGallery from 'components/common/imageGallery';
import P from 'components/common/parapraph';

import { getOrderTableStatusAction, updateOrderTableFilterAction } from 'components/tables/orders/actions';

import { getListImageUrl, dateTimeStringFromDate, getOrderItem, getOrderOption, getSelectedStatus, formatMoney } from 'utils';
import { useHistory } from 'react-router-dom';
import { WEB_ROUTES } from 'configs';
import StepperArrow from 'components/common/stepperArrow';

const CustomerDetailOrders = (props) => {
  const history = useHistory();
  const { orders, getOrderTableStatusAction, updateOrderTableFilterAction, statuses } = props;

  useEffect(() => {
    getOrderTableStatusAction({});
  }, [getOrderTableStatusAction]);

  const [currIndex, setCurrIndex] = useState(0);
  const isEmpty = !orders || orders.length === 0;
  const currOrder = orders?.[currIndex];
  let hasFaster = false;
  const filteredItems = filter(currOrder?.items, (item) => {
    if (getOrderItem(item.name) === 'Faster Processing') {
      hasFaster = true;
    }
    return getOrderItem(item.name) !== 'Faster Processing';
  });

  const onViewAllOrders = () => {
    history.push(WEB_ROUTES.ORDERS.path);
    updateOrderTableFilterAction({ payload: { text: currOrder?.customer?.fullName } });
  };

  return (
    <div className='customer_detail__orders customer_detail__box box'>
      <div className='box__header'>
        <div className='box__title'>Orders placed {hasFaster && '(Faster Processing)'}</div>
        {!isEmpty && (
          <div className='float-right d-flex align-items-center'>
            <div className='subText'>{dateTimeStringFromDate(currOrder?.paidAt)}</div>
            <div className='mr-2 ml-2'>&bull;</div>
            <Button tag={Link} className='box__link p-0' to={WEB_ROUTES.ORDERS_DETAIL.path.replace(':id', currOrder.code)} color='link'>
              {`Order #${currOrder?.number}`}
            </Button>
          </div>
        )}
      </div>
      <div className='box__body'>
        {isEmpty ? (
          <div className='subText'>None</div>
        ) : (
          <>
            <div className='mb-3 d-flex'>
              <div className={`order__status ${getSelectedStatus(currOrder?.status, statuses).name}`}>{getSelectedStatus(currOrder?.status, statuses).friendlyName}</div>
              <div className='ml-auto box__sub_title'>{`${formatMoney(currOrder?.totalPrice)} from Online Store`}</div>
            </div>

            {filteredItems.map((item, index) => (
              <div key={`customer_order_items_${item.id}`}>
                <div className='name'>{getOrderItem(item.name)}</div>
                {getOrderOption(item.name) && <div className='options'>{getOrderOption(item.name)} </div>}
                {item.note && (
                  <div className='description'>
                    <P text={item?.note || ''} id='OrderItemBox' />
                  </div>
                )}

                {item.photos && item.photos.length > 0 && (
                  <div className='photos'>
                    <strong className='photos__title'>Photos</strong>
                    <ImageGallery images={getListImageUrl(filter(item.photos, (p) => p.external))} alt={item.name} caption={item.name} />
                  </div>
                )}
                {index < filteredItems.length - 1 && <hr />}
              </div>
            ))}
            <div className='box__device' />
            <div className='d-flex align-items-center'>
              <StepperArrow current={currIndex} onChange={setCurrIndex} total={orders.length} />
              <div className='ml-auto'>
                <Button onClick={onViewAllOrders} className='box__link' type='button' color='link'>
                  View all orders
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = ({ orderTable }) => ({
  statuses: orderTable.orders.status,
});

const mapDispatchToProps = {
  getOrderTableStatusAction,
  updateOrderTableFilterAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailOrders);
