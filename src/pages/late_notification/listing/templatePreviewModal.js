/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';

import Button from 'components/common/button';
import { ReactComponent as CloseIcon } from 'assets/img/close.svg';
import { notifyChannels, tinymceInitValues } from 'constants/index';
import {
  setCurrentItemAction,
  setCurrentPreviewIdAction,
  setPreviewOrdersAction,
  updateCurrentItemOrderSelectionAction,
  updateCurrentItemAction,
  updatePreviewItemsAction,
  generateTemplateAction,
  sendEmailAction,
  viewSentContentAction,
} from './action';
import useKeyPress from 'utils/useKeyPress';
import ContactPopover from 'components/layout/contactPopover/index.js';

const Template = ({
  item,
  lateBookings = [],
  emailTemplate = { title: '', content: '' },
  messageTemplate = { content: '', attachments: [] },
  previewOrderItems = [],
  isPreview = false,
  isView = false,
  currentPreview,
  currentViewId,
  previewItem,
  generatingTemplate,
  sentEmail = { title: '', content: '', customerEmail: '' },

  setCurrentItemAction,
  updateCurrentItemOrderSelectionAction,
  setCurrentPreviewIdAction,
  setPreviewOrdersAction,
  generateTemplateAction,
  sendEmailAction,
  updateCurrentItemAction,
  updatePreviewItemsAction,
  viewSentContentAction,
}) => {
  const [notifyType, setNotifyType] = useState(notifyChannels[0].id);

  useEffect(() => {
    if (item === null) {
      setNotifyType(notifyChannels[0].id);
      setPreviewOrdersAction(null);
      setCurrentPreviewIdAction(null);
    }
  }, [item, setPreviewOrdersAction, setCurrentPreviewIdAction]);

  useEffect(() => {
    if (isView) {
      viewSentContentAction();
    }
  }, [viewSentContentAction, item?.currentViewId]);

  const toggle = () => {
    setCurrentItemAction(null);
  };

  const handleUpdateEmailContent = (value) => {
    if (isPreview) {
      updatePreviewItemsAction({
        [currentPreview]: {
          ...(previewItem || {}),
          emailTemplate: {
            ...(previewItem?.emailTemplate || {}),
            content: value,
          },
        },
      });
    } else {
      updateCurrentItemAction({ emailTemplate: { ...(item?.emailTemplate || {}), content: value } });
    }
  };

  const handleUpdateEmailTitle = (e) => {
    const { value } = e.target;
    if (isPreview) {
      updatePreviewItemsAction({
        [currentPreview]: {
          ...(previewItem || {}),
          emailTemplate: {
            ...(previewItem?.emailTemplate || {}),
            title: value,
          },
        },
      });
    } else {
      updateCurrentItemAction({ emailTemplate: { ...(item?.emailTemplate || {}), title: value } });
    }
  };

  const handleSaveData = (value) => {
    // const { contact } = customer;
    // updatOrderCustomer({
    //   contact: {
    //     ...contact,
    //     psid: value.exId,
    //   },
    // });
  };

  const handleUpdateFBTemplate = (e) => {
    const { value } = e.target;
    if (isPreview) {
      updatePreviewItemsAction({
        [currentPreview]: {
          ...(previewItem || {}),
          messageTemplate: {
            content: value,
          },
        },
      });
    } else {
      updateCurrentItemAction({ messageTemplate: { content: value } });
    }
  };

  const handleChangeTabType = (e) => {
    const data = e.target.getAttribute('data');
    setNotifyType(data || 'email');
  };

  const handleSentNotify = () => {
    if (notifyType === 'email') {
      sendEmailAction();
      // sendEmailNotify(customerEmail);
    } else {
      // sendFBMessageNotify(customer?.contact?.psid);
    }
  };

  const handlePreview = () => {
    const orders = lateBookings.filter((b) => b.selected);
    generateTemplateAction(orders);
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
    return <div className={`preview_item ${id === currentPreview && 'preview_active'}`} onClick={() => setCurrentPreviewIdAction(id)}>{`#${number}`}</div>;
  };

  const ViewOrder = ({ order }) => {
    const { number, id } = order;
    return <div className={`preview_item ${id === currentViewId && 'preview_active'}`} onClick={() => updateCurrentItemAction({ currentViewId: id })}>{`#${number}`}</div>;
  };

  return (
    <Modal isOpen={item !== null} toggle={toggle} fade={false} size='xl' className='modal-dialog-centered  modal-no-border'>
      <div className='order_detail__email'>
        <ModalHeader toggle={toggle}>
          {isView ? 'Sent Content' : isPreview ? 'Send Notification' : 'Template Content'}
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
              {!isView && !isPreview && lateBookings.map?.((order, index) => <CheckboxOrder order={order} key={`CheckboxOrder__${index}`} />)}
              {!isView && isPreview && previewOrderItems.map?.((order, index) => <PreviewOrder order={order} key={`PreviewOrder__${index}`} />)}
              {isView && lateBookings.map?.((order, index) => <ViewOrder order={order} key={`ViewOrder__${index}`} />)}
            </div>
            <div className='col-lg-10 col-md-8 content_right'>
              <div className='content_title'>{isView ? 'Sent Content:' : isPreview ? 'Content:' : 'Template Content:'}</div>
              {generatingTemplate ? (
                <div style={{ minHeight: '100px' }} className='order_detail__customer box d-flex align-items-center justify-content-center'>
                  <Spinner />
                </div>
              ) : (
                <React.Fragment>
                  <div className={`template__content ${notifyType !== 'email' ? 'd-none' : ''}`}>
                    <div>
                      {(isPreview || isView) && (
                        <div className='input-group clipboad mb-3'>
                          <div className='input-group-append'>
                            <span className='input-group-text'>Email: </span>
                          </div>
                          <input
                            type='text'
                            className='form-control clipboad__input'
                            value={isView ? sentEmail.customerEmail : previewItem?.emailTemplate?.email || ''}
                            disabled={true}
                            placeholder='Customer Email'
                          />
                          <CopyToClipboard text={isView ? sentEmail.customerEmail : previewItem?.emailTemplate?.email || ''} onCopy={() => toast.dark('Copied')}>
                            <div className='input-group-append clipboad__input'>
                              <span className='input-group-text'>Copy</span>
                            </div>
                          </CopyToClipboard>
                        </div>
                      )}
                      <div className='input-group clipboad mb-3'>
                        <div className='input-group-append'>
                          <span className='input-group-text '>Title: </span>
                        </div>
                        <input
                          type='text'
                          className='form-control clipboad__input email-title'
                          value={isView ? sentEmail.title : isPreview ? previewItem?.emailTemplate?.title || '' : emailTemplate.title || ''}
                          onChange={handleUpdateEmailTitle}
                          placeholder='Email Title'
                          disabled={isView}
                        />
                        {(isPreview || isView) && (
                          <CopyToClipboard text={isView ? sentEmail.title : previewItem?.emailTemplate?.title || ''} onCopy={() => toast.dark('Copied')}>
                            <div className='input-group-append clipboad__input'>
                              <span className='input-group-text'>Copy</span>
                            </div>
                          </CopyToClipboard>
                        )}
                      </div>
                      <Editor
                        apiKey={tinymceInitValues.apiKey}
                        value={isView ? sentEmail.content : isPreview ? previewItem?.emailTemplate?.content || '' : emailTemplate.content || ''}
                        init={tinymceInitValues}
                        onEditorChange={handleUpdateEmailContent}
                        disabled={isView}
                      />
                      {/* {isPreview ? (

                      ) : (
                        <Editor key='This2' apiKey={tinymceInitValues.apiKey} value={emailTemplate.content || ''} init={tinymceInitValues} onEditorChange={handleUpdateEmailContent} />
                      )} */}
                    </div>
                  </div>

                  <div className={`template__content ${notifyType === 'email' ? 'd-none' : ''}`}>
                    <div className='template__message'>
                      {isPreview && <ContactPopover psid={previewItem?.customer?.psid} onSaveData={handleSaveData} />}
                      <div className='content mb-3'>
                        <textarea
                          className='form-control'
                          value={isPreview ? previewItem?.messageTemplate?.content || '' : messageTemplate.content || ''}
                          onChange={handleUpdateFBTemplate}
                          cols='30'
                          rows='10'
                        />
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {/* {isPreview && (
            <Button
              color='secondary'
              onClick={() => {
                setPreviewOrdersAction(null);
                setCurrentPreviewIdAction(null);
              }}>
              Back
            </Button>
          )} */}
          <Button
            color='secondary'
            onClick={
              isPreview
                ? () => {
                    setPreviewOrdersAction(null);
                    setCurrentPreviewIdAction(null);
                  }
                : toggle
            }>
            {isPreview ? 'Back' : 'Cancel'}
          </Button>
          {!isView && (
            <Button color='primary' type='submit' onClick={isPreview ? handleSentNotify : handlePreview} disabled={lateBookings.filter((item) => item.selected).length === 0} style={{ width: 210 }}>
              {isPreview ? 'Send' : 'Preview'}
            </Button>
          )}
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
      data: { currentItem, template, previewOrderItems, currentPreview, sentEmail },
      ui: { generatingTemplate },
    },
  },
}) => {
  return {
    item: currentItem,
    messageTemplate: currentItem?.messageTemplate,
    emailTemplate: currentItem?.emailTemplate,
    lateBookings: Object.values(currentItem?.lateBookings || {}),
    previewItem: previewOrderItems?.[currentPreview] || null,
    previewOrderItems: Object.values(previewOrderItems || {}),
    currentPreview,
    currentViewId: currentItem?.currentViewId,
    isPreview: previewOrderItems !== null,
    isView: currentItem?.action === 'VIEW',
    sentEmail,
    generatingTemplate,
  };
};

const mapDispatchToProps = {
  updateCurrentItemOrderSelectionAction,
  setCurrentItemAction,
  setPreviewOrdersAction,
  setCurrentPreviewIdAction,
  generateTemplateAction,
  sendEmailAction,
  updateCurrentItemAction,
  updatePreviewItemsAction,
  viewSentContentAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Template);
