import React, { Component } from 'react';
import { connect } from 'react-redux';

import PayoutsCount from './payoutsCount';
import PayoutsFilter from './payoutsFilters';
import PayoutsListTable from './payoutsListTable';
import PayoutsPaging from './payoutsPaging';

import { getPayoutListAction, getPayoutSummaryAction } from './actions';

class Payouts extends Component {
  componentDidMount() {
    const { getPayoutList, getPayoutSummary } = this.props;
    getPayoutList();
    getPayoutSummary();
  }
  render() {
    return (
      <div className='payouts__page'>
        <div className='payouts__header box'>
          <PayoutsCount />
          <PayoutsFilter />
        </div>

        <div className='payouts__body'>
          <PayoutsListTable />
        </div>
        <div className='payouts__paging'>
          <PayoutsPaging />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  getPayoutList: getPayoutListAction,
  getPayoutSummary: getPayoutSummaryAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payouts);
