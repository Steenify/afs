import React from 'react';
import { connect } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'reactstrap';
import { map } from 'lodash';

import Button from 'components/common/button';

import { getSelectedStatus } from 'utils';

import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

import {
  updateShowEmailNotifyAction,
  updateEmailNotifyAction,
  sendEmailNotifyAction,
  getEmailTemplateAction,
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
  } = props;

  const { emailTemplates } = getSelectedStatus(order.status, status);

  const toggle = () => {
    updateShowEmailNotify(!isShowEmail);
  };

  const handleUpdateEmail = (e) => {
    const value = e.target.getContent();
    updateEmailNotify(value);
  };

  const handleGetNewTemplate = (templateId) => {
    if (selectedEmailTemplate !== templateId) {
      getEmailTemplate(order.id, templateId);
    }
  };

  return (
    <Modal
      isOpen={isShowEmail}
      toggle={toggle}
      fade={false}
      size='lg'
      className='modal-dialog-centered  modal-no-border'>
      <div className='order_detail__email'>
        <ModalHeader toggle={toggle}>
          Email Notify
          <button type='button' className='modal-close' onClick={toggle}>
            <CloseIcon />
          </button>
        </ModalHeader>
        <ModalBody>
          <ul className='nav nav-pills template__list'>
            {map(emailTemplates, (template) => (
              <li
                key={`template_email__item__${template.id}`}
                className='nav-item mr-2 mb-2'>
                <button
                  onClick={() => handleGetNewTemplate(template.id)}
                  className={`nav-link btn btn-link ${
                    template.id === selectedEmailTemplate && 'active'
                  }`}>
                  {template.name}
                </button>
              </li>
            ))}
          </ul>
          <div className='template__content'>
            {loadingEmail ? (
              <div
                style={{ minHeight: '100px' }}
                className='order_detail__customer box d-flex align-items-center justify-content-center'>
                <Spinner />
              </div>
            ) : (
              <Editor
                apiKey='8yd4ibfq5z8v9bj8ddn2hezmxgm68ijow36krpjasr0ucty8'
                initialValue={email || ''}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image',
                    'charmap print preview anchor help',
                    'searchreplace visualblocks code',
                    'insertdatetime media table paste wordcount',
                  ],
                  toolbar: `undo redo | formatselect | bold italic |
              alignleft aligncenter alignright | code | \
              bullist numlist outdent indent | help`,
                }}
                onChange={handleUpdateEmail}
              />
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' type='submit' onClick={sendEmailNotify}>
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
const mapStateToProps = ({ orderDetail, order }) => ({
  status: order.status,
  isShowEmail: orderDetail.ui.isShowEmail,
  loadingEmail: orderDetail.ui.loadingEmail,
  selectedEmailTemplate: orderDetail.data.selectedEmailTemplate,
  email: orderDetail.data.email,
});

const mapDispatchToProps = {
  updateShowEmailNotify: updateShowEmailNotifyAction,
  updateEmailNotify: updateEmailNotifyAction,
  sendEmailNotify: sendEmailNotifyAction,
  getEmailTemplate: getEmailTemplateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmaiNotify);
