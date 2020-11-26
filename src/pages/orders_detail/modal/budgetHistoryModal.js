import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { findIndex } from 'lodash';
import Button from 'components/common/button';

import { updateShowAssignedBoxAction, ASSIGNED_MODAL_KEYs, getBudgetsHistoryAction } from '../actions';
import { formatMoney, dateTimeStringFromDate } from 'utils';

const BUDGET_CHANGE_TYPES = {
  MODIFY: 'Modify Budget',
  INCREASE: 'Increase Budget',
  DECREASE: 'Decrease Budget',
};

const BudgetHistoryModal = ({ order, isOpen, updateShowAssignedBoxAction, getBudgetsHistoryAction }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { artistBudgets } = order;

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

  const getLogStatusPayment = (art) => {
    const index = findIndex(artistBudgets, (bg) => bg?.artist?.login === art?.login);
    const budget = artistBudgets[index] || {};

    return budget?.artistPaymentStatus || 'N/A';
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle} fade={false} size='lg' className='modal-dialog-centered  modal-no-border order_detail__assignedModal'>
      <div className='assignedModal'>
        <ModalHeader toggle={toggle}>
          <div className='d-flex align-items-center'>
            <div>Budget History</div>
          </div>
        </ModalHeader>
        <ModalBody>
          {loading ? (
            <div style={{ minHeight: '100px' }} className=' d-flex align-items-center justify-content-center'>
              <Spinner />
            </div>
          ) : (
            <div className='budget__history__list'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th style={{ minWidth: 50 }} scope='col'>
                      #
                    </th>
                    <th style={{ minWidth: 150 }} scope='col'>
                      Time
                    </th>
                    <th style={{ minWidth: 100 }} scope='col'>
                      People
                    </th>
                    <th style={{ minWidth: 120 }} scope='col'>
                      Type
                    </th>
                    <th style={{ minWidth: 70, textAlign: 'right' }} scope='col'>
                      Budget
                    </th>
                    <th style={{ minWidth: 130 }} scope='col'>
                      Reason
                    </th>
                    <th style={{ minWidth: 100 }} scope='col'>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={`budget__history__${item?.id}__${index}`}>
                      <th scope='row'>{index + 1}</th>
                      <td>{dateTimeStringFromDate(item?.createdDate)}</td>
                      <td>{item?.user?.fullName}</td>
                      <td>{`${BUDGET_CHANGE_TYPES[item?.action] || 'Budget'}`}</td>
                      <td style={{ textAlign: 'right' }}>{formatMoney(item?.amount)}</td>
                      <td>{item?.note}</td>
                      <td>{getLogStatusPayment(item?.artist)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Button color='secondary' className='modal-close' onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
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
