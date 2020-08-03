import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { merge } from 'lodash';

import Button from 'components/common/button';
import { ReactComponent as PencilIcon } from 'assets/img/pencil.svg';

import { updateCustomerAction } from 'pages/customers/actions';
import { toast } from 'react-toastify';

import { formatMoney } from 'utils';

const CustomerDetailInfo = (props) => {
  const { customer, updateCustomerAction } = props;
  const noteRef = useRef(null);

  const updateCustomerNoteAction = () => {
    const note = noteRef.current.value;
    const params = merge({}, customer, { customerExtension: { note } });
    updateCustomerAction(params, () => toast.dark('Customer note is updated'));
  };

  return (
    <div className='customer_detail__original customer_detail__box box'>
      <div className='box__header'>
        <div className='box__title'>
          {customer?.firstName} {customer?.lastName}
          <div className='subText'>{[customer?.customerExtension?.city, customer?.customerExtension?.province, customer?.customerExtension?.country].filter((item) => item).join(', ')}</div>
          <div className='subText'>{customer?.customerExtension?.totalOrder} order(s)</div>
        </div>
        <div className='float-right text-right'>
          <div className='subText'>Total spent to date</div>
          <div className='box__title'>{formatMoney(customer?.customerExtension?.totalSpent)}</div>
        </div>
      </div>
      <div className='box__body'>
        <div className='box__sub_title d-flex align-items-center mb-2'>
          Customer Note <PencilIcon className='m-2' />
          <Button color='primary' onClick={updateCustomerNoteAction} className='btn-create' containerClassName='ml-auto'>
            Save
          </Button>
        </div>
        <textarea ref={noteRef} defaultValue={customer?.customerExtension?.note} className='form-control' placeholder='Add a note' rows='2' />
        <div className='box__device' />
        <div className='row'>
          <div className='col-6'>
            <div className='box__sub_title mb-2'>Contact</div>
            {customer?.email && <p className='mb-1'>Email: {customer?.email}</p>}
            {customer?.phoneNumber && <p className='mb-1'>Phone: {customer?.phoneNumber}</p>}
            {customer?.customerExtension?.fbChat && (
              <p className='mb-1'>
                Facebook Chat: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.fbChat}`}>
                  Link
                </a>
              </p>
            )}
            {customer?.customerExtension?.mailChain && (
              <p className='mb-1'>
                Mail Chain: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.mailChain}`}>
                  Link
                </a>
              </p>
            )}
            {customer?.customerExtension?.fbUrl && (
              <p className='mb-1'>
                Facebook: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.fbUrl}`}>
                  Link
                </a>
              </p>
            )}
            {customer?.customerExtension?.igUrl && (
              <p className='mb-1'>
                Instagram: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.igUrl}`}>
                  Link
                </a>
              </p>
            )}
            {customer?.customerExtension?.snapChatUrl && (
              <p className='mb-1'>
                SnapChat: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.snapChatUrl}`}>
                  Link
                </a>
              </p>
            )}
            {customer?.customerExtension?.linkedUrl && (
              <p className='mb-1'>
                LinkedIn: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.linkedUrl}`}>
                  Link
                </a>
              </p>
            )}
            {customer?.customerExtension?.twitterUrl && (
              <p className='mb-1'>
                Twitter: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.twitterUrl}`}>
                  Link
                </a>
              </p>
            )}
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

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updateCustomerAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailInfo);
