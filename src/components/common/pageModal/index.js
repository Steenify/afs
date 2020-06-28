import React from 'react';
import { Modal } from 'reactstrap';
import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

import './styles.scss';

const PageModal = ({
  isOpen,
  className,
  toggle,
  title,
  children,
  ...props
}) => {
  return (
    <Modal
      {...props}
      isOpen={isOpen}
      toggle={toggle}
      centered
      fade={false}
      className={`page_modal ${className}`}>
      <div className='page_modal__header'>
        <div className='page_modal__title'>{title}</div>
        <button type='button' className='page_modal__close' onClick={toggle}>
          <span className='icon'>
            <CloseIcon />
          </span>
        </button>
      </div>
      <div className='page_modal__body'>{children}</div>
    </Modal>
  );
};

export default PageModal;
