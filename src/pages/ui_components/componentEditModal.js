import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import Input from 'components/common/input';
import Button from 'components/common/button';

import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

import { updateComponentAction, deleteComponentAction } from './actions';
import { PERMITTIONS_CONFIG } from 'configs';
import { toast } from 'react-toastify';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

const initialValues = {
  name: '',
  canUpload: false,
  canVerifyFile: false,
  canExportFile: false,
  canNotify: false,
  canRemind: false,
  canTracking: false,
};

const ComponentEditModal = (props) => {
  const { item, accountInfo, handleSubmit, submitting, containerClassName, className, updateComponentAction, deleteComponentAction } = props;
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const canUpdate = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.UPDATE_COMPONENT);
  const canDelete = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.DELETE_COMPONENT);

  const onSubmit = async (values) => {
    await updateComponentAction(item.id, values, () => {
      toggle();
      toast.dark('Component updated!');
    });
  };

  const toggle = () => {
    setModal(!modal);
  };

  const toggleDelete = () => {
    setDeleteModal(!deleteModal);
  };

  const onConfirmDelete = () => {
    deleteComponentAction(item.id, () => {
      toggleDelete();
      toast.dark('Component deleted!');
    });
  };

  return (
    <div className={containerClassName}>
      <div className='d-flex'>
        {canUpdate && (
          <Button color='primary' onClick={toggle} className='mr-2'>
            Edit
          </Button>
        )}
        {canDelete && (
          <Button color='danger' onClick={toggleDelete}>
            Remove
          </Button>
        )}
      </div>

      {modal && (
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader toggle={toggle}>
              Update component
              <button type='button' className='modal-close' onClick={toggle}>
                <CloseIcon />
              </button>
            </ModalHeader>
            <ModalBody>
              <Field className='...' component={Input} name='name' label='Name' />
              <div className='d-flex align-items-center mb-3'>
                <span className=''>Can upload</span>
                <label className='cus-checkbox ml-3'>
                  <Field className='form-control sr-only' component={'input'} type='checkbox' name='canUpload' />
                  <span className='checkmark'></span>
                </label>
              </div>
              <div className='d-flex align-items-center mb-3'>
                <span className=''>Can verify file</span>
                <label className='cus-checkbox ml-3'>
                  <Field className='form-control sr-only' component={'input'} type='checkbox' name='canVerifyFile' />
                  <span className='checkmark'></span>
                </label>
              </div>
              <div className='d-flex align-items-center mb-3'>
                <span className=''>Can export file</span>
                <label className='cus-checkbox ml-3'>
                  <Field className='form-control sr-only' component={'input'} type='checkbox' name='canExportFile' />
                  <span className='checkmark'></span>
                </label>
              </div>
              <div className='d-flex align-items-center mb-3'>
                <span className=''>Can notify</span>
                <label className='cus-checkbox ml-3'>
                  <Field className='form-control sr-only' component={'input'} type='checkbox' name='canNotify' />
                  <span className='checkmark'></span>
                </label>
              </div>
              <div className='d-flex align-items-center mb-3'>
                <span className=''>Can remind</span>
                <label className='cus-checkbox ml-3'>
                  <Field className='form-control sr-only' component={'input'} type='checkbox' name='canRemind' />
                  <span className='checkmark'></span>
                </label>
              </div>
              <div className='d-flex align-items-center mb-3'>
                <span className=''>Can tracking</span>
                <label className='cus-checkbox ml-3'>
                  <Field className='form-control sr-only' component={'input'} type='checkbox' name='canTracking' />
                  <span className='checkmark'></span>
                </label>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' type='submit' disabled={submitting}>
                Update
              </Button>{' '}
              <Button color='secondary' onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      )}
      {deleteModal && (
        <Modal isOpen={deleteModal} toggle={toggleDelete} className={className}>
          <ModalHeader toggle={toggleDelete}>
            Confirm delete component?
            <button type='button' className='modal-close' onClick={toggleDelete}>
              <CloseIcon />
            </button>
          </ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={onConfirmDelete}>
              Confirm
            </Button>{' '}
            <Button color='secondary' onClick={toggleDelete}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

const mapStateToProps = ({ auth }, ownProps) => {
  const values = { ...initialValues, ...ownProps.item };
  return {
    accountInfo: auth.data.accountInfo,
    initialValues: values,
  };
};

export default connect(mapStateToProps, { updateComponentAction, deleteComponentAction })(
  reduxForm({
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: true,
  })(ComponentEditModal),
);
