import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { findIndex } from 'lodash';
import { getSelectedStatus, dateTimeStringFromDate } from 'utils';
import {
  PERMITTIONS_CONFIG,
  mapStatusOpen,
  mapStatusNotiy,
  mapStatusVerifyFile,
} from 'config';

import { ReactComponent as Toggle } from 'assets/img/toggle.svg';

import Button from 'components/common/button';

import OrderWorkLogItem from './orderWorkLogItem';
import OrderRejectModal from './orderRejectModal';

import {
  approvedWorkLogAction,
  rejectedWorkLogAction,
  getEmailTemplateAction,
  updateOrderStatusAction,
  uploadCommentWorkLogAction,
} from './actions';

const OrderArtWorkGroup = ({
  order,
  group,
  works,
  status,
  approvedWorkLog,
  rejectedWorkLog,
  getEmailTemplate,
  accountInfo,
  updateOrderStatus,
  isNewOrder,
  uploadCommentWorkLog,
  workLog,
  lastWorkLog,
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

  const canNotifyCustomer =
    accountInfo?.permissions?.includes(
      PERMITTIONS_CONFIG.NOTIFY_BOOKING_TO_CUSTOMER,
    ) || false;

  const canAprroved =
    accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.APPROVE_WORK_LOG) ||
    false;
  const canRejected =
    accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.REJECT_WORK_LOG) ||
    false;

  const canChangeStatus =
    accountInfo?.permissions?.includes(
      PERMITTIONS_CONFIG.UPDATE_STATUS_BOOKING,
    ) || false;

  const handleApproveWorkLog = (LogId) => {
    approvedWorkLog(order.id, LogId);
  };

  const handleNotifyEmail = () => {
    const currentStatus = getSelectedStatus(order.status, status);
    if (currentStatus.emailTemplates && currentStatus.emailTemplates.length) {
      getEmailTemplate(order.id, currentStatus.emailTemplates[0].id);
    } else {
      toast.warn('No Email template found!');
    }
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
                uploadCommentWorkLog(
                  order.id,
                  LogId,
                  data,
                  workLogIndex,
                  // () => {},
                );
                rejectedWorkLog(order.id, LogId, () => {
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
          <div className='state dot'>
            {getSelectedStatus(group, status).friendlyName}
          </div>
          <div className='deadline'>
            {dateTimeStringFromDate(lastWork?.createdDate)}
          </div>
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
            const showActionPermitions =
              canNotifyCustomer || canAprroved || canRejected;

            const isNewStatus = work.status === 'NEW_ORDER';
            const isDoneStatus = work.status === 'DONE';
            const isExportFile = work.status === 'EXPORT_FILE';
            const isSendFile = work.status === 'SEND_FILE';

            const workLogIndex = findIndex(
              workLog,
              (log) => log.id === work.id,
            );

            if (isDoneStatus) {
              return null;
            }

            if (isNewStatus) {
              if (isNewOrder) {
                return (
                  <div
                    key={`order_detail__work__${work.id}`}
                    className='order_detail__work'>
                    {canChangeStatus && (
                      <div className='order_detail__ctas text-center'>
                        <Button
                          onClick={handleStartSketch}
                          color='primary'
                          className='cta'
                          type='button'>
                          Start Sketching
                        </Button>
                      </div>
                    )}
                  </div>
                );
              } else return null;
            }

            return (
              <div
                key={`order_detail__work__${work.id}`}
                className='order_detail__work'>
                <OrderWorkLogItem
                  work={work}
                  isOpened={showActionState}
                  order={order}
                />

                {showActionState && showActionPermitions && (
                  <div className='order_detail__ctas d-flex flex-wrap justify-content-between'>
                    <div className=''>
                      {canNotifyCustomer && isNotifyStatus && (
                        <Button
                          color='primary'
                          onClick={handleNotifyEmail}
                          className='cta cta2 mb-3 order_detail__notify'
                          type='button'>
                          Notify Customer
                        </Button>
                      )}
                    </div>

                    <div className='d-flex'>
                      {canRejected && !isExportFile && !isSendFile && (
                        <Button
                          color='secondary'
                          onClick={() =>
                            handleConfirmRejectWorkLog(work.id, workLogIndex)
                          }
                          className='cta cta2 mr-2 mb-3'
                          disabled={
                            !(work.attachments.length > 0) && needCheckFile
                          }
                          type='button'>
                          Reject
                        </Button>
                      )}

                      {canAprroved && !isSendFile && (
                        <Button
                          color='primary'
                          onClick={() => handleApproveWorkLog(work.id)}
                          className='cta cta2 mb-3'
                          disabled={
                            !(work.attachments.length > 0) && needCheckFile
                          }
                          type='button'>
                          Approved
                        </Button>
                      )}

                      {isSendFile && (
                        <Button
                          color='primary'
                          onClick={() => handleApproveWorkLog(work.id)}
                          className='cta cta2 mb-3'
                          type='button'>
                          Mark as Done
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
  workLog: orderDetail.data.workLog,
});

const mapDispatchToProps = {
  approvedWorkLog: approvedWorkLogAction,
  rejectedWorkLog: rejectedWorkLogAction,
  getEmailTemplate: getEmailTemplateAction,
  updateOrderStatus: updateOrderStatusAction,
  uploadCommentWorkLog: uploadCommentWorkLogAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderArtWorkGroup);
