import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { lowerCase, upperFirst } from 'lodash';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Button from 'components/common/button';
import { formatMoney } from 'utils';
import NumberFormat from 'react-number-format';
import { ReactComponent as CloseIcon } from 'assets/img/close.svg';
import { ReactComponent as BackIcon } from 'assets/img/back.svg';

import { updateShowAssignedBoxAction, ASSIGNED_MODAL_KEYs, updateOrderBudgetAction, adjustOrderBudgetAction, setBudgetAction } from './actions';

const { CHANGE_BUDGET, INCREASE_BUDGET, DECREASE_BUDGET } = ASSIGNED_MODAL_KEYs;
const TITLES = {
  CHANGE_BUDGET: 'Budget',
  INCREASE_BUDGET: 'Increase Amount',
  DECREASE_BUDGET: 'Decrease Amount',
};

const ChangeBudgetModal = ({ order, isOpen, currentShow, updateShowAssignedBoxAction, updateOrderBudgetAction, adjustOrderBudgetAction, setBudgetAction }) => {
  const [amount, setAmount] = useState();
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setNote('');
      setAmount();
    }
  }, [isOpen]);

  const toggle = () => updateShowAssignedBoxAction(false);
  const onBack = () => updateShowAssignedBoxAction(ASSIGNED_MODAL_KEYs.ASSIGNED);
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
      <div className='assignedModal'>
        <ModalHeader toggle={toggle}>
          <div className='d-flex align-items-center'>
            <button type='button' className='back mr-2' onClick={onBack}>
              <BackIcon width='25px' height='25px' />
            </button>
            <div>Change Budget</div>
          </div>
          <button type='button' className='modal-close' onClick={toggle}>
            <CloseIcon width='25px' height='25px' />
          </button>
        </ModalHeader>
        <ModalBody>
          <div className='change__budget__row mb-3'>
            <span className='label'>{`${title}:`}</span>
            <NumberFormat prefix={'$  '} thousandSeparator={true} className='form-control amount' value={amount} onValueChange={(data) => setAmount(data?.value || 0)} />
          </div>
          {/* <div className='change__budget__row'> */}
          <span className='label'>Note:</span>
          <textarea className='form-control note' placeholder='' onChange={(e) => setNote(e?.target?.value || '')} value={note} rows='3'></textarea>
          {/* </div> */}
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={onSave}>
            Save
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
