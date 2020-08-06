import React, { useState } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import Popover from 'react-tiny-popover';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import { PERMITTIONS_CONFIG } from 'configs';

import { updateOrderTableItemsAction, updateOrderTableAssignArtistAction } from 'components/tables/orders/actions';
import ListArtists from 'components/layout/ListArtistAssign';

const AssignArtistCell = ({ assignedTo, accountInfo, id, updateOrderTableItemsAction, updateOrderTableAssignArtistAction, number, reducer }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const onSave = (value) => {
    toggle();
    updateOrderTableItemsAction({
      payload: {
        id: id,
        field: 'assignedTo',
        value: value,
      },
      reducer,
    });

    const payload = { id: id, to: value.login };
    const name = value.login !== 'null' ? value.firstName : '_______';
    updateOrderTableAssignArtistAction({
      payload,
      reducer,
      onSuccess: () => toast.dark(`Order [#${number}] is assigned to [${name}]`),
    });
  };

  const canAssignOrder = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.ASSIGN_BOOKING);
  const canGetArtists = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.VIEW_ARTIST_LIST);

  if (!canAssignOrder || !canGetArtists) {
    return (
      <div className='order__assigned'>
        <span className='name'>{isEmpty(assignedTo) ? '____________' : `${assignedTo?.fullName || ''}` || `${assignedTo?.firstName || ''} ${assignedTo?.lastName || ''}`}</span>
      </div>
    );
  }

  return (
    <Popover isOpen={isPopoverOpen} position={'bottom'} transitionDuration={0.000001} padding={10} onClickOutside={toggle} content={() => <ListArtists onSave={onSave} assignedTo={assignedTo} />}>
      <button type='button' onClick={() => setIsPopoverOpen(!isPopoverOpen)} className='order__toggle order__assigned w-100'>
        <div className='d-flex'>
          <span className='name'>
            {isEmpty(assignedTo) || assignedTo?.login === 'null' ? '____________' : `${assignedTo?.fullName || ''}` || `${assignedTo?.firstName || ''} ${assignedTo?.lastName || ''}`}
          </span>
          <span className='icon d-block ml-1'>
            <Pencil width='14px' height='14px' />
          </span>
        </div>
      </button>
    </Popover>
  );
};

const mapStateToProps = (reducers, ownProps) => {
  const { auth } = reducers;
  const { data, reducer = 'orders' } = ownProps;
  const item = get(reducers, `orderTable.${reducer}.table.items`)?.[data] || {};
  return {
    number: item?.number || '',
    id: item?.id || 0,
    assignedTo: item?.assignedTo,
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {
  updateOrderTableItemsAction,
  updateOrderTableAssignArtistAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AssignArtistCell));
