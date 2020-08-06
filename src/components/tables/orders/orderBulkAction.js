import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { forEach, filter } from 'lodash';
import { confirmAlert } from 'react-confirm-alert';
import { get } from 'lodash';

import { PERMITTIONS_CONFIG } from 'configs';

import { ReactComponent as Close } from 'assets/img/close.svg';
import OrderSelectedCell from 'components/tables/orders/headers/orderSelectedAll';
import OrderPayoutModal from 'components/tables/orders/orderPayoutModal';

import { updateOrderTableStatusDoneBulkAction, updateOrderTableItemsAction } from './actions';

const OrderBulkAction = ({ selected, updateOrderTableStatusDoneBulkAction, updateOrderTableItemsAction, reducer = 'orders', accountInfo }) => {
  const isHide = !selected || !selected?.length;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const canPayOut = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.CREATE_PAYOUT);

  const handleUpdateOrderStatusDone = () => {
    updateOrderTableStatusDoneBulkAction({
      payload: { id: selected },
      reducer,
      onSuccess: () => {
        toast.dark('Order Status Updated');
        forEach(selected, (item) => {
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

  return (
    <div className={`order__bulk ${isHide && 'd-none'}`}>
      <div className='btn-group'>
        <div className='btn btn-group__item'>
          <div className='d-flex align-items-center order__bulk__selected'>
            <OrderSelectedCell reducer={reducer} />
            <span className='number'>{selected?.length} selected</span>
          </div>
        </div>
        <button type='button' className='btn btn-group__item' onClick={handleConfirmChangeStatus}>
          Mark as Done
        </button>
        {canPayOut && (
          <button type='button' className='btn btn-group__item' onClick={toggle}>
            Paid
          </button>
        )}
      </div>

      <OrderPayoutModal isOpen={isOpen} toggle={toggle} reducer={reducer} />
    </div>
  );
};

const mapStateToProps = ({ orderTable, auth }, ownProps) => {
  const { reducer = 'orders' } = ownProps;
  const items = get(orderTable, `${reducer}.table.items`) || {};
  const selected = filter(items, (or) => or.selected).map((or) => or.id);
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
