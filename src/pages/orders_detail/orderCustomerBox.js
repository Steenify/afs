import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

import CanShow from 'components/layout/canshow';
import Button from 'components/common/button';
import { PERMITTIONS_CONFIG } from 'configs';

import { formatMoney } from 'utils';

import { getOrderCustomerAction, updateShowAddProductAction } from './actions';

import OrderChangeCustomer from './orderChangeCustomer';
import OrderTodoList from './orderTodoList';

const OrderCustomerBox = ({ order, customer, loadingUser, getOrderCustomer, accountInfo, updateShowAddProduct, shippingAddress, prevArtists }) => {
  const canViewCustommer = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.VIEW_CUSTOMER_INFO) || false;
  const canViewContactInfo = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.VIEW_CUSTOMER_CONTACT_INFO) || false;

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
      <div style={{ minHeight: '100px' }} className='order_detail__customer box d-flex align-items-center justify-content-center'>
        <Spinner />
      </div>
    );
  }

  const { contact = {}, orderInfo = {} } = customer;

  return (
    <>
      <CanShow permission={PERMITTIONS_CONFIG.ADD_PRODUCT_INTO_ORDER}>
        <div className={`order_detail__customer box `}>
          <div className='box__header mb-0'>
            <div className='box__title'>Add Order Item </div>
            <div className='control'>
              <Button color='primary' style={{ minHeight: 'auto', height: 30 }} onClick={() => updateShowAddProduct(true)}>
                Add Item
              </Button>
            </div>
          </div>
        </div>
      </CanShow>
      <CanShow permission={PERMITTIONS_CONFIG.VIEW_ORDER_TODO_LIST}>
        <OrderTodoList />
      </CanShow>

      <div className={`order_detail__customer box `}>
        <div className='box__header mb-2'>
          <div className='box__title'>Customer info </div>
          <div className='control'>
            <div className='order_detail__avt'>
              <img src={`https://ui-avatars.com/api/?name=${customer?.firstName}${customer?.lastName}`} alt='comments__author' />
            </div>
          </div>
        </div>

        <div className='box__body'>
          <CanShow permission={PERMITTIONS_CONFIG.VIEW_CUSTOMER_GENERAL_INFO}>
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
            {canViewContactInfo && <p className='mb-1'>Total Spent: {formatMoney(customer?.totalSpent || 0)}</p>}

            {customer?.note && <p className='mb-1'>Note: {customer?.note || ''} </p>}

            {customer?.sex && <p className='mb-1'>Gender: {customer?.sex || ''} </p>}
            {customer?.age && <p className='mb-1'>Age: {customer?.age || ''} </p>}

            {customer?.dob && <p className='mb-1'>DoB: {customer?.dob || ''} </p>}
          </CanShow>

          <CanShow permission={PERMITTIONS_CONFIG.VIEW_CUSTOMER_CONTACT_INFO}>
            <div className='box__device'></div>
            <div className='box__header mb-2'>
              <div className='box__title'>Previous Artists </div>
            </div>

            <div className='div'>
              {(customer?.prevArtists || []).map((art) => (
                <p className='artist mb-1' key={`order__prev__art__${art.id}`}>
                  <Link to={`/artists/${art.login}`}>{art?.fullName || `${art?.firstName} ${art?.lastName}`}</Link>
                </p>
              ))}
            </div>
          </CanShow>

          <CanShow permission={PERMITTIONS_CONFIG.VIEW_CUSTOMER_CONTACT_INFO}>
            <div className='box__device'></div>
            <div className='box__header mb-2'>
              <div className='box__title'>Contact Info</div>
            </div>
            {contact?.email && <p className='mb-1'>Email: {contact?.email}</p>}
            {contact?.phoneNumber && <p className='mb-1'>Phone: {contact?.phoneNumber}</p>}

            {contact?.fbChat && (
              <p className='mb-1'>
                Facebook Chat: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${contact?.fbChat}`}>
                  Link
                </a>
              </p>
            )}
            {contact?.mailChain && (
              <p className='mb-1'>
                Mail Chain: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${contact?.mailChain}`}>
                  Link
                </a>
              </p>
            )}
            {contact?.fbUrl && (
              <p className='mb-1'>
                Facebook: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${contact?.fbUrl}`}>
                  Link
                </a>
              </p>
            )}
            {contact?.fbUrl2 && (
              <p className='mb-1'>
                Facebook 2: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${contact?.fbUrl2}`}>
                  Link
                </a>
              </p>
            )}
            {contact?.igUrl && (
              <p className='mb-1'>
                Instagram: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${contact?.igUrl}`}>
                  Link
                </a>
              </p>
            )}
            {contact?.igUrl2 && (
              <p className='mb-1'>
                Instagram 2: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${contact?.igUrl2}`}>
                  Link
                </a>
              </p>
            )}
            {contact?.snapChatUrl && (
              <p className='mb-1'>
                SnapChat: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${contact?.snapChatUrl}`}>
                  Link
                </a>
              </p>
            )}
            {contact?.linkedUrl && (
              <p className='mb-1'>
                LinkedIn: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${contact?.linkedUrl}`}>
                  Link
                </a>
              </p>
            )}
            {contact?.twitterUrl && (
              <p className='mb-1'>
                Twitter: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${contact?.twitterUrl}`}>
                  Link
                </a>
              </p>
            )}
          </CanShow>
          <CanShow permission={PERMITTIONS_CONFIG.VIEW_CUSTOMER_CONTACT_INFO}>
            <div className='box__device'></div>
            <div className='box__header mb-2'>
              <div className='box__title'>Address</div>
            </div>
            {orderInfo?.company && <p className='mb-1'>{orderInfo?.company || ''}</p>}
            {orderInfo?.address1 && <p className='mb-1'>{`${orderInfo?.address1 || ''}`}</p>}
            {orderInfo?.address2 && <p className='mb-1'>{`${orderInfo?.address2 || ''}`}</p>}

            {(orderInfo?.province || orderInfo?.city || orderInfo?.zip) && (
              <p className='mb-1'>
                {orderInfo?.city || ''} {orderInfo?.province || ''} {orderInfo?.zip || ''}
              </p>
            )}
            {orderInfo?.country && (
              <p className='mb-1'>
                {orderInfo?.country || ''} {orderInfo?.countryCode || ''}
              </p>
            )}
          </CanShow>
          <CanShow permission={PERMITTIONS_CONFIG.VIEW_CUSTOMER_CONTACT_INFO}>
            <div className='box__device'></div>
            <div className='box__header mb-2'>
              <div className='box__title'>Shipping Address</div>
            </div>
            {shippingAddress?.name && (
              <p className='mb-1'>
                <span>{shippingAddress?.name}</span>
              </p>
            )}

            {shippingAddress?.phone && <p className='mb-1'>Phone: {shippingAddress?.phone}</p>}

            {shippingAddress?.address1 && <p className='mb-1'>{`${shippingAddress?.address1 || ''}`}</p>}
            {shippingAddress?.address2 && <p className='mb-1'>{`${shippingAddress?.address2 || ''}`}</p>}

            {shippingAddress?.company && <p className='mb-1'>{shippingAddress?.company || ''}</p>}

            {(shippingAddress?.province || shippingAddress?.city || shippingAddress?.zip) && (
              <p className='mb-1'>
                {shippingAddress?.city || ''} {shippingAddress?.province || ''} {shippingAddress?.provinceCode || ''} {shippingAddress?.zip || ''}
              </p>
            )}
            {shippingAddress?.country && (
              <p className='mb-1'>
                {shippingAddress?.country || ''} {shippingAddress?.countryCode || ''}
              </p>
            )}
          </CanShow>

          <CanShow permission={PERMITTIONS_CONFIG.UPDATE_BOOKING_CUSTOMER}>
            <div className='box__device'></div>
            <div className='box__header mb-2'>
              <div className='box__title'>Update Customer</div>
            </div>

            <div className='div'>
              <OrderChangeCustomer customer={customer} />
            </div>
          </CanShow>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ orderDetail, auth }) => ({
  loadingUser: orderDetail.ui.loadingUser,
  customer: orderDetail.data.customer,
  accountInfo: auth.data.accountInfo,
  shippingAddress: orderDetail.data.order.shippingAddress || {},
});

const mapDispatchToProps = {
  getOrderCustomer: getOrderCustomerAction,
  updateShowAddProduct: updateShowAddProductAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderCustomerBox);
