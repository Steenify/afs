import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NumberFormat from 'react-number-format';
import { get } from 'lodash';

import Button from 'components/common/button';

import { ReactComponent as CloseIcon } from 'assets/img/close.svg';

import { updateOrderTableSelectedOrderBudgetAction } from './actions';

const OrderUpdateBudgetModal = ({ reducer, isOpenEditBudget, updateOrderTableSelectedOrderBudget }) => {
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState('');

  const toggle = () => updateOrderTableSelectedOrderBudget({ payload: { isOpenEditBudget: !isOpenEditBudget, selectedOrder: {} }, reducer });
  const onSave = () => {};
  return (
    <Modal isOpen={isOpenEditBudget} toggle={toggle} fade={false} size='lg' className='modal-dialog-centered  modal-no-border order__updatebudget'>
      <div className='changeBudgetModal'>
        <ModalHeader toggle={toggle}>
          <div className='d-flex align-items-center'>
            <div>Change Budget</div>
          </div>
          <button type='button' className='modal-close' onClick={toggle}>
            <CloseIcon width='25px' height='25px' />
          </button>
        </ModalHeader>
        <ModalBody>
          <div className=' mb-3'>
            <div className='label'>{`Amount:`}</div>
            <NumberFormat prefix={'$  '} thousandSeparator={true} className='form-control amount' value={amount} onValueChange={(data) => setAmount(data?.value || 0)} />
          </div>
          <span className='label'>Note:</span>
          <textarea className='form-control note' placeholder='Change budget note' onChange={(e) => setNote(e?.target?.value || '')} value={note} rows='3'></textarea>
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

const mapStateToProps = ({ orderTable, auth }, ownProps) => {
  const { reducer = 'orders' } = ownProps;
  const table = get(orderTable, `${reducer}`);

  return {
    accountInfo: auth.data.accountInfo,
    selectedOrder: table.ui.selectedOrder,
    isOpenEditBudget: table.ui.isOpenEditBudget,
  };
};

const mapDispatchToProps = {
  updateOrderTableSelectedOrderBudget: updateOrderTableSelectedOrderBudgetAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderUpdateBudgetModal);
