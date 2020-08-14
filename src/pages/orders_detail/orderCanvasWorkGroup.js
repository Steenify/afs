import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { findIndex } from 'lodash';
import { getSelectedStatus, dateTimeStringFromDate } from 'utils';
import { PERMITTIONS_CONFIG, mapStatusOpen, mapStatusNotiy, mapStatusVerifyFile } from 'configs';

import { ReactComponent as Toggle } from 'assets/img/toggle.svg';
import { ReactComponent as Close } from 'assets/img/close.svg';

import Button from 'components/common/button';

import OrderWorkLogItem from './orderWorkLogItem';
import OrderRejectModal from './orderRejectModal';

import { approvedWorkLogAction, rejectedWorkLogAction, getEmailTemplateAction, createOrderCanvasWorkLogAction } from './actions';

const OrderCanvasWorkGroup = ({ order, group, works, status, approvedWorkLog, rejectedWorkLog, getEmailTemplate, accountInfo, createOrderCanvasWorkLogAction, isNewOrder, workLog, lastWorkLog }) => {
  let isOpened = false;

  if (mapStatusOpen[group].indexOf(order.statusForCanvas) !== -1 || isNewOrder) {
    isOpened = true;
  }

  const canCreateWorkLogForCanvas = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.CREATE_WORK_LOG_FOR_CANVAS) || false;

  const handleStartPrintting = () => {
    if (status.length) {
      createOrderCanvasWorkLogAction(order.id);
    }
  };

  const isNotifyStatus = mapStatusNotiy.indexOf(order.statusForCanvas) !== -1;
  const needCheckFile = mapStatusVerifyFile.indexOf(order.statusForCanvas) !== -1;

  const [isOpen, setIsOpen] = useState(isOpened || false);
  const toggle = () => setIsOpen(!isOpen);

  const lastWork = works[works.length - 1];

  const canNotifyCustomer = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.NOTIFY_BOOKING_TO_CUSTOMER) || false;

  const canAprroved = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.APPROVE_WORK_LOG) || false;
  const canRejected = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.REJECT_WORK_LOG) || false;

  const handleApproveWorkLog = (LogId) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='comfirm_cus'>
            <div className='comfirm_cus__header'>
              <div className='comfirm_cus__titl'>Change Status</div>
              <button type='button' onClick={onClose} className='comfirm_cus__close'>
                <div className='icon'>
                  <Close />
                </div>
              </button>
            </div>
            <div className='comfirm_cus__body'>
              <p>Are you sure you want to change status this orders?</p>
            </div>
            <div className='comfirm_cus__footer text-right'>
              <button className='comfirm_cus__cancel comfirm_cus__control' onClick={onClose}>
                Cancel
              </button>
              <button
                className='comfirm_cus__accept comfirm_cus__control'
                onClick={() => {
                  approvedWorkLog(order.id, LogId, 'canvasWorkLog');
                  onClose();
                }}>
                Accept
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const handleNotifyEmail = (workLogIndex) => {
    const currentStatus = getSelectedStatus(order.statusForCanvas, status);
    if (currentStatus.emailTemplates && currentStatus.emailTemplates.length) {
      getEmailTemplate(order.id, currentStatus.emailTemplates[0].id, workLogIndex);
    } else {
      toast.warn('No Email template found!');
    }
  };

  const handleConfirmRejectWorkLog = (LogId, workLogIndex) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <OrderRejectModal
            onClose={onClose}
            orderNumber={order.number}
            onConfirm={(data) => {
              if (data.content) {
                rejectedWorkLog(
                  order.id,
                  LogId,
                  data,
                  workLogIndex,
                  () => {
                    onClose();
                  },
                  'canvasWorkLog',
                );
              } else {
                toast.warn('Please input reject reason!');
              }
            }}
          />
        );
      },
    });
  };

  return (
    <div className='order_detail__work_group group'>
      <div className={`group__header ${group || ''}`}>
        <div className='group__title' onClick={toggle}>
          <div className={`state ${!isNewOrder ? 'dot' : ''}`}>{getSelectedStatus(group, status).friendlyName}</div>
          {!isNewOrder && <div className='deadline'>{dateTimeStringFromDate(lastWork?.createdDate)}</div>}
        </div>

        <button onClick={toggle} type='button' className='group__toggle'>
          <div className='icon'>
            <Toggle />
          </div>
        </button>
      </div>
      <Collapse isOpen={isOpen}>
        <div className={`group__body ${isNewOrder && 'isNewOrder'}`}>
          {works.map((work) => {
            const showActionState = lastWorkLog.id === work.id;
            const showActionPermitions = canNotifyCustomer || canAprroved || canRejected;

            const isNewStatus = work.status === 'NEW_ORDER';
            const isPreviewStatus = work.status === 'PRINT_PREVIEW';
            const isTrackingStatus = work.status === 'PRINT_TRACKING';
            const isReceivedStatus = work.status === 'PRINT_RECEIVED';

            const workLogIndex = findIndex(workLog, (log) => log.id === work.id);

            if (isReceivedStatus) {
              return null;
            }

            if (isNewStatus) {
              if (isNewOrder) {
                return (
                  <div key={`order_detail__work__${work.id}`} className='order_detail__work'>
                    {canCreateWorkLogForCanvas && (
                      <div className='order_detail__ctas text-center'>
                        <Button onClick={handleStartPrintting} color='primary' className='cta' type='button'>
                          Start Printing
                        </Button>
                      </div>
                    )}
                  </div>
                );
              } else return null;
            }

            return (
              <div key={`order_detail__work__${work.id}`} className='order_detail__work'>
                <OrderWorkLogItem workLogType='canvasWorkLog' work={work} isOpened={showActionState} order={order} />

                {showActionState && showActionPermitions && (
                  <div className='order_detail__ctas d-flex flex-wrap justify-content-between'>
                    <div className=''>
                      {canNotifyCustomer && isNotifyStatus && (
                        <Button color='primary' onClick={() => handleNotifyEmail(workLogIndex)} className='cta cta2 mb-3 order_detail__notify' type='button'>
                          Notify Customer
                        </Button>
                      )}
                    </div>

                    <div className='d-flex'>
                      {canRejected && (
                        <Button
                          color='secondary'
                          onClick={() => handleConfirmRejectWorkLog(work.id, workLogIndex)}
                          className='cta cta2 mr-2 mb-3'
                          disabled={!(work.attachments.length > 0) && needCheckFile}
                          type='button'>
                          Reject
                        </Button>
                      )}

                      {canAprroved && (
                        <Button color='primary' onClick={() => handleApproveWorkLog(work.id)} className='cta cta2 mb-3' disabled={!(work.attachments.length > 0) && needCheckFile} type='button'>
                          Approved
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Collapse>
    </div>
  );
};

const mapStateToProps = ({ auth, orderDetail }) => ({
  accountInfo: auth.data.accountInfo,
  workLog: orderDetail.data.canvasWorkLog,
});

const mapDispatchToProps = {
  approvedWorkLog: approvedWorkLogAction,
  rejectedWorkLog: rejectedWorkLogAction,
  getEmailTemplate: getEmailTemplateAction,
  createOrderCanvasWorkLogAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderCanvasWorkGroup);
