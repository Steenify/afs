import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Popover from 'react-tiny-popover';
import { get } from 'lodash';

import Button from 'components/common/button';

import { PERMITTIONS_CONFIG } from 'configs';

import { ReactComponent as Cavet } from 'assets/img/cavet.svg';

const OrderCustomerCell = ({ customer, accountInfo }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const canViewContactInfo = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.VIEW_CUSTOMER_CONTACT_INFO) || false;

  if (!canViewContactInfo) {
    return (
      <div className='order__assigned order__user'>
        <span className='dispaly_name'>{`${customer?.firstName || ''} ${customer?.lastName || ''}`}</span>
      </div>
    );
  }

  return (
    <Popover
      isOpen={isPopoverOpen}
      position={'bottom'}
      transitionDuration={0.000001}
      padding={10}
      disableReposition
      onClickOutside={toggle}
      content={() => (
        <div className='order__info order__user p-3'>
          <div className='wrapper'>
            <strong className='name'>{`${customer?.firstName || ''} ${customer?.lastName || ''}`}</strong>
            {customer?.note && <p className='note'>{customer?.note}</p>}
            <div className='contact'>
              {customer?.email ? (
                <p className='email mb-1'>
                  <a target='_blank' rel='noopener noreferrer' href={`mailto:${customer?.email}`}>
                    {customer?.email}
                  </a>
                </p>
              ) : null}
              {customer?.phoneNumber ? (
                <p className='phoneNumber mb-1'>
                  <a href={`tel:${customer?.phoneNumber}`}>{customer?.phoneNumber}</a>
                </p>
              ) : null}
            </div>
            <div className='actions'>
              <Button tag={Link} className='w-100 action' to={`/customer/detail/${customer?.login}`} color='normal'>
                View customer
              </Button>
            </div>
          </div>
        </div>
      )}>
      <button onClick={() => setIsPopoverOpen(!isPopoverOpen)} className='order__toggle order__user text-left w-100 d-flex align-items-center'>
        <span className='dispaly_name'>{`${customer?.firstName || ''} ${customer?.lastName || ''}`}</span>
        <span className='icon mb-1 ml-2'>
          <Cavet />
        </span>
      </button>
    </Popover>
  );
};

const mapStateToProps = (reducers, ownProps) => {
  const { auth } = reducers;
  const { data, reducer = 'orders' } = ownProps;
  const item = get(reducers, `orderTable.${reducer}.table.items`)?.[data] || {};
  return {
    customer: item?.customer || {},
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderCustomerCell);
