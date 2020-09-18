import React from 'react';
import { connect } from 'react-redux';

import Button from 'components/common/button';
import P from 'components/common/parapraph';

import { formatMoney } from 'utils';

const CustomerDetailInfoDisplay = (props) => {
  const { customer, setUpdating } = props;

  const handleEdit = () => {
    setUpdating(true);
  };

  return (
    <div className='customer_detail__original customer_detail__box box'>
      <div className='box__header'>
        <div className='box__title'>
          <span>
            {customer?.firstName}
            {customer?.lastName}
          </span>
          <div className='subText'>{[customer?.customerExtension?.city, customer?.customerExtension?.province, customer?.customerExtension?.country].filter((item) => item).join(', ')}</div>
          <div className='subText'>{customer?.customerExtension?.totalOrder} order(s)</div>
        </div>
        <div className='float-right text-right'>
          <Button onClick={handleEdit} color='primary' className='btn-create mb-2'>
            Edit
          </Button>
          <div className='subText'>Total spent to date</div>
          <div className='box__title'>{formatMoney(customer?.customerExtension?.totalSpent)}</div>
        </div>
      </div>

      <div className='box__body'>
        <div className='box__sub_title mb-2'>
          <span className=''>Customer Note:</span>
        </div>
        <P text={customer?.customerExtension?.note || ''} id='CustomerNoteBox' />
        <div className='box__device' />
        <div className='row'>
          <div className='col-6'>
            <div className='box__sub_title mb-2'>Contact</div>
            {customer?.email && <p className='mb-1'>Email: {customer?.email}</p>}
            {customer?.phoneNumber && <p className='mb-1'>Phone: {customer?.phoneNumber}</p>}
            {customer?.customerExtension?.fbChat && (
              <p className='mb-1'>
                Facebook Chat:
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.fbChat}`}>
                  Link
                </a>
              </p>
            )}
            {customer?.customerExtension?.mailChain && (
              <p className='mb-1'>
                Mail Chain:
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.mailChain}`}>
                  Link
                </a>
              </p>
            )}
            {customer?.customerExtension?.fbUrl && (
              <p className='mb-1'>
                Facebook 1:
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.fbUrl}`}>
                  Link
                </a>
              </p>
            )}

            {customer?.customerExtension?.fbUrl2 && (
              <p className='mb-1'>
                Facebook 2:
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.fbUrl2}`}>
                  Link
                </a>
              </p>
            )}

            {customer?.customerExtension?.igUrl && (
              <p className='mb-1'>
                Instagram 1:
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.igUrl}`}>
                  Link
                </a>
              </p>
            )}
            {customer?.customerExtension?.igUrl2 && (
              <p className='mb-1'>
                Instagram 2:
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.igUrl2}`}>
                  Link
                </a>
              </p>
            )}
            {customer?.customerExtension?.snapChatUrl && (
              <p className='mb-1'>
                SnapChat:
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.snapChatUrl}`}>
                  Link
                </a>
              </p>
            )}
            {customer?.customerExtension?.linkedUrl && (
              <p className='mb-1'>
                LinkedIn:
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.linkedUrl}`}>
                  Link
                </a>
              </p>
            )}
            {customer?.customerExtension?.twitterUrl && (
              <p className='mb-1'>
                Twitter:
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.twitterUrl}`}>
                  Link
                </a>
              </p>
            )}
          </div>
          <div className='col-6'>
            <div className='box__sub_title mb-2'>Address</div>
            <div>
              {customer?.customerExtension?.address1} {customer?.customerExtension?.address2}
            </div>
            <div>{customer?.customerExtension?.company}</div>
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
            {customer?.customerExtension?.dob && (
              <div>
                <span className='subText'>Day of Birth: </span>
                {customer?.customerExtension?.dob}
              </div>
            )}

            {customer?.customerExtension?.doby && (
              <div>
                <span className='subText'>DOBY: </span>
                {customer?.customerExtension?.doby}
              </div>
            )}
          </div>
          <div className='col-6'>
            {customer?.customerExtension?.gen && (
              <div>
                <span className='subText'>Gen: </span>
                {customer?.customerExtension?.gen}
              </div>
            )}
            {customer?.customerExtension?.gen && (
              <div>
                <span className='subText'>Age: </span>
                {customer?.customerExtension?.age}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailInfoDisplay);
