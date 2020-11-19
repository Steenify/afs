import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Button from 'components/common/button';
import ListProduct from 'components/layout/ListProduct';
import Dropbox from 'components/common/dropbox';
import OrderBudget from './orderBudget';
import OrderAssignedBox from './orderAssignedBox';
import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

import { updateShowAssignedBoxAction, ASSIGNED_MODAL_KEYs } from './actions';

const AssignedBoxModal = ({ order, isOpen, updateShowAssignedBoxAction }) => {
  const toggle = () => updateShowAssignedBoxAction(false);
  return (
    <Modal isOpen={isOpen} toggle={toggle} fade={false} size='lg' className='modal-dialog-centered  modal-no-border order_detail__assignedModal'>
      <div className='assignedModal'>
        <ModalHeader toggle={toggle}>
          Change Artist
          <button type='button' className='modal-close' onClick={toggle}>
            <CloseIcon width='25px' height='25px' />
          </button>
        </ModalHeader>
        <ModalBody>
          <OrderAssignedBox order={order} />
          <OrderBudget order={order} />
          <div className='assignedModal__note mb-3'>{/* <textarea className='form-control' placeholder='Product Note' onChange={this.handleChangeNote} value={note} rows='3'></textarea> */}</div>

          <div className={`assignedModal__content`}>{/* <ListProduct selected={selected} onSelect={this.handleSelect} /> */}</div>
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
          <Button color='primary' onClick={() => {}}>
            Save
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};
const mapStateToProps = ({ orderDetail }) => ({
  isOpen: orderDetail.ui.assignedBox.currentShow === ASSIGNED_MODAL_KEYs.CHANGE_ARTIST,
});

const mapDispatchToProps = {
  updateShowAssignedBoxAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignedBoxModal);
