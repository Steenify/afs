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
  updateShowEmailNotifyAction,
  updateEmailNotifyAction,
  sendEmailNotifyAction,
  getEmailTemplateAction,
  updateFbTemplateNotifyAction,
  getFBMessageTemplateAction,
  sendFBMessageNotifyAction,
  updatOrderCustomerAction,
} from './actions';

const EmaiNotify = (props) => {
  const {
    isShowEmail,
    email,
    updateShowEmailNotify,
    updateEmailNotify,
    sendEmailNotify,
    loadingEmail,
    status,
    order,
    selectedEmailTemplate,
    getEmailTemplate,
    emailTitle,
    fbTemplate,
    fbTemplateAttachments,
    customer,
    updateFbTemplateNotify,
    currentWorkLogIndex,
    getFBMessageTemplate,
    sendFBMessageNotify,
    updatOrderCustomer,
    currentArtistId,
    currentWorkLogType,
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

  const { emailTemplates, name } = getSelectedStatus(order.statusForCanvas || order.status, status);

  const toggle = () => {
    updateShowEmailNotify(!isShowEmail);
  };

  const handleUpdateEmail = (e) => {
    const value = e.target.getContent();
    updateEmailNotify(value);
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
    updateFbTemplateNotify(value);
  };

  const handleGetNewTemplate = (templateId) => {
    getEmailTemplate(order.id, templateId, currentWorkLogIndex, currentWorkLogType, currentArtistId);
    getFBMessageTemplate(order.id, templateId, currentWorkLogIndex, currentWorkLogType, currentArtistId);
  };

  const handleChangeTabType = (e) => {
    const data = e.target.getAttribute('data');
    setNotifyType(data || 'email');
    if (data === 'facebook') {
      const firstTemplate = (emailTemplates || [])[0] || {};
      handleGetNewTemplate(firstTemplate?.id);
    }
  };

  const handleSentNotify = () => {
    if (notifyType === 'email') {
      sendEmailNotify(customerEmail);
    } else {
      sendFBMessageNotify(customer?.contact?.psid);
    }
  };

  return (
    <Modal isOpen={isShowEmail} toggle={toggle} fade={false} size='lg' className='modal-dialog-centered  modal-no-border'>
      <div className='order_detail__email'>
        <ModalHeader toggle={toggle}>
          Email Notify
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

          <ul className='nav nav-pills template__list'>
            {map(emailTemplates, (template) => (
              <li key={`template_email__item__${template.id}`} className='nav-item mr-2 mb-2'>
                <button onClick={() => handleGetNewTemplate(template.id)} className={`nav-link btn btn-link ${name} ${template.id === selectedEmailTemplate && 'active'}`}>
                  {template.name}
                </button>
              </li>
            ))}
          </ul>

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
                  <input type='text' className='form-control clipboad__input' value={emailTitle || ''} onChange={() => {}} placeholder='Email Title' />
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
  isShowEmail: orderDetail.ui.isShowEmail,
  loadingEmail: orderDetail.ui.loadingEmail,
  selectedEmailTemplate: orderDetail.data.selectedEmailTemplate,
  email: orderDetail.data.email,
  emailTitle: orderDetail.data.emailTitle,
  fbTemplate: orderDetail.data.fbTemplate,
  fbTemplateAttachments: orderDetail.data.fbTemplateAttachments,
  customer: orderDetail.data.customer,
  currentWorkLogIndex: orderDetail.data.currentWorkLogIndex,
  currentArtistId: orderDetail.data.currentArtistId,
  currentWorkLogType: orderDetail.data.currentWorkLogType,
});

const mapDispatchToProps = {
  updateShowEmailNotify: updateShowEmailNotifyAction,
  updateEmailNotify: updateEmailNotifyAction,
  sendEmailNotify: sendEmailNotifyAction,
  getEmailTemplate: getEmailTemplateAction,
  updateFbTemplateNotify: updateFbTemplateNotifyAction,
  getFBMessageTemplate: getFBMessageTemplateAction,
  sendFBMessageNotify: sendFBMessageNotifyAction,
  updatOrderCustomer: updatOrderCustomerAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmaiNotify);
