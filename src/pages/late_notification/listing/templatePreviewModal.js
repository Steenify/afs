import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { map } from 'lodash';
import { toast } from 'react-toastify';

import Button from 'components/common/button';
import ImageGallery from 'components/common/imageGallery';

import { getListImageUrl, mapDataList, mapDataByIds } from 'utils';

import { ReactComponent as CloseIcon } from 'assets/img/close.svg';
import { notifyChannels, tinymceInitValues } from 'constants/index';
import {
  updateCurrentItemAction,
  updateCurrentItemOrderSelectionAction,
  updateEmailTemplateAction,
  updateMessageTemplateAction,
  updatePreviewOrdersAction,
  setPreviewOrdersAction,
  updatePreviewEmailTemplateAction,
} from './action';

const Template = ({
  sendEmailNotify,
  customer,
  updateFbTemplateNotify,
  sendFBMessageNotify,
  item,
  lateBookings = [],
  emailTemplate = { title: '', content: '' },
  messageTemplate = { content: '', attachments: [] },
  previewOrderItems,
  isPreview = false,
  currentPreview,
  previewItem,

  updateCurrentItemAction,
  updateCurrentItemOrderSelectionAction,
  updateEmailTemplateAction,
  updateMessageTemplateAction,
  updatePreviewOrdersAction,
  setPreviewOrdersAction,
  updatePreviewEmailTemplateAction,
}) => {
  const [notifyType, setNotifyType] = useState(notifyChannels[0].id);

  useEffect(() => {
    if (item === null) {
      setNotifyType(notifyChannels[0].id);
      setPreviewOrdersAction(null);
      updatePreviewOrdersAction(null);
    }
  }, [item, setPreviewOrdersAction, updatePreviewOrdersAction]);

  const toggle = () => {
    updateCurrentItemAction(null);
  };

  const handleUpdateEmailContent = (e) => {
    const value = e.target.getContent();
    const field = 'content';
    if (isPreview) {
      updatePreviewEmailTemplateAction({ id: currentPreview, field, value });
    } else {
      updateEmailTemplateAction({ field, value });
    }
  };

  const handleUpdateEmailTitle = (e) => {
    const { value } = e.target;
    const field = 'title';
    if (isPreview) {
      updatePreviewEmailTemplateAction({ id: currentPreview, field, value });
    } else {
      updateEmailTemplateAction({ field, value });
    }
  };

  const handleUpdateEmail = (e) => {
    const { value } = e.target;
    updatePreviewEmailTemplateAction({ id: currentPreview, field: 'email', value });
  };

  const handleUpdateFBTemplate = (e) => {
    const { value } = e.target;
    updateMessageTemplateAction({ field: 'content', value });
  };

  const handleChangeTabType = (e) => {
    const data = e.target.getAttribute('data');
    setNotifyType(data || 'email');
  };

  const handleSentNotify = () => {
    if (notifyType === 'email') {
      // sendEmailNotify(customerEmail);
    } else {
      // sendFBMessageNotify(customer?.contact?.psid);
    }
  };

  const handlePreview = () => {
    const orders = lateBookings
      .filter((b) => b.selected)
      .map((b, index) => {
        const { number, customer } = b;
        const mappedEmail = {
          title: emailTemplate.title.replace(/#Order/gi, `#${number}`),
          content: emailTemplate.content.replace(/Customer/gi, customer?.firstName || customer?.lastName || 'Customer'),
          email: customer?.email || '',
        };
        const mappedMessage = { ...messageTemplate };
        return { ...b, messageTemplate: mappedMessage, emailTemplate: mappedEmail };
      });
    updatePreviewOrdersAction(orders[0]?.id || null);
    setPreviewOrdersAction(mapDataByIds(orders, 'id').items);
  };

  const CheckboxOrder = ({ order }) => {
    const { number, code, id, selected } = order;
    return (
      <div className={`d-flex row pb-2 align-items-center ml-0`}>
        <label className='cus-checkbox'>
          <input className='form-control sr-only' id={code} type='checkbox' onChange={() => updateCurrentItemOrderSelectionAction({ id, value: !selected })} checked={selected} />
          <span className='checkmark'></span>
        </label>
        <label className='pl-3 checkbox_title mb-0' htmlFor={code}>{`#${number}`}</label>
      </div>
    );
  };

  const PreviewOrder = ({ order }) => {
    const { number, id } = order;
    return <div className={`preview_item ${id === currentPreview && 'preview_active'}`} onClick={() => updatePreviewOrdersAction(id)}>{`#${number}`}</div>;
  };

  return (
    <Modal isOpen={item !== null} toggle={toggle} fade={false} size='xl' className='modal-dialog-centered  modal-no-border'>
      <div className='order_detail__email'>
        <ModalHeader toggle={toggle}>
          {isPreview ? 'Send Notification' : 'Template Content'}
          <button type='button' className='modal-close' onClick={toggle}>
            <CloseIcon width='25px' height='25px' />
          </button>
        </ModalHeader>
        <ModalBody>
          <div className='template__types'>
            <div className='btn-group w-100' role='group' aria-label='Notify Type'>
              {notifyChannels.map(({ id, title }) => (
                <button key={`channel__${id}`} type='button' className={`btn btn-link template__type ${notifyType === id && 'active'}`} data={id} onClick={handleChangeTabType}>
                  {title}
                </button>
              ))}
            </div>
          </div>

          <div className='template__content__wrapper row'>
            <div className='col-lg-2 col-md-4 content_left'>
              <div className='content_title'>Order:</div>
              {!isPreview && lateBookings.map?.((order, index) => <CheckboxOrder order={order} key={`CheckboxOrder__${index}`} />)}
              {isPreview && previewOrderItems.map?.((order, index) => <PreviewOrder order={order} key={`PreviewOrder__${index}`} />)}
            </div>
            <div className='col-lg-10 col-md-8 content_right'>
              <div className='content_title'>{isPreview ? 'Content:' : 'Template Content:'}</div>
              <div className={`template__content ${notifyType !== 'email' ? 'd-none' : ''}`}>
                <div>
                  {isPreview && (
                    <div className='input-group clipboad mb-3'>
                      <div className='input-group-append'>
                        <span className='input-group-text'>Email: </span>
                      </div>
                      <input type='text' className='form-control clipboad__input' value={previewItem?.emailTemplate?.email || ''} onChange={handleUpdateEmail} placeholder='Customer Email' />
                      <CopyToClipboard text={previewItem?.emailTemplate?.email || ''} onCopy={() => toast.dark('Copied')}>
                        <div className='input-group-append clipboad__input'>
                          <span className='input-group-text'>Copy</span>
                        </div>
                      </CopyToClipboard>
                    </div>
                  )}
                  <div className='input-group clipboad mb-3'>
                    <div className='input-group-append'>
                      <span className='input-group-text'>Title: </span>
                    </div>
                    <input
                      type='text'
                      className='form-control clipboad__input'
                      value={isPreview ? previewItem?.emailTemplate?.title || '' : emailTemplate.title || ''}
                      onChange={handleUpdateEmailTitle}
                      placeholder='Email Title'
                    />
                    {isPreview && (
                      <CopyToClipboard text={previewItem?.emailTemplate?.title || ''} onCopy={() => toast.dark('Copied')}>
                        <div className='input-group-append clipboad__input'>
                          <span className='input-group-text'>Copy</span>
                        </div>
                      </CopyToClipboard>
                    )}
                  </div>

                  <Editor
                    apiKey={tinymceInitValues.apiKey}
                    initialValue={emailTemplate.content || ''}
                    value={isPreview ? previewItem?.emailTemplate?.content || '' : emailTemplate.content || ''}
                    init={tinymceInitValues}
                    onChange={handleUpdateEmailContent}
                  />
                </div>
              </div>

              <div className={`template__content ${notifyType === 'email' ? 'd-none' : ''}`}>
                <div className='template__message'>
                  {/* <CustomersUpdateContact id={customer?.id} login={customer?.login} psid={customer?.contact?.psid} onSaveData={handleSaveCustomerContact} /> */}

                  <div className='content mb-3'>
                    <textarea className='form-control' value={messageTemplate.content || ''} onChange={handleUpdateFBTemplate} cols='30' rows='10' />
                  </div>
                  {/* <div className='title mb-3'>Attachments</div>
                  <div className='photos'>
                    <ImageGallery images={getListImageUrl(messageTemplate.attachments || [])} alt={'Late notification attachments'} caption={'Late notification attachments'} />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {isPreview && (
            <Button
              color='secondary'
              onClick={() => {
                setPreviewOrdersAction(null);
                updatePreviewOrdersAction(null);
              }}>
              Back
            </Button>
          )}
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
          <Button color='primary' type='submit' onClick={isPreview ? handleSentNotify : handlePreview} disabled={lateBookings.filter((item) => item.selected).length === 0} style={{ width: 210 }}>
            {isPreview ? 'Send' : 'Preview'}
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};
const mapStateToProps = ({
  orderDetail,
  order,
  lateNotification: {
    listing: {
      data: { currentItem, template, previewOrderItems, currentPreview },
    },
  },
}) => {
  // const mappedItems =
  return {
    status: order.status,
    isShowEmail: orderDetail.ui.isShowEmail,
    loadingEmail: orderDetail.ui.loadingEmail,
    selectedEmailTemplate: orderDetail.data.selectedEmailTemplate,
    email: orderDetail.data.email,
    emailTitle: orderDetail.data.emailTitle,
    fbTemplate: orderDetail.data.fbTemplate,
    fbTemplateAttachments: orderDetail.data.fbTemplateAttachments,
    customer: orderDetail.data.customer,
    currentWorkLogIndex: orderDetail.data.currentWorkLogIndex,
    item: currentItem,
    messageTemplate: currentItem?.messageTemplate,
    emailTemplate: currentItem?.emailTemplate,
    lateBookings: Object.values(currentItem?.lateBookings || {}),
    previewItem: previewOrderItems?.[currentPreview] || null,
    previewOrderItems: Object.values(previewOrderItems || {}),
    currentPreview,
    isPreview: previewOrderItems !== null,
  };
};

const mapDispatchToProps = {
  updateCurrentItemOrderSelectionAction,
  updateCurrentItemAction,
  updateEmailTemplateAction,
  updateMessageTemplateAction,
  updatePreviewOrdersAction,
  setPreviewOrdersAction,
  updatePreviewEmailTemplateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Template);
