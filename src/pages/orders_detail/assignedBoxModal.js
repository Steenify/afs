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
import { ReactComponent as RightRectangle } from 'assets/img/right_rectangle.svg';

import { updateShowAssignedBoxAction, ASSIGNED_MODAL_KEYs } from './actions';
import { formatMoney } from 'utils';

const AssignedBoxModal = ({ order, isOpen, updateShowAssignedBoxAction }) => {
  const { artistBudgets = [], assignedTo = {}, budget = 0 } = order || {};
  const { CHANGE_ARTIST, CHANGE_BUDGET, BUDGET_HISTORY, INCREASE_BUDGET, DECREASE_BUDGET } = ASSIGNED_MODAL_KEYs;

  const previousArtists = artistBudgets.filter((item) => item?.artist?.id !== assignedTo?.id);
  const toggle = () => updateShowAssignedBoxAction('');
  return (
    <Modal isOpen={isOpen} toggle={toggle} fade={false} size='lg' className='modal-dialog-centered  modal-no-border order_detail__assignedModal'>
      <div className='assignedModal'>
        <ModalHeader toggle={toggle}>
          Edit Assigned
          <button type='button' className='modal-close' onClick={toggle}>
            <CloseIcon width='25px' height='25px' />
          </button>
        </ModalHeader>
        <ModalBody>
          {/* <OrderAssignedBox order={order} />
          <OrderBudget order={order} /> */}
          <div className='assignedModal__assigned mb-3'>
            <button
              className='assignedModal__action'
              onClick={() => {
                updateShowAssignedBoxAction(CHANGE_ARTIST);
              }}>
              <div className='assignedModal__action__container'>
                <span className='left text-black'>Current Artist:</span>
                <strong className='right text-black'>{assignedTo?.fullName}</strong>
                <RightRectangle width='12px' height='12px' />
              </div>
            </button>
            <button
              className='assignedModal__action'
              onClick={() => {
                updateShowAssignedBoxAction(CHANGE_BUDGET);
              }}>
              <div className='assignedModal__action__container'>
                <span className='left text-black'>Budget:</span>
                <strong className='right text-black'>{formatMoney(budget)}</strong>
                <RightRectangle width='12px' height='12px' />
              </div>
            </button>
          </div>

          <div className={`assignedModal__content`}>
            <div>
              <button
                className=''
                onClick={() => {
                  updateShowAssignedBoxAction(INCREASE_BUDGET);
                }}>
                <div className=''>Increase Budget</div>
              </button>
              <button
                className=''
                onClick={() => {
                  updateShowAssignedBoxAction(DECREASE_BUDGET);
                }}>
                <div className=''>Decrease Budget</div>
              </button>
            </div>
            <button
              className=''
              onClick={() => {
                updateShowAssignedBoxAction(BUDGET_HISTORY);
              }}>
              <div className=''>Budget History</div>
            </button>
          </div>
        </ModalBody>
        <ModalFooter>
          {/* <Button color='secondary' onClick={toggle}>
            Cancel
          </Button> */}
          <Button color='primary' onClick={toggle}>
            Done
          </Button>
        </ModalFooter>

        <ModalBody>
          {previousArtists.map((item) => {
            return (
              <div className='previous-artist mb-2'>
                <div className='previous-artist-row'>
                  <span className='label text-gray'>Previous Artist:</span>
                  <strong className='value text-gray'>{item?.artist?.fullName}</strong>
                </div>
                <div className='previous-artist-row'>
                  <span className='label text-gray'>Budget:</span>
                  <strong className='value text-gray'>{formatMoney(item?.budget)}</strong>
                </div>
              </div>
            );
          })}
        </ModalBody>
      </div>
    </Modal>
  );
};
const mapStateToProps = ({ orderDetail }) => ({
  isOpen: orderDetail.ui.assignedBox.currentShow === ASSIGNED_MODAL_KEYs.ASSIGNED,
});

const mapDispatchToProps = {
  updateShowAssignedBoxAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignedBoxModal);
