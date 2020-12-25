import React, { useState } from 'react';
import { connect } from 'react-redux';
import Popover from 'react-tiny-popover';
import { get } from 'lodash';

import { ReactComponent as Cavet } from 'assets/img/cavet.svg';

import ListStores from 'components/layout/ListStoreAssign';

import { updateOrderTableFilterAction } from './actions';

const OrderFilterStore = ({ storeName, updateOrderTableFilterAction, reducer }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const onSave = (value) => {
    toggle();
    updateOrderTableFilterAction({
      payload: { store: value?.id || '', storeName: value?.name || '' },
      reducer,
    });
  };

  return (
    <Popover isOpen={isPopoverOpen} position={'bottom'} transitionDuration={0.000001} padding={10} onClickOutside={toggle} content={() => <ListStores onSave={onSave} canUnAssign={true} store={{}} />}>
      <button onClick={() => setIsPopoverOpen(!isPopoverOpen)} className='filter__toggle'>
        <span className='dispaly_name'>{storeName ? storeName : 'Store'}</span>
        <span className='icon mb-1 ml-2'>
          <Cavet />
        </span>
      </button>
    </Popover>
  );
};

const mapStateToProps = ({ orderTable, auth }, ownProps) => {
  const { reducer = 'orders' } = ownProps;
  const store = get(orderTable, `${reducer}.filter.store`);
  const storeName = get(orderTable, `${reducer}.filter.storeName`);
  return {
    store,
    storeName,
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {
  updateOrderTableFilterAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilterStore);
