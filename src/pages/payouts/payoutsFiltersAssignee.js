import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Popover from 'react-tiny-popover';

import { ReactComponent as Cavet } from 'assets/img/cavet.svg';

import ListArtists from 'components/layout/ListArtistAssign';

import {
  getPayoutListAction,
  updatePayoutFilterAction,
  getPayoutSummaryAction,
} from './actions';

class OrderFilterAssignee extends PureComponent {
  constructor() {
    super();
    this.state = {
      isPopoverOpen: false,
    };
  }

  toggle = () => {
    this.setState((prevState) => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  onSave = (value) => {
    const { updatePayoutFilter, getPayoutList, getPayoutSummary } = this.props;
    const { isPopoverOpen } = this.state;

    this.setState(
      {
        isPopoverOpen: !isPopoverOpen,
      },
      () => {
        updatePayoutFilter({
          assignee: value?.login || '',
        });
        getPayoutList({});
        getPayoutSummary({});
      },
    );
  };

  render() {
    const { assignee } = this.props;
    const { isPopoverOpen } = this.state;

    return (
      <Popover
        isOpen={isPopoverOpen}
        position={'bottom'}
        transitionDuration={0.000001}
        padding={10}
        onClickOutside={this.toggle}
        content={() => <ListArtists onSave={this.onSave} assignedTo={{}} />}>
        <button
          onClick={this.toggle}
          className='filter__toggle filter__assignee'>
          <span className='dispaly_name'>
            {assignee && assignee !== 'null' ? assignee : 'Artist'}
          </span>
          <span className='icon mb-2 ml-2'>
            <Cavet />
          </span>
        </button>
      </Popover>
    );
  }
}

const mapStateToProps = ({ payouts }) => {
  const { assignee } = payouts.filter;
  return {
    assignee,
  };
};

const mapDispatchToProps = {
  getPayoutList: getPayoutListAction,
  updatePayoutFilter: updatePayoutFilterAction,
  getPayoutSummary: getPayoutSummaryAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderFilterAssignee);
