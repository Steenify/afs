import React, { useState } from 'react';
import { ReactComponent as Close } from 'assets/img/close.svg';

const OrderRejectModal = ({ onClose, onConfirm }) => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSave = (e) => {
    e.preventDefault();
    onConfirm(value);
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
