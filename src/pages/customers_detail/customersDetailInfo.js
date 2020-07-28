import React from 'react';

import P from 'components/common/parapraph';

const CustomerDetailInfo = (props) => {
  const { customer } = props;
  return (
    <div className='customer_detail__original customer_detail__box box'>
      <div className='box__header'>
        <div className='box__title'>
          {customer?.firstName} {customer?.lastName}
          <div className='subText'>{[customer?.customerExtension?.city, customer?.customerExtension?.province, customer?.customerExtension?.country].filter((item) => item).join(', ')}</div>
          <div className='subText'>{customer?.customerExtension?.totalOrder} order(s)</div>
        </div>
        <div className='float-right'>
          <div className='subText'>Total spent to date</div>
          <div className='box__title'>${customer?.customerExtension?.totalSpent}</div>
        </div>
      </div>
      <div className='box__body'>
        <div className='box__sub_title'>Customer Note</div>
        <P text={customer?.customerExtension?.note || ''} id='CustomerDetailInfo' />
        <div className='box__device' />
        <div className='row'>
          <div className='col-6'>
            <div className='box__sub_title mb-2'>Contact</div>
            <div className='box__link'>{customer?.email}</div>
            <div className='box__link'>{customer?.fbUrl}</div>
            <div className='box__link'>{customer?.igUrl}</div>
            <div className='box__link'>{customer?.snapChatUrl}</div>
            <div className='box__link'>{customer?.linkedUrl}</div>
            <div className='box__link'>{customer?.twitterUrl}</div>
            <div className=''>
              {customer?.phonePrefix} {customer?.phoneNumber}
            </div>
          </div>
          <div className='col-6'>
            <div className='box__sub_title mb-2'>Address</div>
            <div>{customer?.customerExtension?.address1}</div>
            <div>
              {customer?.customerExtension?.city} {customer?.customerExtension?.provinceCode} {customer?.customerExtension?.zip}
            </div>
            <div>{customer?.customerExtension?.country}</div>
          </div>
        </div>
        <div className='box__device' />
        <div className='box__sub_title mb-2'>More Info</div>
        <div className='row'>
          <div className='col-6'>
            <div>
              <span className='subText'>Day of Birth: </span>
              {customer?.customerExtension?.dob}
            </div>
            <div>
              <span className='subText'>DOBY: </span>
              {customer?.customerExtension?.doby}
            </div>
          </div>
          <div className='col-6'>
            <div>
              <span className='subText'>Gen: </span>
              {customer?.customerExtension?.gen}
            </div>
            <div>
              <span className='subText'>Age: </span>
              {customer?.customerExtension?.age}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailInfo;
