import React, { useState } from 'react';
import { connect } from 'react-redux';
import Popover from 'react-tiny-popover';

import { ReactComponent as Cavet } from 'assets/img/cavet.svg';

import ListArtists from 'components/layout/ListArtistAssign';

import { getPayoutListAction, updatePayoutFilterAction } from './actions';

const OrderFilterAssignee = ({
  assignee,
  updatePayoutFilter,
  getPayoutList,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const onSave = (value) => {
    toggle();
    updatePayoutFilter({
      assignee: value?.login || '',
    });

    getPayoutList({});
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
        <span className='icon mb-2 ml-2'>
          <Cavet />
        </span>
      </button>
    </Popover>
  );
};

const mapStateToProps = ({ payouts, auth }) => {
  const { assignee } = payouts.filter;
  return {
    assignee,
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {
  getPayoutList: getPayoutListAction,
  updatePayoutFilter: updatePayoutFilterAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderFilterAssignee);
