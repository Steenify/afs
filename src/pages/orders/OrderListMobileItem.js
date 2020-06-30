import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { getSelectedStatus, timeStringFromDate, formatMoney } from 'utils';
import { mapStatusPayment, statusPayments } from 'config';

const OrderListMobileItem = ({ item, goToDetail, statuses }) => {
  const assignedTo = item?.assignedTo || {};
  const customer = item?.customer || {};

  return (
    <div onClick={() => goToDetail(item?.code)} className={`group__item`}>
      <div className='left'>
        <div className='top'>
          <div className='name'>
            {`${customer?.firstName || ''} ${customer?.lastName || ''}`}
          </div>
          <div className='time'>{timeStringFromDate(item?.paidAt)}</div>
        </div>
        <div className='number'>#{item?.number}</div>
        <div className='status'>
          <div
            className={`order__status ${
              getSelectedStatus(item?.status, statuses).name
            }`}>
            {getSelectedStatus(item?.status, statuses).friendlyName}
          </div>

          <div
            className={`order__status ${
              item?.artistPaymentStatus || statusPayments[1]
            }`}>
            {mapStatusPayment[item?.artistPaymentStatus] ||
              mapStatusPayment.UNPAID}
          </div>
        </div>

        <div className='item'>{(item?.items || []).length} items</div>
      </div>
      <div className='right text-right'>
        <div className='top'>
          <div className='budget'>Budget: {formatMoney(item?.budget || 0)}</div>
          <div className='total'>{formatMoney(item?.totalPrice || 0)}</div>
        </div>

        <div className='bot'>
          <div className='assign'>
            Artist:{' '}
            <span>
              {isEmpty(assignedTo) || assignedTo?.login === 'null'
                ? '_______'
                : `${assignedTo?.fullName || ''}` ||
                  `${assignedTo?.firstName || ''} ${
                    assignedTo?.lastName || ''
                  }`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ order }, ownProps) => {
  const { data } = ownProps;
  const { items } = order.list;
  const item = items[data] || {};

  return {
    item,
    statuses: order.status,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderListMobileItem);
