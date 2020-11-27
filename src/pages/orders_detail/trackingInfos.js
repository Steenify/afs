import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

const TrackingInfo = (props) => {
  const { printfulTrackings } = props;

  return (
    <>
      {printfulTrackings.map((item, index) => (
        <Fragment key={`tracking__info__view__${index}`}>
          <div className='box__header mb-0'>
            <div className='box__title w-100'>{`Tracking Info ${index + 1}`}</div>
          </div>
          <div className='m-2'>
            <span>URL: </span>
            <a target='_blank' rel='noopener noreferrer' href={item.trackingUrl}>
              Link
            </a>
          </div>
          <div className='m-2'>
            <span>Code: {item.trackingCode}</span>
          </div>
          <div className='m-2'>
            <span>
              Estimated Delivery: {moment(item.estimatedDeliveryFrom).format('DD/MM/YYYY')} - {moment(item.estimatedDeliveryTo).format('DD/MM/YYYY')}
            </span>
          </div>
        </Fragment>
      ))}
    </>
  );
};

const mapStateToProps = ({ customerDetail, orderDetail }) => {
  return {
    printfulTrackings: orderDetail?.data?.order?.printfulTrackings || [],
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TrackingInfo);
