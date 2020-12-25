import React, { useState } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import Popover from 'react-tiny-popover';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import { PERMITTIONS_CONFIG } from 'configs';

import { updateOrderTableItemsAction, updateOrderTableAssignStoreAction } from 'components/tables/orders/actions';

import ListStore from 'components/layout/ListStoreAssign';

const AssignCSCell = ({ store, accountInfo, id, updateOrderTableItemsAction, updateOrderTableAssignStore, number, reducer }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const onSave = (value) => {
    toggle();
    updateOrderTableItemsAction({
      payload: {
        id: id,
        field: 'store',
        value: value,
      },
      reducer,
    });

    const payload = { id: id, to: value.id };
    updateOrderTableAssignStore({
      payload,
      reducer,
      onSuccess: () => toast.dark(`Order [#${number}] is assigned to Store [${value.name}]`),
    });
  };

  const canAssignStore = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.ASSIGN_ORDER_TO_STORE);

  if (!canAssignStore) {
    return (
      <div className='order__assigned'>
        <span className='name'>{isEmpty(store) || !store ? '____________' : `${store?.name}`}</span>
      </div>
    );
  }

  return (
    <Popover isOpen={isPopoverOpen} position={'bottom'} transitionDuration={0.000001} padding={10} onClickOutside={toggle} content={() => <ListStore onSave={onSave} store={store} />}>
      <button type='button' onClick={() => setIsPopoverOpen(!isPopoverOpen)} className='order__toggle order__assigned w-100'>
        <div className='d-flex'>
          <span className='name'>{isEmpty(store) ? '____________' : `${store?.name || ''}`}</span>
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
    store: item?.store,
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {
  updateOrderTableItemsAction,
  updateOrderTableAssignStore: updateOrderTableAssignStoreAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AssignCSCell));
