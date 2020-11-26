import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { lowerCase, upperFirst } from 'lodash';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Button from 'components/common/button';
import { formatMoney } from 'utils';
import NumberFormat from 'react-number-format';

import { updateShowAssignedBoxAction, ASSIGNED_MODAL_KEYs, updateOrderBudgetAction, adjustOrderBudgetAction, setBudgetAction } from '../actions';

const { CHANGE_BUDGET, INCREASE_BUDGET, DECREASE_BUDGET } = ASSIGNED_MODAL_KEYs;
const TITLES = {
  CHANGE_BUDGET: 'Change Budget',
  INCREASE_BUDGET: 'Increase Budget',
  DECREASE_BUDGET: 'Decrease Budget',
};

const ACTION_CHANGE_TYPES = {
  CHANGE_BUDGET: 'MODIFY',
  INCREASE_BUDGET: 'INCREASE',
  DECREASE_BUDGET: 'DECREASE',
};

const ACTION_CHANGE_COLORS = {
  CHANGE_BUDGET: 'primary',
  INCREASE_BUDGET: 'success',
  DECREASE_BUDGET: 'danger',
};
const ACTION_CHANGE_TEXT = {
  CHANGE_BUDGET: 'primary',
  INCREASE_BUDGET: 'Increase $',
  DECREASE_BUDGET: 'Decrease $',
};

const ChangeBudgetModal = ({ order, isOpen, currentShow, updateShowAssignedBoxAction, updateOrderBudgetAction, adjustOrderBudgetAction, setBudgetAction }) => {
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setNote('');
      setAmount(0);
    }
  }, [isOpen]);

  const toggle = () => updateShowAssignedBoxAction(false);
  const onBack = () => {
    updateShowAssignedBoxAction('');
  };
  const onSave = () => {
    const number = parseInt(amount || 0, 10);
    if (!amount) {
      toast.warn(`Please enter ${lowerCase(title)}`);
      return;
    }
    if (number < 1) {
      toast.warn(`${upperFirst(lowerCase(title))} can't be negative`);
      return;
    }
    const orderId = order?.id;

    if (currentShow === CHANGE_BUDGET) {
      const data = {
        note,
        budget: number,
      };
      updateOrderBudgetAction({
        orderId,
        data,
        onSuccess: () => {
          setBudgetAction(number);
          toast.dark(`Order [#${order?.number}]'s budget is changed to ${formatMoney(number || 0)}$`);
          onBack();
        },
      });
    } else {
      const mark = currentShow === INCREASE_BUDGET ? 1 : -1;
      const currentBudget = order?.budget || 0;
      const data = {
        note,
        amount: mark * number,
        action: ACTION_CHANGE_TYPES[currentShow] || '',
      };
      adjustOrderBudgetAction({
        orderId,
        data,
        onSuccess: () => {
          setBudgetAction(mark * number + currentBudget);
          toast.dark(`Order [#${order?.number}]'s budget is changed to ${formatMoney(mark * number + currentBudget || 0)}$`);
          onBack();
        },
      });
    }
  };
  const title = TITLES[currentShow] || 'Change Budget';
  return (
    <Modal isOpen={isOpen} toggle={toggle} fade={false} size='lg' className='modal-dialog-centered  modal-no-border order_detail__assignedModal'>
      <div className='changeBudgetModal'>
        <ModalHeader toggle={toggle}>
          <div className='d-flex align-items-center'>
            <div>{`${title}`}</div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className='d-flex align-items-center mb-3'>
            <div className='label mr-3'>{'Amount:'}</div>
            <NumberFormat prefix={'$  '} thousandSeparator={true} className='form-control amount' value={amount} onValueChange={(data) => setAmount(data?.value || 0)} />
          </div>
          <span className='label'>Reason:</span>
          <textarea className='form-control note' placeholder='Change budget note' onChange={(e) => setNote(e?.target?.value || '')} value={note} rows='3'></textarea>
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' className='modal-close' onClick={toggle}>
            Cancel
          </Button>
          <Button color={ACTION_CHANGE_COLORS[currentShow] || 'primary'} onClick={onSave}>
            {ACTION_CHANGE_TEXT[currentShow] || 'Save'}
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};
const mapStateToProps = ({ orderDetail }) => ({
  isOpen: [CHANGE_BUDGET, INCREASE_BUDGET, DECREASE_BUDGET].includes(orderDetail.ui.assignedBox.currentShow),
  currentShow: orderDetail.ui.assignedBox.currentShow,
});

const mapDispatchToProps = {
  updateShowAssignedBoxAction,
  updateOrderBudgetAction,
  adjustOrderBudgetAction,
  setBudgetAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeBudgetModal);
