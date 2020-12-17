import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Collapse } from 'reactstrap';
import { findIndex, isEmpty, groupBy } from 'lodash';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';

import Dropbox from 'components/common/dropbox';
import ImageGallery from 'components/common/imageGallery';
import Button from 'components/common/button';
import P from 'components/common/parapraph';
import CommentBox from 'components/common/commentBox';

import TrackingInfoForm from './workingTrackingInfos';
import TrackingInfo from './trackingInfos';

import { ReactComponent as Close } from 'assets/img/close.svg';
import { ReactComponent as PencilLine } from 'assets/img/pencil_line.svg';
import { ReactComponent as Message } from 'assets/img/message.svg';
import { ReactComponent as Feedback } from 'assets/img/message__yellow.svg';

import { getListImageUrl, dateTimeFromNow, dateTimeToDeadline } from 'utils';
import { PERMITTIONS_CONFIG } from 'configs';

import { uploadFileWorkLogAction, uploadCommentWorkLogAction, deleteCommentWorkLogAction, updateCommentWorkLogAction, deleteAttachmentWorkLogAction } from './actions';
import CanShow from 'components/layout/canshow';

const OrderWorkLogItem = ({ work, order, component, isOpened, uploadFileWorkLog, workLog, uploadCommentWorkLog, deleteCommentWorkLog, updateCommentWorkLog, deleteAttachmentWorkLog }) => {
  const { canTracking, canUpload, canExportFile } = component;

  const [isOpenWork, setIsOpenWork] = useState(isOpened || false);
  const toggleWork = () => setIsOpenWork(!isOpenWork);

  const [isOpenCom, setIsOpenCom] = useState(isOpened || false);
  const toggleCom = () => setIsOpenCom(!isOpenCom);

  const [isOpenFeedback, setIsOpenFeedback] = useState(isOpened || false);
  const toggleFeedback = () => setIsOpenFeedback(!isOpenFeedback);

  const [isEdit, setIsEdit] = useState(false);
  const dropbox = useRef(null);
  const commentBox = useRef(null);

  const [editComment, setEditComment] = useState({});
  const [editCommentIndex, setEditCommentIndex] = useState(0);

  const isWorking = work.state === 'WORKING';
  const isReview = work.state === 'REVIEWING';
  const isRejected = work.state === 'REJECTED';
  const isAproved = work.state === 'APPROVED';
  const workLogIndex = findIndex(workLog[work?.artist?.id] || [], (log) => log.id === work.id);

  const activities = work?.activities || [];
  const activitiesGroup = groupBy(activities, 'activityType');

  const Act_UPLOADED = activitiesGroup?.UPLOADED || [];
  const Act_APPROVED = activitiesGroup?.APPROVED || [];
  const Act_REJECTED = activitiesGroup?.REJECTED || [];
  const Act_NOTIFIED_CUSTOMER = activitiesGroup?.NOTIFIED_CUSTOMER || [];
  const Act_REMINDER_CUSTOMER = activitiesGroup?.REMINDER_CUSTOMER || [];

  const handleUploadSketch = () => {
    if (dropbox.current) {
      const files = dropbox.current.getFiles();
      if (!files.length) {
        toast.warn('Please select your work!');
        return;
      }

      let isDoneUpload = true;

      files.forEach((file) => {
        if (!file.isUploaded || !file.id) {
          isDoneUpload = false;
        }
      });

      if (!isDoneUpload) {
        toast.warn('Files is uploading!');
        return;
      }

      const data = {
        attachments: files.map((file) => ({
          id: file.id,

          thumbnailLink: file?.thumbnailLink,
          url: file?.url,
          external: file?.external,
        })),
      };

      uploadFileWorkLog(
        order.id,
        work.id,
        data,
        workLogIndex,
        files,
        () => {
          dropbox.current.clearFiles();
          setIsEdit(false);
        },
        work?.artist?.id,
      );
    }
  };

  const handleUploadComment = (text, files) => {
    if (commentBox.current) {
      if (!text) {
        toast.warn('Please Comment!');
        return;
      }

      let isDoneUpload = true;
      files.forEach((file) => {
        if (!file.isUploaded || !file.id) {
          isDoneUpload = false;
        }
      });
      if (!isDoneUpload) {
        toast.warn('Files is uploading!');
        return;
      }

      const isEdit = !isEmpty(editComment);

      const data = {
        content: text,
        attachments: files.map((file) => ({
          id: file.id,
          thumbnailLink: file?.thumbnailLink,
          url: file?.url,
          external: file?.external,
        })),
      };

      if (isEdit) {
        updateCommentWorkLog(
          order.id,
          work.id,
          editComment.id,
          data,
          workLogIndex,
          editCommentIndex,
          () => {
            commentBox.current.clearFiles();
            commentBox.current.setCommemt('');
            setEditComment({});
            setEditCommentIndex(0);
          },
          work?.artist?.id,
        );
      } else {
        uploadCommentWorkLog(
          order.id,
          work.id,
          data,
          workLogIndex,
          () => {
            commentBox.current.clearFiles();
            commentBox.current.setCommemt('');
          },
          work?.artist?.id,
        );
      }
    }
  };

  const handleDeleteComment = (comId, comIndex) => {
    deleteCommentWorkLog(order.id, work.id, comId, workLogIndex, comIndex, work?.artist?.id);
  };

  const handleCheckEdit = (com, index) => {
    if (commentBox.current) {
      setEditComment(com);
      commentBox.current.setCommemt(com.content);
      setEditCommentIndex(index);
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleConfirmDeleteComment = (comId, comIndex) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='comfirm_cus'>
            <div className='comfirm_cus__header'>
              <div className='comfirm_cus__titl'>Delete</div>
              <button type='button' onClick={onClose} className='comfirm_cus__close'>
                <div className='icon'>
                  <Close />
                </div>
              </button>
            </div>
            <div className='comfirm_cus__body'>
              <p>Are you sure you want to delete this comment?</p>
            </div>
            <div className='comfirm_cus__footer text-right'>
              <button className='comfirm_cus__cancel comfirm_cus__control' onClick={onClose}>
                Cancel
              </button>
              <button
                className='comfirm_cus__accept comfirm_cus__control'
                onClick={() => {
                  handleDeleteComment(comId, comIndex);
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

  const handleDeleteFile = (file) => {
    const fileIndex = findIndex(work.attachments, (pho) => pho?.id === file?.source?.id);
    deleteAttachmentWorkLog(order.id, work.id, file?.source?.id, workLogIndex, fileIndex, () => toast.dark('File deleteted!'), work?.artist?.id);
  };

  return (
    <div className='order_detail__artwork'>
      <div className='box__header'>
        <div onClick={toggleWork} className='box__icon'>
          <div className='icon'>
            <PencilLine />
          </div>
        </div>

        <div onClick={toggleWork} className='box__title w-100'>
          {work.name} <span className='work__last_update'>{dateTimeToDeadline(work.lastModifiedDate)}</span>
        </div>
        {isWorking && canUpload && (
          <div className='control'>
            {isEdit ? (
              <button type='button' onClick={handleCancel} className='box__control'>
                Cancel
              </button>
            ) : (
              <button type='button' onClick={handleEdit} className='box__control'>
                Edit
              </button>
            )}
          </div>
        )}
      </div>

      <Collapse isOpen={isOpenWork}>
        {canTracking && <div className='order_detail__tracking_code'>{isWorking ? <TrackingInfoForm /> : <TrackingInfo />}</div>}

        {(!work.attachments?.length || isEdit) && canUpload && (
          <div>
            {!isRejected && !isAproved && (
              <>
                <Dropbox className='upload' ref={dropbox} finalDriveId={canExportFile ? order.finalDriveId : ''} orderNumber={order.number} id={`work_log__${work.status}__${work.id}`} />
                {isWorking && (
                  <div className='order_detail__ctas text-right'>
                    <Button onClick={handleUploadSketch} color='primary' className='cta cta2' type='button'>
                      Submit
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {work.attachments?.length > 0 && (
          <div className='photos'>
            <ImageGallery images={getListImageUrl(work.attachments)} alt={work.status} caption={work.status} canDelete={isEdit} onDelete={handleDeleteFile} />
          </div>
        )}

        <div className={`order_detail__activites activites ${!Act_UPLOADED.length && 'd-none'}`}>
          <div className='activites__list'>
            {Act_UPLOADED.map((act, index) => (
              <div className='activites__item UPLOADED' key={`order__worklog__${work.id}__act_UPLOADED_by_${act.actor}__${index.toString()}`}>
                <div className='content'>
                  <strong>{act.actor} upload</strong>
                  <span> {dateTimeFromNow(act.lastActionDate)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CanShow permission={PERMITTIONS_CONFIG.VIEW_CUSTOMER_FEEDBACK}>
          <div className={`order_detail__comments comments ${!work.feedbacks?.length ? 'd-none' : ''}`}>
            <div className='box__header comments__header'>
              <div onClick={toggleFeedback} className='box__icon feedback comments__icon'>
                <div className='icon'>
                  <Feedback />
                </div>
              </div>
              <div onClick={toggleFeedback} className='box__title w-100 comments__title'>
                Feedback from customer
              </div>
            </div>
            <Collapse isOpen={isOpenFeedback}>
              <div className='comments__list'>
                {work.feedbacks
                  ?.sort((a, b) => (moment(a.createdDate).isBefore(moment(b.createdDate)) ? -1 : 1))
                  .map((feedback) => (
                    <div key={`feedback__item__${work.id}__${feedback.id}`} className='comments__item'>
                      <div className='comments__author'>
                        <div className='comments__wrapper'>
                          <div className='comments__box'>
                            <span className='comments__mess'>
                              <P text={feedback.body} id={`feedback__item__${work.id}__${feedback.id}`} />
                            </span>
                          </div>
                          <div className='d-flex justify-content-end'>
                            <span className='work__last_update' style={{ fontStyle: 'normal' }}>
                              {dateTimeFromNow(feedback.createdDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Collapse>
          </div>
        </CanShow>

        <div
          className={`order_detail__comments comments ${!isWorking && !work.comments?.length && !isReview ? 'd-none' : ''} ${
            (isReview || isWorking || work.comments?.length) && work.feedbacks?.length ? 'ignore-top' : ''
          }`}>
          <div className='box__header comments__header'>
            <div onClick={toggleCom} className='box__icon com comments__icon'>
              <div className='icon'>
                <Message />
              </div>
            </div>
            <div onClick={toggleCom} className='box__title w-100 comments__title'>
              Comment
            </div>
          </div>
          <Collapse isOpen={isOpenCom}>
            <div className='comments__list'>
              {work.comments?.map((com, index) => (
                <div key={`comment__item__${work.id}__${com.id}`} className='comments__item'>
                  <div className='comments__author'>
                    <div className='left'>
                      <div className='avt'>
                        <img src={`https://ui-avatars.com/api/?name=${com?.user?.fullName}`} alt='comments__author' />
                      </div>
                    </div>
                    <div className='comments__wrapper'>
                      <div className='comments__box'>
                        <span className='name'>{com?.user?.fullName}</span>
                        <span className='comments__mess'>
                          <P text={com.content} id={`comment__item__${work.id}__${com.id}`} />
                        </span>
                      </div>

                      {com?.attachments && com?.attachments.length > 0 && (
                        <div className='comments__img'>
                          <ImageGallery images={getListImageUrl(com?.attachments || [])} alt={'comment'} caption={'comment'} />
                        </div>
                      )}
                      <div className='comments__controls'>
                        <button onClick={() => handleCheckEdit(com, index)} type='button' className='comments__control'>
                          Edit
                        </button>
                        <span className='dot'> · </span>
                        <button type='button' onClick={() => handleConfirmDeleteComment(com.id, index)} className='comments__control '>
                          Delete
                        </button>

                        <span className='dot'> · </span>
                        <span className='date'>{dateTimeFromNow(com.createdDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {(isWorking || isReview) && (
              <div className='comments__box__wrapper'>
                <CommentBox ref={commentBox} onSubmit={handleUploadComment} />
              </div>
            )}
          </Collapse>
        </div>

        <div className={`order_detail__activites activites ${!Act_NOTIFIED_CUSTOMER.length && !Act_REMINDER_CUSTOMER.length && 'd-none'}`}>
          <div className='activites__list'>
            {Act_NOTIFIED_CUSTOMER.map((act, index) => {
              const { notificationChannel } = act;
              const notiChanelMap = {
                EMAIL: 'via email',
                MESSENGER: 'via fb/ig',
              };

              const viaChanel = notiChanelMap[notificationChannel || 'EMAIL'];

              return (
                <div key={`order__worklog__${work.id}__act_NOTIFIED_CUSTOMER_by_${act.actor}__${index.toString()}`} className='activites__item NOTIFIED_CUSTOMER'>
                  <div className='content'>
                    <strong>
                      [{act.actor}] notified the customer {viaChanel} at
                    </strong>
                    <span> {dateTimeFromNow(act.lastActionDate)}</span>
                  </div>
                </div>
              );
            })}
            {Act_REMINDER_CUSTOMER.map((act, index) => {
              const { notificationChannel } = act;
              const notiChanelMap = {
                EMAIL: 'via email',
                MESSENGER: 'via fb/ig',
              };

              const viaChanel = notiChanelMap[notificationChannel || 'EMAIL'];

              return (
                <div key={`order__worklog__${work.id}__act_REMINDER_CUSTOMERR_by_${act.actor}__${index.toString()}`} className='activites__item NOTIFIED_CUSTOMER'>
                  <div className='content'>
                    <strong>
                      [{act.actor}] reminded the customer {viaChanel} at
                    </strong>
                    <span> {dateTimeFromNow(act.lastActionDate)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={`order_detail__activites activites ${!Act_REJECTED.length && 'd-none'}`}>
          <div className='activites__list'>
            {Act_REJECTED.map((act, index) => (
              <div key={`order__worklog__${work.id}__act_REJECTED_by_${act.actor}__${index.toString()}`} className='activites__item REJECTED'>
                <div className='content'>
                  <strong>{act.actor} rejected</strong>
                  <span> {dateTimeFromNow(act.lastActionDate)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`order_detail__activites activites ${!Act_APPROVED.length && 'd-none'}`}>
          <div className='activites__list'>
            {Act_APPROVED.map((act, index) => (
              <div key={`order__worklog__${work.id}__act_APPROVED_by_${act.actor}__${index.toString()}`} className='activites__item APPROVED'>
                <div className='content'>
                  <strong>{act.actor} approved</strong>
                  <span> {dateTimeFromNow(act.lastActionDate)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

const mapStateToProps = ({ orderDetail }) => ({
  workLog: orderDetail.data.workLog,
});

const mapDispatchToProps = {
  uploadFileWorkLog: uploadFileWorkLogAction,
  uploadCommentWorkLog: uploadCommentWorkLogAction,
  deleteCommentWorkLog: deleteCommentWorkLogAction,
  updateCommentWorkLog: updateCommentWorkLogAction,
  deleteAttachmentWorkLog: deleteAttachmentWorkLogAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderWorkLogItem);
