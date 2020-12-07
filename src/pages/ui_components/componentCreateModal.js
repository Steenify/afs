import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import Input from 'components/common/input';
import Button from 'components/common/button';

import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

import { createComponentAction } from './actions';
import { PERMITTIONS_CONFIG } from 'configs';

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

const ComponentCreateModal = (props) => {
  const { accountInfo, handleSubmit, initialize, submitting, containerClassName, className, createComponentAction } = props;
  const [modal, setModal] = useState(false);

  const canCreate = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.CREATE_COMPONENT);

  const onSubmit = async (values) => {
    await createComponentAction(values, toggle);
  };

  const toggle = () => {
    setModal(!modal);
    initialize(initialValues);
  };

  return (
    <div className={containerClassName}>
      {canCreate && (
        <Button color='primary' onClick={toggle} className='btn-create'>
          + Create new Component
        </Button>
      )}

      {modal && (
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader toggle={toggle}>
              Create new component
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
                Create
              </Button>{' '}
              <Button color='secondary' onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      )}
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    accountInfo: auth.data.accountInfo,
    initialValues,
  };
};

export default connect(mapStateToProps, { createComponentAction })(
  reduxForm({
    form: 'ComponentCreateModal',
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: false,
  })(ComponentCreateModal),
);
