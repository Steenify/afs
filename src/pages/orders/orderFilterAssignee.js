import React, { useState } from 'react';
import { connect } from 'react-redux';
import Popover from 'react-tiny-popover';

import { ReactComponent as Cavet } from 'assets/img/cavet.svg';

import ListArtists from './listArtistAssign';

import { updateOrderFiltersAcion, getOrdersAction } from './actions';

const OrderFilterAssignee = ({ assignee, updateOrderFilters, getOrders }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const onSave = (value) => {
    toggle();
    updateOrderFilters({
      assignee: value?.login || '',
    });
    getOrders({});
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      position={'bottom'}
      padding={10}
      onClickOutside={toggle}
      content={() => <ListArtists onSave={onSave} assignedTo={{}} />}>
      <button
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        className='filter__toggle'>
        <span className='dispaly_name'>
          {assignee && assignee !== 'null' ? assignee : 'Artist'}
        </span>
        <span className='icon mb-1 ml-2'>
          <Cavet />
        </span>
      </button>
    </Popover>
  );
};

const mapStateToProps = ({ order, auth }) => {
  const { artists } = order;
  const { assignee } = order.filter;
  return {
    assignee,
    accountInfo: auth.data.accountInfo,
    artists,
  };
};

const mapDispatchToProps = {
  updateOrderFilters: updateOrderFiltersAcion,
  getOrders: getOrdersAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderFilterAssignee);
