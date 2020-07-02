import React, { useState } from 'react';
import { connect } from 'react-redux';
import Popover from 'react-tiny-popover';

import { ReactComponent as Cavet } from 'assets/img/cavet.svg';

import ListArtists from 'components/layout/ListArtistAssign';

import {} from './actions';

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
      transitionDuration={0.000001}
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
  const { assignee } = order.filter;
  return {
    assignee,
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderFilterAssignee);
