import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { forEach, filter } from 'lodash';
import { confirmAlert } from 'react-confirm-alert';
import { get } from 'lodash';
import Sticky from 'react-stickynode';

import { PERMITTIONS_CONFIG, statusPayments } from 'configs';

import { ReactComponent as Close } from 'assets/img/close.svg';
import OrderSelectedCell from 'components/tables/orders/headers/orderSelectedAll';
import OrderPayoutModal from 'components/tables/orders/orderPayoutModal';

import { updateOrderTableStatusDoneBulkAction, updateOrderTableItemsAction } from './actions';

const OrderBulkAction = ({ selected, updateOrderTableStatusDoneBulkAction, updateOrderTableItemsAction, reducer = 'orders', accountInfo }) => {
  const isHide = !selected || !selected?.length;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const canPayOut = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.CREATE_PAYOUT) && selected.filter((s) => s.artistPaymentStatus === statusPayments[1]).length > 0;

  const handleUpdateOrderStatusDone = (isRefund) => {
    const ids = selected.map((s) => s.id);
    updateOrderTableStatusDoneBulkAction({
      payload: { id: ids, isRefund },
      reducer,
      onSuccess: () => {
        toast.dark('Order Status Updated');
        forEach(ids, (item) => {
          updateOrderTableItemsAction({
            payload: { id: item, field: 'status', value: 'DONE' },
            reducer,
          });
        });
      },
    });
  };

  const handleConfirmChangeStatus = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='comfirm_cus'>
            <div className='comfirm_cus__header'>
              <div className='comfirm_cus__titl'>Change Status</div>
              <button type='button' onClick={onClose} className='comfirm_cus__close'>
                <div className='icon'>
                  <Close />
                </div>
              </button>
            </div>
            <div className='comfirm_cus__body'>
              <p>Are you sure you want to change status this orders?</p>
            </div>
            <div className='comfirm_cus__footer text-right'>
              <button className='comfirm_cus__cancel comfirm_cus__control' onClick={onClose}>
                Cancel
              </button>
              <button
                className='comfirm_cus__accept comfirm_cus__control'
                onClick={() => {
                  handleUpdateOrderStatusDone();
                  onClose();
                }}>
                Accept
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const handleConfirmRefund = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='comfirm_cus'>
            <div className='comfirm_cus__header'>
              <div className='comfirm_cus__titl'>Refund</div>
              <button type='button' onClick={onClose} className='comfirm_cus__close'>
                <div className='icon'>
                  <Close />
                </div>
              </button>
            </div>
            <div className='comfirm_cus__body'>
              <p>Are you sure you want to refund these orders?</p>
            </div>
            <div className='comfirm_cus__footer text-right'>
              <button className='comfirm_cus__cancel comfirm_cus__control' onClick={onClose}>
                Cancel
              </button>
              <button
                className='comfirm_cus__accept comfirm_cus__control'
                onClick={() => {
                  handleUpdateOrderStatusDone(true);
                  onClose();
                }}>
                Accept
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div className={`order__bulk`} style={{ opacity: isHide ? 0 : 1 }}>
      <Sticky top={57}>
        <div className='wrapper'>
          <div className='btn-group'>
            <div className='btn btn-group__item d-flex align-items-center'>
              <div className='d-flex align-items-center order__bulk__selected'>
                <OrderSelectedCell reducer={reducer} />
                <span className='number'>{selected?.length} selected</span>
              </div>
            </div>
            <button type='button' className='btn btn-group__item' onClick={handleConfirmChangeStatus}>
              Mark as Done
            </button>
            <button type='button' className='btn btn-group__item' onClick={handleConfirmRefund}>
              Refund
            </button>
            {canPayOut && (
              <button type='button' className='btn btn-group__item' onClick={toggle}>
                Paid
              </button>
            )}
          </div>
        </div>
      </Sticky>

      <OrderPayoutModal isOpen={isOpen} toggle={toggle} reducer={reducer} />
    </div>
  );
};

const mapStateToProps = ({ orderTable, auth }, ownProps) => {
  const { reducer = 'orders' } = ownProps;
  const items = get(orderTable, `${reducer}.table.items`) || {};
  const selected = filter(items, (or) => or.selected).map((or) => or);
  return {
    accountInfo: auth.data.accountInfo,
    selected,
  };
};

const mapDispatchToProps = {
  updateOrderTableStatusDoneBulkAction,
  updateOrderTableItemsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBulkAction);
