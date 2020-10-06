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

import {
  approvedWorkLogAction,
  rejectedWorkLogAction,
  getNotifyTemplatesAction,
  updateOrderStatusAction,
  uploadCommentWorkLogAction,
  getRemindTemplatesAction,
  createOrderCanvasWorkLogAction,
} from './actions';

const OrderArtWorkGroup = ({
  order,
  group,
  works,
  status,
  approvedWorkLog,
  rejectedWorkLog,
  getNotifyTemplatesAction,
  getRemindTemplatesAction,
  accountInfo,
  updateOrderStatus,
  isNewOrder,
  uploadCommentWorkLog,
  createOrderCanvasWorkLogAction,
  workLog,
  lastWorkLog,
  hasPoster,
}) => {
  let isOpened = false;

  if (mapStatusOpen[group].indexOf(order.status) !== -1) {
    isOpened = true;
  }

  const isNotifyStatus = mapStatusNotiy.indexOf(order.status) !== -1;
  const needCheckFile = mapStatusVerifyFile.indexOf(order.status) !== -1;

  const [isOpen, setIsOpen] = useState(isOpened || false);
  const toggle = () => setIsOpen(!isOpen);

  const lastWork = works[works.length - 1];

  const canNotifyCustomer = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.NOTIFY_BOOKING_TO_CUSTOMER) || false;

  const canAprroved = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.APPROVE_WORK_LOG) || false;
  const canRejected = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.REJECT_WORK_LOG) || false;

  const canCreateWorkLogForCanvas = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.CREATE_WORK_LOG_FOR_CANVAS) || false;
  const canChangeStatus = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.UPDATE_STATUS_BOOKING) || false;

  const handleApproveWorkLog = (LogId, isSendFile) => {
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
                  if (canCreateWorkLogForCanvas && isSendFile && hasPoster) {
                    createOrderCanvasWorkLogAction(order.id, LogId);
                  } else {
                    approvedWorkLog(order.id, LogId);
                  }
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
    const currentStatus = getSelectedStatus(order.status, status);
    if (currentStatus.emailTemplates && currentStatus.emailTemplates.length) {
      getNotifyTemplatesAction(order.id, currentStatus.emailTemplates[0].id, workLogIndex);
    } else {
      toast.warn('No Email template found!');
    }
  };

  const handleRemindEmail = (workLogIndex) => {
    getRemindTemplatesAction(order.id, workLogIndex);
  };

  const handleStartSketch = () => {
    if (status.length) {
      updateOrderStatus(order.id, status[1].name);
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
                rejectedWorkLog(order.id, LogId, data, workLogIndex, () => {
                  onClose();
                });
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
          <div className='state dot'>{getSelectedStatus(group, status).friendlyName}</div>
          <div className='deadline'>{dateTimeStringFromDate(lastWork?.createdDate)}</div>
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
            const isDoneStatus = work.status === 'DONE';
            const isExportFile = work.status === 'EXPORT_FILE';
            const isSendFile = work.status === 'SEND_FILE';

            const workLogIndex = findIndex(workLog, (log) => log.id === work.id);

            if (isDoneStatus) {
              return null;
            }

            if (isNewStatus) {
              if (isNewOrder) {
                return (
                  <div key={`order_detail__work__${work.id}`} className='order_detail__work'>
                    {canChangeStatus && (
                      <div className='order_detail__ctas text-center'>
                        <Button onClick={handleStartSketch} color='primary' className='cta' type='button'>
                          Start Sketching
                        </Button>
                      </div>
                    )}
                  </div>
                );
              } else return null;
            }

            return (
              <div key={`order_detail__work__${work.id}`} className='order_detail__work'>
                <OrderWorkLogItem work={work} isOpened={showActionState} order={order} />

                {isSendFile && order.statusForCanvas ? (
                  <></>
                ) : (
                  <>
                    {showActionState && showActionPermitions && (
                      <div className='order_detail__ctas ctas d-flex flex-wrap justify-content-between'>
                        <div className='ctas__group'>
                          {canNotifyCustomer && isNotifyStatus && (
                            <Button color='primary' onClick={() => handleNotifyEmail(workLogIndex)} containerClassName='ctas__item' className='ctas__button mb-3 order_detail__notify' type='button'>
                              Notify Customer
                            </Button>
                          )}
                          {canNotifyCustomer && isNotifyStatus && (
                            <Button color='primary' onClick={() => handleRemindEmail(workLogIndex)} containerClassName='ctas__item' className='ctas__button mb-3 order_detail__remind' type='button'>
                              Remind Customer
                            </Button>
                          )}
                        </div>

                        <div className='ctas__group'>
                          {canRejected && !isExportFile && !isSendFile && (
                            <Button
                              color='secondary'
                              containerClassName='ctas__item'
                              onClick={() => handleConfirmRejectWorkLog(work.id, workLogIndex)}
                              className='ctas__button mb-3'
                              disabled={!(work.attachments.length > 0) && needCheckFile}
                              type='button'>
                              Reject
                            </Button>
                          )}

                          {canAprroved && !isSendFile && (
                            <Button
                              color='primary'
                              onClick={() => handleApproveWorkLog(work.id)}
                              containerClassName='ctas__item'
                              className='ctas__button mb-3'
                              disabled={!(work.attachments.length > 0) && needCheckFile}
                              type='button'>
                              Approved
                            </Button>
                          )}

                          {isSendFile && (
                            <Button color='primary' onClick={() => handleApproveWorkLog(work.id, isSendFile)} containerClassName='ctas__item' className='mb-3 ctas__button' type='button'>
                              {hasPoster ? 'Start Printing' : 'Mark as Done'}
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </>
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
  workLog: orderDetail.data.workLog,
});

const mapDispatchToProps = {
  approvedWorkLog: approvedWorkLogAction,
  rejectedWorkLog: rejectedWorkLogAction,
  getNotifyTemplatesAction,
  updateOrderStatus: updateOrderStatusAction,
  uploadCommentWorkLog: uploadCommentWorkLogAction,
  getRemindTemplatesAction,
  createOrderCanvasWorkLogAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderArtWorkGroup);
