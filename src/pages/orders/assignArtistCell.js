import React, { useState } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import Popover from 'react-tiny-popover';
import { toast } from 'react-toastify';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import { PERMITTIONS_CONFIG } from 'config';

import { updateOrderItemsAcion, assignOrdersArtistAction } from './actions';

import ListArtists from './listArtistAssign';

const AssignArtistCell = ({
  assignedTo,
  accountInfo,
  id,
  updateOrderItems,
  assignOrdersArtist,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const onSave = (value) => {
    toggle();
    updateOrderItems({
      id: id,
      field: 'assignedTo',
      value: value,
    });

    const payload = { id: id, to: value.login };
    assignOrdersArtist(payload, () => {
      toast.success('Assigned order!');
    });
  };

  const canAssignOrder = accountInfo?.permissions?.includes(
    PERMITTIONS_CONFIG.ASSIGN_BOOKING,
  );

  if (!canAssignOrder) {
    return (
      <div className='order__assigned'>
        <span className='name'>
          {isEmpty(assignedTo)
            ? '____________'
            : `${assignedTo?.fullName || ''}` ||
              `${assignedTo?.firstName || ''} ${assignedTo?.lastName || ''}`}
        </span>
      </div>
    );
  }

  return (
    <Popover
      isOpen={isPopoverOpen}
      position={'bottom'}
      padding={10}
      disableReposition
      onClickOutside={toggle}
      content={() => <ListArtists onSave={onSave} assignedTo={assignedTo} />}>
      <button
        type='button'
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        className='order__toggle order__assigned w-100'>
        <div className='d-flex'>
          <span className='name'>
            {isEmpty(assignedTo) || assignedTo?.login === 'null'
              ? '____________'
              : `${assignedTo?.fullName || ''}` ||
                `${assignedTo?.firstName || ''} ${assignedTo?.lastName || ''}`}
          </span>
          <span className='icon d-block ml-1'>
            <Pencil width='14px' height='14px' />
          </span>
        </div>
      </button>
    </Popover>
  );
};

const mapStateToProps = ({ order, auth }, ownProps) => {
  const { original } = ownProps.row;
  const { items } = order.list;
  const item = items[original] || {};
  return {
    id: item?.id || 0,
    assignedTo: item?.assignedTo || {},
    accountInfo: auth.data.accountInfo,
    artists: order.artists,
  };
};

const mapDispatchToProps = {
  updateOrderItems: updateOrderItemsAcion,
  assignOrdersArtist: assignOrdersArtistAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignArtistCell);
