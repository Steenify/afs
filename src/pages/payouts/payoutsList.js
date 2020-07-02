import React, { Component } from 'react';
import { connect } from 'react-redux';

import PayoutsCount from './payoutsCount';
import PayoutsFilter from './payoutsFilters';

import {} from './actions';

class Payouts extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className='payouts__page'>
        <div className='payouts__header box'>
          <PayoutsCount />
          <PayoutsFilter />
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Payouts);
