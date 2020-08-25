import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { map } from 'lodash';
import { toast } from 'react-toastify';

import Button from 'components/common/button';
import ImageGallery from 'components/common/imageGallery';

import { getSelectedStatus, getListImageUrl } from 'utils';

import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

import CustomersUpdateContact from './customersUpdateContact';

import {
  updateShowEmailRemindAction,
  sendEmailNotifyAction,
  getRemindEmailTemplateAction,
  getRemindFBMessageTemplateAction,
  sendFBMessageNotifyAction,
  updatOrderCustomerAction,
  updateRemindTemplateAction,
  sentEmailRemindAction,
  sentMessageRemindAction,
} from './actions';

const RemindCustomer = (props) => {
  const {
    isShowEmail,
    email,
    updateShowEmailRemind,
    sendEmailNotify,
    loadingEmail,
    status,
    order,
    getRemindEmailTemplate,
    emailTitle,
    fbTemplate,
    fbTemplateAttachments,
    customer,
    currentWorkLogIndex,
    getRemindFBMessageTemplate,
    sendFBMessageNotify,
    updatOrderCustomer,
    updateRemindTemplateAction,
    sentEmailRemindAction,
    sentMessageRemindAction,
  } = props;

  const [notifyType, setNotifyType] = useState('email');
  const defailtEmail = customer?.contact?.email || '';
  const [customerEmail, setCustomerEmail] = useState(defailtEmail);

  useEffect(() => {
    setCustomerEmail(defailtEmail);
  }, [defailtEmail]);

  const handleChangeEmail = (e) => {
    const { value } = e.target;
    setCustomerEmail(value);
  };

  const toggle = () => {
    updateShowEmailRemind(!isShowEmail);
  };

  const handleUpdateEmail = (e) => {
    const email = e.target.getContent();
    updateRemindTemplateAction({ email });
  };

  const handleSaveCustomerContact = (value) => {
    const { contact } = customer;
    updatOrderCustomer({
      contact: {
        ...contact,
        psid: value.exId,
      },
    });
  };

  const handleUpdateFBTemplate = (e) => {
    const { value } = e.target;
    updateRemindTemplateAction({ fbTemplate: value });
  };

  const handleGetNewTemplate = () => {
    getRemindEmailTemplate(order.id, currentWorkLogIndex);
    getRemindFBMessageTemplate(order.id, currentWorkLogIndex);
  };

  const handleChangeTabType = (e) => {
    const data = e.target.getAttribute('data');
    setNotifyType(data || 'email');
    if (data === 'facebook') {
      handleGetNewTemplate();
    }
  };

  const handleSentNotify = () => {
    if (notifyType === 'email') {
      if (!customerEmail) {
        toast.warn('Email is required');
        return;
      }
      if (!email) {
        toast.warn('Email content is required');
        return;
      }
      const payload = {
        to: customerEmail,
        content: email,
        // title: emailTitle,
      };
      sentEmailRemindAction(payload, order?.id);
      // sendEmailNotify(customerEmail);
    } else {
      const payload = {
        content: fbTemplate,
        attachments: fbTemplateAttachments || [],
        psid: customer?.contact?.psid,
      };
      sentMessageRemindAction(payload, order?.id);
    }
  };

  return (
    <Modal isOpen={isShowEmail} toggle={toggle} fade={false} size='lg' className='modal-dialog-centered  modal-no-border'>
      <div className='order_detail__email'>
        <ModalHeader toggle={toggle}>
          Remind Customer
          <button type='button' className='modal-close' onClick={toggle}>
            <CloseIcon width='25px' height='25px' />
          </button>
        </ModalHeader>
        <ModalBody>
          <div className='template__types'>
            <div className='btn-group w-100' role='group' aria-label='Notify Type'>
              <button type='button' className={`btn btn-link template__type ${notifyType === 'email' && 'active'}`} data='email' onClick={handleChangeTabType}>
                Email
              </button>
              <button type='button' className={`btn btn-link template__type ${notifyType === 'facebook' && 'active'}`} data='facebook' onClick={handleChangeTabType}>
                Facebook
              </button>
            </div>
          </div>

          <div className={`template__content ${notifyType !== 'email' ? 'd-none' : ''}`}>
            {loadingEmail ? (
              <div style={{ minHeight: '100px' }} className='order_detail__customer box d-flex align-items-center justify-content-center'>
                <Spinner />
              </div>
            ) : (
              <div>
                <div className='input-group clipboad mb-3'>
                  <div className='input-group-append'>
                    <span className='input-group-text'>Email: </span>
                  </div>
                  <input type='text' className='form-control clipboad__input' value={customerEmail} onChange={handleChangeEmail} placeholder='Customer Email' />
                  <CopyToClipboard text={customerEmail} onCopy={() => toast.dark('Copied')}>
                    <div className='input-group-append clipboad__input'>
                      <span className='input-group-text'>Copy</span>
                    </div>
                  </CopyToClipboard>
                </div>
                <div className='input-group clipboad mb-3'>
                  <div className='input-group-append'>
                    <span className='input-group-text'>Title: </span>
                  </div>
                  <input
                    type='text'
                    className='form-control clipboad__input'
                    value={emailTitle || ''}
                    // onChange={(e) => updateRemindTemplateAction({ emailTitle: e.target.value })}
                    onChange={() => {}}
                    placeholder='Email Title'
                  />
                  <CopyToClipboard text={emailTitle || ''} onCopy={() => toast.dark('Copied')}>
                    <div className='input-group-append clipboad__input'>
                      <span className='input-group-text'>Copy</span>
                    </div>
                  </CopyToClipboard>
                </div>

                <Editor
                  apiKey='8yd4ibfq5z8v9bj8ddn2hezmxgm68ijow36krpjasr0ucty8'
                  initialValue={email || ''}
                  init={{
                    apiKey: '8yd4ibfq5z8v9bj8ddn2hezmxgm68ijow36krpjasr0ucty8',
                    height: 500,
                    menubar: false,
                    plugins: ['advlist autolink lists link', 'visualblocks code paste'],
                    toolbar: `undo redo | formatselect | link | bold italic |
              alignleft aligncenter alignright | code | \
              bullist numlist outdent indent`,
                  }}
                  onChange={handleUpdateEmail}
                />
              </div>
            )}
          </div>

          <div className={`template__content ${notifyType === 'email' ? 'd-none' : ''}`}>
            {loadingEmail ? (
              <div style={{ minHeight: '100px' }} className='order_detail__customer box d-flex align-items-center justify-content-center'>
                <Spinner />
              </div>
            ) : (
              <div className='template__message'>
                <CustomersUpdateContact id={customer?.id} login={customer?.login} psid={customer?.contact?.psid} onSaveData={handleSaveCustomerContact} />

                <div className='content mb-3'>
                  <textarea className='form-control' value={fbTemplate || ''} onChange={handleUpdateFBTemplate} cols='30' rows='10' />
                </div>
                <div className='title mb-3'>Attachments</div>
                <div className='photos'>
                  <ImageGallery images={getListImageUrl(fbTemplateAttachments)} alt={'Order notify attachments'} caption={'Order notify attachments'} />
                </div>
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' type='submit' onClick={handleSentNotify}>
            Send
          </Button>
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};
const mapStateToProps = ({ orderDetail, orderTable }) => ({
  status: orderTable.orders.status,
  selectedEmailTemplate: orderDetail.data.selectedEmailTemplate,
  isShowEmail: orderDetail.ui.remind.isShowEmail,
  loadingEmail: orderDetail.ui.remind.loadingEmail,
  email: orderDetail.data.remind.email,
  emailTitle: orderDetail.data.remind.emailTitle,
  fbTemplate: orderDetail.data.remind.fbTemplate,
  fbTemplateAttachments: orderDetail.data.remind.fbTemplateAttachments,
  customer: orderDetail.data.customer,
  currentWorkLogIndex: orderDetail.data.currentWorkLogIndex,
});

const mapDispatchToProps = {
  updateShowEmailRemind: updateShowEmailRemindAction,
  updateRemindTemplateAction,

  getRemindEmailTemplate: getRemindEmailTemplateAction,
  getRemindFBMessageTemplate: getRemindFBMessageTemplateAction,

  sendEmailNotify: sendEmailNotifyAction,
  sendFBMessageNotify: sendFBMessageNotifyAction,

  updatOrderCustomer: updatOrderCustomerAction,
  sentEmailRemindAction,
  sentMessageRemindAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(RemindCustomer);
