import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';

import { ReactComponent as CloseIcon } from 'assets/img/close.svg';
import { ReactComponent as BackIcon } from 'assets/img/back.svg';

import { updateShowAssignedBoxAction, ASSIGNED_MODAL_KEYs, getBudgetsHistoryAction } from '../actions';
import { formatMoney } from 'utils';

const BUDGET_CHANGE_TYPES = {
  MODIFY: 'Modify Budget',
  INCREASE: 'Increase Budget',
  DECREASE: 'Decrease Budget',
};

const BudgetHistoryModal = ({ order, isOpen, updateShowAssignedBoxAction, getBudgetsHistoryAction }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (isOpen) {
      getBudgetsHistoryAction({
        orderId: order?.id,
        onPending: () => {
          setLoading(true);
        },
        onSuccess: (res) => {
          setLoading(false);
          const sorted = (res || []).sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
          setData(sorted);
        },
        onError: () => {
          setLoading(false);
          setData([]);
        },
      });
    } else {
      setData([]);
    }
  }, [isOpen, getBudgetsHistoryAction, order]);

  const toggle = () => updateShowAssignedBoxAction(false);
  const onBack = () => {
    if (window.innerWidth < 991) {
      updateShowAssignedBoxAction(ASSIGNED_MODAL_KEYs.ASSIGNED);
    } else {
      updateShowAssignedBoxAction('');
    }
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle} fade={false} size='lg' className='modal-dialog-centered  modal-no-border order_detail__assignedModal'>
      <div className='assignedModal'>
        <ModalHeader toggle={toggle}>
          <div className='d-flex align-items-center'>
            <button type='button' className='back mr-2' onClick={onBack}>
              <BackIcon width='25px' height='25px' />
            </button>
            <div>Budget History</div>
          </div>
          <button type='button' className='modal-close' onClick={toggle}>
            <CloseIcon width='25px' height='25px' />
          </button>
        </ModalHeader>
        <ModalBody>
          {loading ? (
            <div style={{ minHeight: '100px' }} className=' d-flex align-items-center justify-content-center'>
              <Spinner />
            </div>
          ) : (
            <div className='budget__history__list'>
              {data.map((item, index) => {
                return (
                  <div key={`budget__history__${item?.id}__${index}`} className='budget__history__item'>
                    <div className='budget__history__row'>
                      <span className='label'>CS:</span>
                      <strong className='value text-black'>{item?.user?.fullName}</strong>
                    </div>
                    <div className='budget__history__row'>
                      <span className='label'>{`${BUDGET_CHANGE_TYPES[item?.action] || 'Budget'}:`}</span>
                      <strong className='value text-blue'>{formatMoney(item?.amount)}</strong>
                    </div>
                    <div className='budget__history__row'>
                      <span className='label'>Note:</span>
                      <span className='value text-gray'>{item?.note}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ModalBody>
      </div>
    </Modal>
  );
};
const mapStateToProps = ({ orderDetail }) => ({
  isOpen: orderDetail.ui.assignedBox.currentShow === ASSIGNED_MODAL_KEYs.BUDGET_HISTORY,
});

const mapDispatchToProps = {
  updateShowAssignedBoxAction,
  getBudgetsHistoryAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetHistoryModal);
