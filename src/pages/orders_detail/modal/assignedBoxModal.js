import React from 'react';
import { connect } from 'react-redux';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from 'components/common/button';
import { ReactComponent as CloseIcon } from 'assets/img/close.svg';
import { ReactComponent as RightRectangle } from 'assets/img/right_rectangle.svg';

import { updateShowAssignedBoxAction, ASSIGNED_MODAL_KEYs } from '../actions';

import { formatMoney } from 'utils';
import { PERMITTIONS_CONFIG, mapRoles } from 'configs';
import PreviousArtistBudget from '../previousArtistBudget';

const AssignedBoxModal = ({ order, isOpen, permissions = [], authorities = [], updateShowAssignedBoxAction }) => {
  const { artistBudgets = [], assignedTo = {}, budget = 0 } = order || {};
  const { CHANGE_ARTIST, CHANGE_BUDGET, BUDGET_HISTORY, INCREASE_BUDGET, DECREASE_BUDGET } = ASSIGNED_MODAL_KEYs;
  const { MODIFY_BUDGET, ADJUST_BUDGET, ASSIGN_BOOKING, GET_BUDGET_CHANGE_LOG } = PERMITTIONS_CONFIG;
  const previousArtists = artistBudgets.filter((item) => item?.artist?.id !== assignedTo?.id);

  const canModifyBudget = permissions.includes(MODIFY_BUDGET) || authorities.includes(mapRoles.ROLE_ADMIN);
  const canAssign = permissions.includes(ASSIGN_BOOKING);
  const canAdjustBudget = permissions.includes(ADJUST_BUDGET);
  const canViewBudgetHistory = permissions.includes(GET_BUDGET_CHANGE_LOG);

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
          <div className='assignedModal__assigned mb-3'>
            <button
              className='assignedModal__action'
              onClick={() => {
                if (canAssign) {
                  updateShowAssignedBoxAction(CHANGE_ARTIST);
                }
              }}>
              <div className='assignedModal__action__container'>
                <span className='left text-black'>Current Artist:</span>
                <strong className='right text-black'>{assignedTo?.fullName}</strong>
                {canAssign && <RightRectangle width='12px' height='12px' />}
              </div>
            </button>
            <button
              className='assignedModal__action'
              onClick={() => {
                if (canModifyBudget) {
                  updateShowAssignedBoxAction(CHANGE_BUDGET);
                }
              }}>
              <div className='assignedModal__action__container'>
                <span className='left text-black'>Budget:</span>
                <strong className='right text-black'>{formatMoney(budget)}</strong>
                {canModifyBudget && <RightRectangle width='12px' height='12px' />}
              </div>
            </button>
          </div>

          <div className={`assignedModal__content`}>
            {canAdjustBudget && (
              <div className='assignedModal__ctas'>
                <button
                  className='assignedModal__cta assignedModal__cta__1'
                  onClick={() => {
                    updateShowAssignedBoxAction(INCREASE_BUDGET);
                  }}>
                  <div className=''>Increase Budget</div>
                </button>
                <button
                  className='assignedModal__cta assignedModal__cta__2'
                  onClick={() => {
                    updateShowAssignedBoxAction(DECREASE_BUDGET);
                  }}>
                  <div className=''>Decrease Budget</div>
                </button>
              </div>
            )}
            {canViewBudgetHistory && (
              <div className='assignedModal__ctas'>
                <button
                  className='assignedModal__cta'
                  onClick={() => {
                    updateShowAssignedBoxAction(BUDGET_HISTORY);
                  }}>
                  <div className=''>Budget History</div>
                </button>
              </div>
            )}
          </div>

          <Button color='primary' className='assignedModal__done' onClick={toggle}>
            Done
          </Button>
        </ModalBody>

        <ModalFooter>
          <div className='w-100'>
            {previousArtists.map((item) => {
              return (
                <div key={`order__prev__aritst__modal__${item.id}`} className='previous-artist mb-2'>
                  <PreviousArtistBudget item={item} />
                </div>
              );
            })}
          </div>
        </ModalFooter>
      </div>
    </Modal>
  );
};
const mapStateToProps = ({ orderDetail, auth }) => ({
  isOpen: orderDetail.ui.assignedBox.currentShow === ASSIGNED_MODAL_KEYs.ASSIGNED,
  permissions: auth?.data?.accountInfo?.permissions || [],
  authorities: auth?.data?.accountInfo?.authorities || [],
});

const mapDispatchToProps = {
  updateShowAssignedBoxAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignedBoxModal);
