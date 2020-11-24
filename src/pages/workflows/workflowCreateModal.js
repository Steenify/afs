import React, { useState } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { useHistory } from 'react-router-dom';

import { Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import Input from 'components/common/input';
import Button from 'components/common/button';

import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

import { createWorkflowAction } from './actions';
import { PERMITTIONS_CONFIG } from 'configs';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

const WorkflowCreateModal = (props) => {
  const history = useHistory();
  const { accountInfo, handleSubmit, initialize, submitting, containerClassName, className, createWorkflowAction } = props;
  const [modal, setModal] = useState(false);

  const canCreate = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.CREATE_FLOW);

  const onSubmit = async (values) => {
    await createWorkflowAction(values, (data) => {
      const { flowId } = data;
      if (flowId) {
        history.push(`/workflows/${flowId}`);
      }
    });
  };

  const toggle = () => {
    setModal(!modal);
    initialize({ name: '', description: '' });
  };

  return (
    <div className={containerClassName}>
      {canCreate && (
        <Button color='primary' onClick={toggle} className='btn-create'>
          + Create new workflow
        </Button>
      )}

      {modal && (
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader toggle={toggle}>
              Create new workflow
              <button type='button' className='modal-close' onClick={toggle}>
                <CloseIcon />
              </button>
            </ModalHeader>
            <ModalBody>
              <Field className='...' component={Input} name='name' label='Name' />
              <Field className='...' component={Input} name='description' label='Description' />
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
    initialValues: {
      name: '',
      description: '',
    },
  };
};

export default connect(mapStateToProps, { createWorkflowAction })(
  reduxForm({
    form: 'workflowCreateModal',
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: false,
  })(WorkflowCreateModal),
);
