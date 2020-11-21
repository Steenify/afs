import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import Button from 'components/common/button';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Popover from 'react-tiny-popover';

import { formatMoney } from 'utils';
import { isEmpty } from 'lodash';
import { PERMITTIONS_CONFIG } from 'configs';

import { ReactComponent as AssignedIcon } from 'assets/img/assigned.svg';
import { ReactComponent as InfoIC } from 'assets/img/info.svg';

import { updateShowAssignedBoxAction, ASSIGNED_MODAL_KEYs } from 'pages/orders_detail/actions';

const OrderAssignedItem = ({ order, updateShowAssignedBoxAction }) => {
  const { assignedTo } = order || {};

  return (
    <div className='order_assigned_item'>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center'>
          <strong className='title'>Assigned</strong>
          {order?.artistBudgets?.length > 1 && (
            <span className='icon d-block ml-1 mr-5'>
              <AssignedIcon width='14px' height='14px' />
            </span>
          )}
        </div>
        <button className='box__control p-0' onClick={() => updateShowAssignedBoxAction(ASSIGNED_MODAL_KEYs.ASSIGNED)}>
          <span className='name'>Manage</span>
        </button>
      </div>

      <div className='d-flex align-items-center justify-content-between'>
        <span className='mr-5'>Current Artist:</span>
        <strong className='name'>
          {isEmpty(assignedTo) || assignedTo?.login === 'null' ? '____________' : `${assignedTo?.fullName || ''}` || `${assignedTo?.firstName || ''} ${assignedTo?.lastName || ''}`}
        </strong>
      </div>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center'>
          <span className=''>Budget:</span>
          <span className='icon d-block ml-1 mr-5'>
            <InfoIC width='14px' height='14px' />
          </span>
        </div>
        <strong className='budget'>{formatMoney(order.budget)} </strong>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {
  updateShowAssignedBoxAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderAssignedItem);
