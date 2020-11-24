import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Modal, ModalHeader, ModalFooter } from 'reactstrap';
import Button from 'components/common/button';

import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

import { deleteWorkflowAction } from './actions';

const WorkflowDeleteModal = (props) => {
  const history = useHistory();
  const { id, containerClassName, className, deleteWorkflowAction } = props;
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const onDelete = () => {
    deleteWorkflowAction(id, () => {
      history.goBack();
    });
  };

  return (
    <div className={containerClassName}>
      <Button color='danger' onClick={toggle}>
        Delete Flow
      </Button>
      {modal && (
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>
            Confirm to delete flow
            <button type='button' className='modal-close' onClick={toggle}>
              <CloseIcon />
            </button>
          </ModalHeader>
          <ModalFooter>
            <Button color='danger' onClick={onDelete}>
              Delete
            </Button>{' '}
            <Button color='secondary' onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

const mapStateToProps = () => {};

export default connect(mapStateToProps, { deleteWorkflowAction })(WorkflowDeleteModal);
