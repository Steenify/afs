import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';

import Dropbox from 'components/common/dropbox';

import { ReactComponent as Close } from 'assets/img/close.svg';

const OrderRejectModal = ({ onClose, onConfirm, orderNumber }) => {
  const [value, setValue] = useState('');
  const dropbox = useRef(null);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSave = (e) => {
    e.preventDefault();

    if (dropbox.current) {
      const files = dropbox.current.getFiles();

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
        content: value,
        attachments: files.map((file) => ({
          id: file.id,
          thumbnailLink: file?.thumbnailLink,
          url: file?.url,
          external: file?.external,
        })),
      };

      onConfirm(data);
    }
  };

  return (
    <form action='' onSubmit={onSave}>
      <div className='comfirm_cus'>
        <div className='comfirm_cus__header'>
          <div className='comfirm_cus__titl'>Reject</div>
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
          <p>Are you sure you want to reject this work?</p>
          <p>
            <textarea
              type='text'
              className='form-control'
              value={value}
              onChange={onChange}
              rows='4'
              placeholder='Reject Reason'
            />
          </p>

          <p>
            <Dropbox
              className='upload'
              ref={dropbox}
              orderNumber={orderNumber}
              id={`Reject__modal__upload`}
            />
          </p>
        </div>
        <div className='comfirm_cus__footer text-right'>
          <button
            className='comfirm_cus__cancel comfirm_cus__control'
            onClick={onClose}>
            Cancel
          </button>
          <button
            className='comfirm_cus__accept comfirm_cus__control'
            onClick={onSave}>
            Reject
          </button>
        </div>
      </div>
    </form>
  );
};

export default OrderRejectModal;
