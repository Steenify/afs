import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Collapse } from 'reactstrap';
import { findIndex, isEmpty } from 'lodash';
import { confirmAlert } from 'react-confirm-alert';
// import { Picker, Emoji } from 'emoji-mart';

import Dropbox from 'components/common/dropbox';
import ImageGallery from 'components/common/imageGallery';
import Button from 'components/common/button';
import ImageFile from 'components/common/imageFile';
import P from 'components/common/parapraph';

// import { ReactComponent as EmojiIcon } from 'assets/img/emoji.svg';
import { ReactComponent as Send } from 'assets/img/send.svg';
import { ReactComponent as UploadPhoto } from 'assets/img/loadPhoto.svg';
import { ReactComponent as Close } from 'assets/img/close.svg';
import { ReactComponent as PencilLine } from 'assets/img/pencil_line.svg';
import { ReactComponent as Message } from 'assets/img/message.svg';

import { getListImageUrl, dateTimeFromNow, dateTimeToDeadline } from 'utils';

import {
  uploadFileWorkLogAction,
  uploadCommentWorkLogAction,
  deleteCommentWorkLogAction,
  updateCommentWorkLogAction,
} from './actions';

const OrderWorkLogItem = ({
  work,
  order,
  uploadFileWorkLog,
  isOpened,
  workLog,
  uploadCommentWorkLog,
  deleteCommentWorkLog,
  updateCommentWorkLog,
}) => {
  const [isOpenWork, setIsOpenWork] = useState(isOpened || false);
  const toggleWork = () => setIsOpenWork(!isOpenWork);

  const [isOpenCom, setIsOpenCom] = useState(isOpened || false);
  const toggleCom = () => setIsOpenCom(!isOpenCom);

  // const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  // const toggleEmoji = () => setIsOpenEmoji(!isOpenEmoji);

  // const [isOpenEdit, setIsOpenEdit] = useState(false);
  // const toggleEdit = () => setIsOpenEdit(!isOpenEdit);

  const [isEdit, setIsEdit] = useState(false);
  const dropbox = useRef(null);
  const [comment, setCommemt] = useState('');
  const [file, setFile] = useState(null);

  const [editComment, setEditComment] = useState({});
  const [editCommentIndex, setEditCommentIndex] = useState(0);

  const isWorking = work.state === 'WORKING';
  const isReview = work.state === 'REVIEWING';
  const isRejected = work.state === 'REJECTED';
  const isAproved = work.state === 'APPROVED';
  const isExported = order.status === 'EXPORT_FILE';
  const workLogIndex = findIndex(workLog, (log) => log.id === work.id);

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
        attachments: files.map((file) => ({ id: file.id })),
      };

      uploadFileWorkLog(order.id, work.id, data, workLogIndex, files, () => {
        dropbox.current.clearFiles();
        setIsEdit(false);
      });
    }
  };

  const handleUploadComment = (e) => {
    e.preventDefault();
    if (!comment) {
      toast.warn('Please Comment!');
      return;
    }
    const data = new FormData();
    const isEdit = !isEmpty(editComment);

    data.append('content', comment);
    if (file) {
      data.append('file', file);
    }

    if (isEdit) {
      updateCommentWorkLog(
        order.id,
        work.id,
        editComment.id,
        data,
        workLogIndex,
        editCommentIndex,
        () => {
          setFile(null);
          setCommemt('');
          setEditComment({});
          setEditCommentIndex(0);
        },
      );
    } else {
      uploadCommentWorkLog(order.id, work.id, data, workLogIndex, () => {
        setFile(null);
        setCommemt('');
      });
    }
  };

  const handleDeleteComment = (comId, comIndex) => {
    deleteCommentWorkLog(order.id, work.id, comId, workLogIndex, comIndex);
  };

  const handleCheckEdit = (com, index) => {
    setEditComment(com);
    setCommemt(com.content);
    setEditCommentIndex(index);
  };

  const hanleChangeComment = (e) => {
    const { value } = e.target;
    setCommemt(value);
  };

  const handleSelectFile = (e) => {
    const { files } = e.target;
    setFile(files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
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
              <button
                type='button'
                onClick={onClose}
                className='comfirm_cus__close'>
                <div className='icon'>
                  <Close />
                </div>
              </button>
            </div>
            <div className='comfirm_cus__body'>
              <p>Are you sure you want to delete this comment?</p>
            </div>
            <div className='comfirm_cus__footer text-right'>
              <button
                className='comfirm_cus__cancel comfirm_cus__control'
                onClick={onClose}>
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

  return (
    <div className='order_detail__artwork'>
      <div className='box__header'>
        <div onClick={toggleWork} className='box__icon'>
          <div className='icon'>
            <PencilLine />
          </div>
        </div>

        <div onClick={toggleWork} className='box__title w-100'>
          {work.name}{' '}
          <span className='work__last_update'>
            {dateTimeToDeadline(work.lastModifiedDate)}
          </span>
        </div>
        {isWorking && (
          <div className='control'>
            {isEdit ? (
              <button
                type='button'
                onClick={handleCancel}
                className='box__control'>
                Cancel
              </button>
            ) : (
              <button
                type='button'
                onClick={handleEdit}
                className='box__control'>
                Edit
              </button>
            )}
          </div>
        )}
      </div>

      <Collapse isOpen={isOpenWork}>
        {(!work.attachments.length || isEdit) && (
          <div>
            {!isReview && !isRejected && !isAproved && (
              <>
                <Dropbox
                  className='upload'
                  ref={dropbox}
                  finalDriveId={isExported ? order.finalDriveId : ''}
                  id={`work_log__${work.status}__${work.id}`}
                />
                {isWorking && (
                  <div className='order_detail__ctas text-right'>
                    <Button
                      onClick={handleUploadSketch}
                      color='primary'
                      className='cta cta2'
                      type='button'>
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
            <ImageGallery
              images={getListImageUrl(work.attachments)}
              alt={work.status}
              caption={work.status}
            />
          </div>
        )}
      </Collapse>

      <div
        className={`order_detail__comments comments ${
          !isWorking && !work.comments.length && !isReview ? 'd-none' : ''
        }`}>
        <div className='box__header'>
          <div onClick={toggleCom} className='box__icon com'>
            <div className='icon'>
              <Message />
            </div>
          </div>
          <div onClick={toggleCom} className='box__title w-100'>
            Comment
          </div>
        </div>
        <Collapse isOpen={isOpenCom}>
          <div className='comments__list'>
            {work.comments.map((com, index) => (
              <div
                key={`comment__item__${work.id}__${com.id}`}
                className='comments__item'>
                <div className='comments__author'>
                  <div className='left'>
                    <div className='avt'>
                      <img
                        src={`https://ui-avatars.com/api/?name=${com.createdBy}`}
                        alt='comments__author'
                      />
                    </div>
                  </div>
                  <div className='comments__wrapper'>
                    <div className='comments__box'>
                      <span className='name'>{com.createdBy}</span>
                      <span className='comments__mess'>
                        <P
                          text={com.content}
                          id={`comment__item__${work.id}__${com.id}`}
                        />
                      </span>
                    </div>
                    {com.fileUrl && (
                      <div className='comments__img'>
                        <ImageGallery
                          images={[com.fileUrl]}
                          alt={'comment'}
                          caption={'comment'}
                        />
                      </div>
                    )}

                    <div className='comments__controls'>
                      <button
                        onClick={() => handleCheckEdit(com, index)}
                        type='button'
                        className='comments__control'>
                        Edit
                      </button>
                      <span className='dot'> · </span>
                      <button
                        type='button'
                        onClick={() =>
                          handleConfirmDeleteComment(com.id, index)
                        }
                        className='comments__control '>
                        Delete
                      </button>

                      <span className='dot'> · </span>
                      <span className='date'>
                        {dateTimeFromNow(com.createdDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {(isWorking || isReview) && (
            <div>
              {file && (
                <div className='comments__file'>
                  <ImageFile className='file' file={file} />
                  <button
                    type='button'
                    onClick={handleRemoveFile}
                    className='delete'>
                    <div className='icon'>
                      <Close />
                    </div>
                  </button>
                </div>
              )}

              <div className='comments__actions'>
                <form action='' onSubmit={handleUploadComment}>
                  <input
                    placeholder='Enter comment here..'
                    type='text'
                    value={comment}
                    onChange={hanleChangeComment}
                    className='form-control comments__input'
                  />

                  <label
                    htmlFor={`file-upload__comment__${work.id}`}
                    className='comments__action comments__upload'>
                    <span className='icon'>
                      <UploadPhoto />
                    </span>
                  </label>
                  <button
                    type='button'
                    onClick={handleUploadComment}
                    className='comments__action comments__sent'>
                    <span className='icon'>
                      <Send />
                    </span>
                  </button>

                  <input
                    type='file'
                    id={`file-upload__comment__${work.id}`}
                    className='sr-only'
                    accept={'image/*'}
                    onChange={handleSelectFile}
                  />
                </form>
              </div>
            </div>
          )}
        </Collapse>
      </div>
    </div>
  );
};

const mapStateToProps = ({ orderDetail }) => ({
  loading: orderDetail.ui.loadingWorkLog,
  workLog: orderDetail.data.workLog,
});

const mapDispatchToProps = {
  uploadFileWorkLog: uploadFileWorkLogAction,
  uploadCommentWorkLog: uploadCommentWorkLogAction,
  deleteCommentWorkLog: deleteCommentWorkLogAction,
  updateCommentWorkLog: updateCommentWorkLogAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderWorkLogItem);
