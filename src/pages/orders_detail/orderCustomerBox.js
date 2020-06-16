import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

import { PERMITTIONS_CONFIG } from 'config';

import { formatMoney } from 'utils';

import { getOrderCustomerAction } from './actions';

const OrderCustomerBox = ({
  order,
  customer,
  loadingUser,
  getOrderCustomer,
  accountInfo,
}) => {
  const canViewCustommer =
    accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.VIEW_CUSTOMER_INFO) ||
    false;
  const canViewGeneralInfo =
    accountInfo?.permissions?.includes(
      PERMITTIONS_CONFIG.VIEW_CUSTOMER_GENERAL_INFO,
    ) || false;

  const canViewContactInfo =
    accountInfo?.permissions?.includes(
      PERMITTIONS_CONFIG.VIEW_CUSTOMER_CONTACT_INFO,
    ) || false;

  useEffect(() => {
    if (canViewCustommer && order.id) {
      getOrderCustomer(order.id);
    }
  }, [getOrderCustomer, order.id, canViewCustommer]);

  if (!canViewCustommer) {
    return null;
  }

  if (loadingUser || isEmpty(customer)) {
    return (
      <div
        style={{ minHeight: '100px' }}
        className='order_detail__customer box d-flex align-items-center justify-content-center'>
        <Spinner />
      </div>
    );
  }

  const { contact = {}, orderInfo = {} } = customer;

  return (
    <div className={`order_detail__customer box `}>
      <div className='box__header mb-2'>
        <div className='box__title'>Customer info </div>
        <div className='control'>
          <div className='order_detail__avt'>
            <img
              src={`https://ui-avatars.com/api/?name=${customer?.firstName}${customer?.lastName}`}
              alt='comments__author'
            />
          </div>
        </div>
      </div>

      <div className='box__body'>
        {canViewGeneralInfo && (
          <>
            <p className='mb-1'>
              {canViewContactInfo ? (
                <Link to={`/customer/detail/${customer.login}`}>
                  {customer?.firstName} {customer?.lastName}
                </Link>
              ) : (
                <span>
                  {customer?.firstName} {customer?.lastName}
                </span>
              )}
            </p>
            <p className='mb-1'>{customer?.totalOrder || 1} Order </p>
            {canViewContactInfo && (
              <p className='mb-1'>
                Total Spent: {formatMoney(customer?.totalSpent || 0)}
              </p>
            )}

            {customer?.sex && (
              <p className='mb-1'>Gender: {customer?.sex || ''} </p>
            )}
            {customer?.age && (
              <p className='mb-1'>Age: {customer?.age || ''} </p>
            )}

            {customer?.dob && (
              <p className='mb-1'>DoB: {customer?.dob || ''} </p>
            )}
          </>
        )}
        {canViewContactInfo && (
          <>
            <div className='box__device'></div>
            <div className='box__header mb-2'>
              <div className='box__title'>Contact Info</div>
            </div>
            {contact?.email && <p className='mb-1'>Email: {contact?.email}</p>}
            {contact?.phoneNumber && (
              <p className='mb-1'>Phone: {contact?.phoneNumber}</p>
            )}
            {contact?.fbUrl && (
              <p className='mb-1'>
                Facebook:
                <a target='_blank' rel='noreferrer' href={`${contact?.fbUrl}`}>
                  {contact?.fbUrl}
                </a>
              </p>
            )}
            {contact?.igUrl && (
              <p className='mb-1'>
                Instagram:
                <a target='_blank' rel='noreferrer' href={`${contact?.igUrl}`}>
                  {contact?.igUrl}
                </a>
              </p>
            )}
            {contact?.snapChatUrl && (
              <p className='mb-1'>
                SnapChat:
                <a
                  target='_blank'
                  rel='noreferrer'
                  href={`${contact?.snapChatUrl}`}>
                  {contact?.snapChatUrl}
                </a>
              </p>
            )}
            {contact?.linkedUrl && (
              <p className='mb-1'>
                LinkedIn:
                <a
                  target='_blank'
                  rel='noreferrer'
                  href={`${contact?.linkedUrl}`}>
                  {contact?.linkedUrl}
                </a>
              </p>
            )}
            {contact?.twitterUrl && (
              <p className='mb-1'>
                Twitter:
                <a
                  target='_blank'
                  rel='noreferrer'
                  href={`${contact?.twitterUrl}`}>
                  {contact?.twitterUrl}
                </a>
              </p>
            )}
          </>
        )}

        {canViewContactInfo && (
          <>
            <div className='box__device'></div>
            <div className='box__header mb-2'>
              <div className='box__title'>Address</div>
            </div>
            {orderInfo?.company && (
              <p className='mb-1'>{orderInfo?.company || ''}</p>
            )}
            {orderInfo?.address1 && (
              <p className='mb-1'>{`${orderInfo?.address1 || ''}`}</p>
            )}
            {orderInfo?.address2 && (
              <p className='mb-1'>{`${orderInfo?.address2 || ''}`}</p>
            )}

            {orderInfo?.province ||
              orderInfo?.city ||
              (orderInfo?.zip && (
                <p className='mb-1'>
                  {orderInfo?.city || ''} {orderInfo?.province || ''}{' '}
                  {orderInfo?.zip || ''}
                </p>
              ))}
            {orderInfo?.country && (
              <p className='mb-1'>{orderInfo?.country || ''}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ orderDetail, auth }) => ({
  loadingUser: orderDetail.ui.loadingUser,
  customer: orderDetail.data.customer,
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {
  getOrderCustomer: getOrderCustomerAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderCustomerBox);
