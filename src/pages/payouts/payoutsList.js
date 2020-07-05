import React, { Component } from 'react';
import { connect } from 'react-redux';

import PayoutsCount from './payoutsCount';
import PayoutsFilter from './payoutsFilters';
import PayoutsListTable from './payoutsListTable';

import { getPayoutListAction } from './actions';

class Payouts extends Component {
  componentDidMount() {
    const { getPayoutList } = this.props;
    getPayoutList();
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
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  getPayoutList: getPayoutListAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payouts);
