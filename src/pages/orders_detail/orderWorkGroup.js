import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { findIndex } from 'lodash';
import { getSelectedStatus, dateTimeStringFromDate } from 'utils';
import { PERMITTIONS_CONFIG, WORKFLOW_STATE_TYPE, WORKFLOW_TRANSITION_ACTION_TYPE } from 'configs';

import { ReactComponent as Toggle } from 'assets/img/toggle.svg';
import { ReactComponent as Close } from 'assets/img/close.svg';

import Button from 'components/common/button';

import OrderWorkLogItem from './orderWorkLogItem';
import OrderRejectModal from './orderRejectModal';

import { approvedWorkLogAction, rejectedWorkLogAction, getNotifyTemplatesAction, getRemindTemplatesAction, canceledWorkLogAction } from './actions';

const OrderWorkGroup = ({
  uiComponents,
  order,
  group,
  works,
  item,
  status,
  approvedWorkLogAction,
  rejectedWorkLogAction,
  canceledWorkLog,
  getNotifyTemplatesAction,
  getRemindTemplatesAction,
  accountInfo,
  isNewOrder,
  workLog,
  lastWorkLog,
  hasPoster,
  isCurrentArtist,
}) => {
  const canNotifyCustomer = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.NOTIFY_BOOKING_TO_CUSTOMER) || false;
  const canAprroved = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.APPROVE_WORK_LOG) || false;
  const canRejected = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.REJECT_WORK_LOG) || false;
  const canCanceled = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.CANCELED_STEP_BOOKING) || false;
  const canChangeStatus = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.UPDATE_STATUS_BOOKING) || false;

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const lastWork = works[works.length - 1];

  const handleApproveWorkLog = (logId, artistId) => {
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
                  approvedWorkLogAction({ id: order.id, itemId: item.id, logId, artistId });
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

  // TODO: check again for logic to get Email templates

  const handleNotifyEmail = (workLogIndex) => {
    const currentStatus = getSelectedStatus(order.status, status);
    if (currentStatus.emailTemplates && currentStatus.emailTemplates.length) {
      getNotifyTemplatesAction(order.id, currentStatus.emailTemplates[0].id, workLogIndex, undefined, lastWork?.artist?.id);
    } else {
      toast.warn('No Email template found!');
    }
  };

  const handleRemindEmail = (workLogIndex) => {
    getRemindTemplatesAction(order.id, workLogIndex, undefined, lastWork?.artist?.id);
  };

  const handleConfirmRejectWorkLog = (LogId, workLogIndex, artistId) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <OrderRejectModal
            onClose={onClose}
            orderNumber={order.number}
            onConfirm={(data) => {
              if (data.content) {
                rejectedWorkLogAction({ id: order.id, itemId: item.id, logId: LogId, index: workLogIndex, payload: data, artistId, onSuccess: onClose });
              } else {
                toast.warn('Please input reject reason!');
              }
            }}
          />
        );
      },
    });
  };

  const handleConfirmCancelWorkLog = (LogId, workLogIndex, artistId) => {
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
              <p>Are you sure you want to cancel this step?</p>
            </div>
            <div className='comfirm_cus__footer text-right'>
              <button className='comfirm_cus__cancel comfirm_cus__control' onClick={onClose}>
                Cancel
              </button>
              <button
                className='comfirm_cus__delete comfirm_cus__control'
                onClick={() => {
                  canceledWorkLog(order.id, LogId, workLogIndex, undefined, artistId);
                  onClose();
                }}>
                Delete
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div className='order_detail__work_group group'>
      <div className={`group__header ${group || ''}`}>
        <div className='group__title' onClick={toggle}>
          <div className='state dot'>{group}</div>
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
            const component = uiComponents?.find((i) => i.name === work.component) || {};
            const { canNotify, canRemind, canVerifyFile } = component;
            const showActionState = lastWorkLog.id === work.id && isCurrentArtist;
            const nextTransitions = work.nextTransitions;

            const isNewStatus = work.wlStateType === WORKFLOW_STATE_TYPE.START;
            const isDoneStatus = work.wlStateType === WORKFLOW_STATE_TYPE.DONE;

            const isCanRevert = (work.attachments.length === 0 && work.comments.length === 0 && work.activities.length === 0) || false;

            const workLogIndex = findIndex(workLog[work?.artist?.id] || [], (log) => log.id === work.id);

            if (isDoneStatus) {
              return null;
            }
            if (isNewStatus) {
              if (isCurrentArtist && isNewOrder) {
                return (
                  <div key={`order_detail__work__${work.id}`} className='order_detail__work'>
                    {canChangeStatus && (
                      <div className='order_detail__ctas text-center justify-content-center'>
                        <Button onClick={() => handleApproveWorkLog(work.id, work?.artist?.id)} color='primary' className='cta' type='button'>
                          Start Working
                        </Button>
                      </div>
                    )}
                  </div>
                );
              } else return null;
            }

            return (
              <div key={`order_detail__work__${work.id}`} className='order_detail__work'>
                <OrderWorkLogItem work={work} isOpened={showActionState} order={order} component={component} />
                {showActionState && (
                  <div className='order_detail__ctas ctas d-flex flex-wrap justify-content-between'>
                    <div className='ctas__group'>
                      {canNotifyCustomer && canNotify && (
                        <Button color='primary' onClick={() => handleNotifyEmail(workLogIndex)} containerClassName='ctas__item' className='ctas__button mb-3 ctas__notify' type='button'>
                          Notify Customer
                        </Button>
                      )}
                      {canNotifyCustomer && canRemind && (
                        <Button color='primary' onClick={() => handleRemindEmail(workLogIndex)} containerClassName='ctas__item' className='ctas__button mb-3 ctas__remind' type='button'>
                          Remind Customer
                        </Button>
                      )}
                    </div>
                    <div className='ctas__group'>
                      {nextTransitions.map((transition, tIndex) => (
                        <Fragment key={`transition_${tIndex}`}>
                          {canRejected && transition.actions?.[0]?.type === WORKFLOW_TRANSITION_ACTION_TYPE.REJECT.name && (
                            <Button
                              color='secondary'
                              containerClassName='ctas__item'
                              onClick={() => handleConfirmRejectWorkLog(work.id, workLogIndex, work?.artist?.id)}
                              className='ctas__button mb-3'
                              disabled={!(work.attachments.length > 0) && canVerifyFile}
                              type='button'>
                              Reject
                            </Button>
                          )}
                          {canAprroved && transition.actions?.[0]?.type === WORKFLOW_TRANSITION_ACTION_TYPE.APPROVE.name && (
                            <Button
                              color='primary'
                              onClick={() => handleApproveWorkLog(work.id, work?.artist?.id)}
                              containerClassName='ctas__item'
                              className='ctas__button mb-3'
                              disabled={!(work.attachments.length > 0) && canVerifyFile}
                              type='button'>
                              {transition.nextState?.type === WORKFLOW_STATE_TYPE.DONE ? 'Mark as Done' : 'Approved'}
                            </Button>
                          )}
                          {canCanceled && transition.actions?.[0]?.type === WORKFLOW_TRANSITION_ACTION_TYPE.CANCEL.name && (
                            <Button
                              color='secondary'
                              onClick={() => handleConfirmCancelWorkLog(work.id, workLogIndex, work?.artist?.id)}
                              containerClassName='ctas__item'
                              className='ctas__button ctas__canceled mb-3'
                              disabled={!isCanRevert}
                              type='button'>
                              Cancel
                            </Button>
                          )}
                        </Fragment>
                      ))}
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

const mapStateToProps = ({ auth, orderDetail, uiComponents }) => ({
  accountInfo: auth.data.accountInfo,
  workLog: orderDetail.data.workLog,
  uiComponents: uiComponents.data.components,
});

const mapDispatchToProps = {
  approvedWorkLogAction,
  rejectedWorkLogAction,
  getNotifyTemplatesAction,
  getRemindTemplatesAction,
  canceledWorkLog: canceledWorkLogAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderWorkGroup);
