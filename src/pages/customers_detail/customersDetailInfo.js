import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import Button from 'components/common/button';
import { ReactComponent as PencilIcon } from 'assets/img/pencil.svg';
import PopoverInputField from 'components/common/popoverInputField';
import P from 'components/common/parapraph';

import { updateCustomerDetailAction } from 'pages/customers_detail/actions';
import { toast } from 'react-toastify';

import { formatMoney } from 'utils';

const CustomerDetailInfo = (props) => {
  const { customer, updateCustomerDetailAction } = props;
  const noteRef = useRef(null);
  const [editingFields, setEditingFields] = useState(new Set());

  const onStartEditing = (field) => {
    setEditingFields((prev) => new Set(prev).add(field));
  };

  const onEndEditing = (field) => {
    setEditingFields((prev) => {
      prev.delete(field);
      return new Set(prev);
    });
  };

  const updateCustomerNoteAction = () => {
    const note = noteRef.current.value;
    onUpdateExtension('note', 'Note', note);
  };

  const onUpdateExtension = (field, title, value) => {
    updateCustomerDetailAction({ ...customer, customerExtension: { [field]: value } }, () => {
      toast.dark(`${title} is updated`);
      onEndEditing(field);
    });
  };

  const onUpdateInfo = (field, title, value) => {
    updateCustomerDetailAction({ ...customer, [field]: value }, () => {
      toast.dark(`${title} is updated`);
      onEndEditing(field);
    });
  };

  return (
    <div className='customer_detail__original customer_detail__box box'>
      <div className='box__header'>
        <div className='box__title'>
          <PopoverInputField value={customer?.firstName} title='First Name' onSave={(value) => onUpdateInfo('firstName', 'First Name', value)} />{' '}
          <PopoverInputField value={customer?.lastName} title='Last Name' onSave={(value) => onUpdateInfo('lastName', 'Last Name', value)} />
          <div className='subText'>{[customer?.customerExtension?.city, customer?.customerExtension?.province, customer?.customerExtension?.country].filter((item) => item).join(', ')}</div>
          <div className='subText'>{customer?.customerExtension?.totalOrder} order(s)</div>
        </div>
        <div className='float-right text-right'>
          <div className='subText'>Total spent to date</div>
          <div className='box__title'>{formatMoney(customer?.customerExtension?.totalSpent)}</div>
        </div>
      </div>
      <div className='box__body'>
        <div className='box__sub_title mb-2'>
          <span className='cursor-pointer toggle' onClick={() => onStartEditing('note')}>
            <span className='icon mr-1'>
              <PencilIcon width='14px' height='14px' />
            </span>
            Customer Note
          </span>
        </div>
        {editingFields.has('note') ? (
          <div>
            <textarea ref={noteRef} defaultValue={customer?.customerExtension?.note} className='form-control' placeholder='...' rows='4' />
            <div className='ctas'>
              <Button onClick={() => onEndEditing('note')} className='cancel cta pl-0' type='button' color='link'>
                Cancel
              </Button>
              <Button onClick={updateCustomerNoteAction} className='save cta pr-0' type='button' color='link'>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <P text={customer?.customerExtension?.note || ''} id='CustomerNoteBox' />
        )}
        <div className='box__device' />
        <div className='row'>
          <div className='col-6'>
            <div className='box__sub_title mb-2'>Contact</div>
            <p className='mb-1'>
              <PopoverInputField value={customer?.email} title='Email' showTitle onSave={(value) => onUpdateInfo('email', 'Email', value)} />
            </p>
            <p className='mb-1'>
              <PopoverInputField value={customer?.phoneNumber} title='Phone' showTitle onSave={(value) => onUpdateInfo('phoneNumber', 'Phone', value)} />
            </p>
            <p className='mb-1'>
              <PopoverInputField
                value={customer?.customerExtension?.fbChat}
                title='Facebook Chat'
                showTitle
                showValue={false}
                onSave={(value) => onUpdateExtension('fbChat', 'Facebook Chat', value)}
              />
              {customer?.customerExtension?.fbChat && (
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.fbChat}`}>
                  Link
                </a>
              )}
            </p>
            <p className='mb-1'>
              <PopoverInputField
                value={customer?.customerExtension?.mailChain}
                title='Mail Chain'
                showTitle
                showValue={false}
                onSave={(value) => onUpdateExtension('mailChain', 'Mail Chain', value)}
              />
              {customer?.customerExtension?.mailChain && (
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.mailChain}`}>
                  Link
                </a>
              )}
            </p>
            <p className='mb-1'>
              <PopoverInputField value={customer?.customerExtension?.fbUrl} title='Facebook 1' showTitle showValue={false} onSave={(value) => onUpdateExtension('fbUrl', 'Facebook 1', value)} />
              {customer?.customerExtension?.fbUrl && (
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.fbUrl}`}>
                  Link
                </a>
              )}
            </p>
            <p className='mb-1'>
              <PopoverInputField value={customer?.customerExtension?.fbUrl2} title='Facebook 2' showTitle showValue={false} onSave={(value) => onUpdateExtension('fbUrl2', 'Facebook 2', value)} />
              {customer?.customerExtension?.fbUrl2 && (
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.fbUrl2}`}>
                  Link
                </a>
              )}
            </p>
            <p className='mb-1'>
              <PopoverInputField value={customer?.customerExtension?.igUrl} title='Instagram 1' showTitle showValue={false} onSave={(value) => onUpdateExtension('igUrl', 'Instagram 1', value)} />
              {customer?.customerExtension?.igUrl && (
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.igUrl}`}>
                  Link
                </a>
              )}
            </p>
            <p className='mb-1'>
              <PopoverInputField value={customer?.customerExtension?.igUrl2} title='Instagram 2' showTitle showValue={false} onSave={(value) => onUpdateExtension('igUrl2', 'Instagram 2', value)} />
              {customer?.customerExtension?.igUrl2 && (
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.igUrl2}`}>
                  Link
                </a>
              )}
            </p>
            <p className='mb-1'>
              <PopoverInputField
                value={customer?.customerExtension?.snapChatUrl}
                title='SnapChat'
                showTitle
                showValue={false}
                onSave={(value) => onUpdateExtension('snapChatUrl', 'SnapChat', value)}
              />
              {customer?.customerExtension?.snapChatUrl && (
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.snapChatUrl}`}>
                  Link
                </a>
              )}
            </p>
            <p className='mb-1'>
              <PopoverInputField value={customer?.customerExtension?.linkedUrl} title='LinkedIn' showTitle showValue={false} onSave={(value) => onUpdateExtension('linkedUrl', 'LinkedIn', value)} />
              {customer?.customerExtension?.linkedUrl && (
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.linkedUrl}`}>
                  Link
                </a>
              )}
            </p>
            <p className='mb-1'>
              <PopoverInputField value={customer?.customerExtension?.twitterUrl} title='Twitter' showTitle showValue={false} onSave={(value) => onUpdateExtension('twitterUrl', 'Twitter', value)} />
              {customer?.customerExtension?.twitterUrl && (
                <a target='_blank' rel='noopener noreferrer' href={`${customer?.customerExtension?.twitterUrl}`}>
                  Link
                </a>
              )}
            </p>
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
  updateCustomerDetailAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailInfo);
