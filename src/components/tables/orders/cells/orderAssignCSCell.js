import React, { useState } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import Popover from 'react-tiny-popover';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import { PERMITTIONS_CONFIG } from 'configs';

import { updateOrderTableItemsAction, updateOrderTableAssignCSAction } from 'components/tables/orders/actions';
import ListCS from 'components/layout/ListCSAssign';

const AssignCSCell = ({ cs, accountInfo, id, updateOrderTableItemsAction, updateOrderTableAssignCSAction, number, reducer }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const onSave = (value) => {
    toggle();
    updateOrderTableItemsAction({
      payload: {
        id: id,
        field: 'cs',
        value: value,
      },
      reducer,
    });

    const payload = { id: id, to: value.login };
    const name = value.login !== 'null' ? value.firstName : '_______';
    console.log('onSave -> payload', payload);
    updateOrderTableAssignCSAction({
      payload,
      reducer,
      onSuccess: () => toast.dark(`Order [#${number}] is assigned to CS [${name}]`),
    });
  };

  const canAssignOrder = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.ASSIGN_ORDER_TO_CS);

  if (!canAssignOrder) {
    return (
      <div className='order__assigned'>
        <span className='name'>{isEmpty(cs) || !cs ? '____________' : `${cs?.fullName || ''}` || `${cs?.firstName || ''} ${cs?.lastName || ''}`}</span>
      </div>
    );
  }

  return (
    <Popover isOpen={isPopoverOpen} position={'bottom'} transitionDuration={0.000001} padding={10} onClickOutside={toggle} content={() => <ListCS onSave={onSave} cs={cs} />}>
      <button type='button' onClick={() => setIsPopoverOpen(!isPopoverOpen)} className='order__toggle order__assigned w-100'>
        <div className='d-flex'>
          <span className='name'>{isEmpty(cs) || cs?.login === 'null' ? '____________' : `${cs?.fullName || ''}` || `${cs?.firstName || ''} ${cs?.lastName || ''}`}</span>
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
    cs: item?.cs,
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {
  updateOrderTableItemsAction,
  updateOrderTableAssignCSAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AssignCSCell));
