import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Collapse } from 'reactstrap';
import { findIndex, isEmpty, groupBy } from 'lodash';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
// import { Picker, Emoji } from 'emoji-mart';

import Dropbox from 'components/common/dropbox';
import ImageGallery from 'components/common/imageGallery';
import Button from 'components/common/button';
import P from 'components/common/parapraph';
import CommentBox from 'components/common/commentBox';

// import { ReactComponent as EmojiIcon } from 'assets/img/emoji.svg';

import { ReactComponent as Close } from 'assets/img/close.svg';
import { ReactComponent as PencilLine } from 'assets/img/pencil_line.svg';
import { ReactComponent as Message } from 'assets/img/message.svg';

import { getListImageUrl, dateTimeFromNow, dateTimeToDeadline } from 'utils';
import { mapStatusCanNotUpload } from 'configs';

import { uploadFileWorkLogAction, uploadCommentWorkLogAction, deleteCommentWorkLogAction, updateCommentWorkLogAction, deleteAttachmentWorkLogAction, updateTrackingCodeWorkLogAction } from './actions';

const OrderWorkLogItem = ({
  workLogType,
  work,
  order,
  uploadFileWorkLog,
  isOpened,
  workLog,
  uploadCommentWorkLog,
  deleteCommentWorkLog,
  updateCommentWorkLog,
  deleteAttachmentWorkLog,
  updateTrackingCodeWorkLogAction,
}) => {
  const [isOpenWork, setIsOpenWork] = useState(isOpened || false);
  const toggleWork = () => setIsOpenWork(!isOpenWork);

  const [isOpenCom, setIsOpenCom] = useState(isOpened || false);
  const toggleCom = () => setIsOpenCom(!isOpenCom);

  const [isOpenFeedback, setIsOpenFeedback] = useState(isOpened || false);
  const toggleFeedback = () => setIsOpenFeedback(!isOpenFeedback);

  const [isEdit, setIsEdit] = useState(false);
  const dropbox = useRef(null);
  const commentBox = useRef(null);
  const trackingNoteInput = useRef(null);

  const [editComment, setEditComment] = useState({});
  const [editCommentIndex, setEditCommentIndex] = useState(0);

  const isPrintTrackingStatus = work.status === 'PRINT_TRACKING';

  const isWorking = work.state === 'WORKING';
  const isReview = work.state === 'REVIEWING';
  const isRejected = work.state === 'REJECTED';
  const isAproved = work.state === 'APPROVED';
  const isExported = order.status === 'EXPORT_FILE';
  const workLogIndex = findIndex(workLog, (log) => log.id === work.id);

  const notUpload = mapStatusCanNotUpload.indexOf(order.status) !== -1;

  const activities = work?.activities || [];
  const activitiesGroup = groupBy(activities, 'activityType');

  const Act_UPLOADED = activitiesGroup?.UPLOADED || [];
  const Act_APPROVED = activitiesGroup?.APPROVED || [];
  const Act_REJECTED = activitiesGroup?.REJECTED || [];
  const Act_NOTIFIED_CUSTOMER = activitiesGroup?.NOTIFIED_CUSTOMER || [];

  const handleUpdateTrackingCode = () => {
    const code = trackingNoteInput.current.value;
    updateTrackingCodeWorkLogAction(order.id, code, () => {
      toast.dark('Tracking url is updated.');
    });
  };

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
        workLogType,
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
          workLogType,
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
          workLogType,
        );
      }
    }
  };

  const handleDeleteComment = (comId, comIndex) => {
    deleteCommentWorkLog(order.id, work.id, comId, workLogIndex, comIndex, workLogType);
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
    deleteAttachmentWorkLog(order.id, work.id, file?.source?.id, workLogIndex, fileIndex, () => toast.dark('File deleteted!'), workLogType);
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
        {isWorking && !notUpload && (
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
        {isPrintTrackingStatus && (
          <div className='order_detail__tracking_code'>
            <div className='box__header mb-0'>
              <div className='box__title w-100'>Tracking URL</div>
            </div>
            {isWorking ? (
              <>
                <input ref={trackingNoteInput} defaultValue={order.printfulTrackingUrl} type='text' className='form-control' placeholder='Enter tracking URL' />
                <div className='order_detail__ctas text-right'>
                  <Button onClick={handleUpdateTrackingCode} color='primary' className='cta cta2' type='button'>
                    Update
                  </Button>
                </div>
              </>
            ) : (
              <div className='mb-3'>
                <a target='_blank' rel='noopener noreferrer' href={order.printfulTrackingUrl}>
                  {order.printfulTrackingUrl}
                </a>
              </div>
            )}
          </div>
        )}

        {(!work.attachments.length || isEdit) && !notUpload && !isPrintTrackingStatus && (
          <div>
            {!isRejected && !isAproved && (
              <>
                <Dropbox className='upload' ref={dropbox} finalDriveId={isExported ? order.finalDriveId : ''} orderNumber={order.number} id={`work_log__${work.status}__${work.id}`} />
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

        {work.attachments.length > 0 && (
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

        <div className={`order_detail__comments comments ${!isWorking && !work.feedbacks.length ? 'd-none' : ''} ${work.comments.length && work.feedbacks.length ? 'ignore-top' : ''} `}>
          <div className='box__header comments__header'>
            <div onClick={toggleFeedback} className='box__icon com comments__icon'>
              <div className='icon'>
                <Message />
              </div>
            </div>
            <div onClick={toggleFeedback} className='box__title w-100 comments__title'>
              Feedback from customer
            </div>
          </div>
          <Collapse isOpen={isOpenFeedback}>
            <div className='comments__list'>
              {work.feedbacks
                .sort((a, b) => (moment(a.createdDate).isBefore(moment(b.createdDate)) ? 1 : -1))
                .map((feedback, index) => (
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

        <div className={`order_detail__comments comments ${!isWorking && !work.comments.length && !isReview ? 'd-none' : ''}`}>
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
              {work.comments.map((com, index) => (
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

        <div className={`order_detail__activites activites ${!Act_NOTIFIED_CUSTOMER.length && 'd-none'}`}>
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
                      [{act.actor}] notified customer {viaChanel}
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
            {Act_REJECTED.map((act) => (
              <div key={`order__worklog__${work.id}__act_REJECTED_by_${act.actor}`} className='activites__item REJECTED'>
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
            {Act_APPROVED.map((act) => (
              <div key={`order__worklog__${work.id}__act_APPROVED_by_${act.actor}`} className='activites__item APPROVED'>
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

const mapStateToProps = ({ orderDetail }, ownProps) => ({
  workLog: orderDetail.data[ownProps.workLogType || 'workLog'],
});

const mapDispatchToProps = {
  uploadFileWorkLog: uploadFileWorkLogAction,
  uploadCommentWorkLog: uploadCommentWorkLogAction,
  deleteCommentWorkLog: deleteCommentWorkLogAction,
  updateCommentWorkLog: updateCommentWorkLogAction,
  deleteAttachmentWorkLog: deleteAttachmentWorkLogAction,
  updateTrackingCodeWorkLogAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderWorkLogItem);
