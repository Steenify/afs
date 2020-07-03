import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import { PERMITTIONS_CONFIG } from 'config';

import {} from './actions';

import OrderFilterAssignee from './payoutsFiltersAssignee';
import OrderFilterDate from './payoutsFiltersDate';

class PayoutFilters extends Component {
  constructor() {
    super();
    this.handleSearchTextAPI = debounce(this.handleSearchTextAPI, 1000);
  }

  handleChangeText = (e) => {
    const { updateOrderFilters } = this.props;
    const { value } = e.target;
    updateOrderFilters({
      text: value,
      page: 0,
    });

    this.handleSearchTextAPI();
  };

  handleSearchTextAPI = () => {
    const { getOrders } = this.props;
    getOrders({});
  };

  render() {
    const { text, accountInfo } = this.props;

    const canAssign = accountInfo?.permissions?.includes(
      PERMITTIONS_CONFIG.ASSIGN_BOOKING,
    );

    return (
      <div className='payouts__filters'>
        <div className='filter__main'>
          <div className='filter__text'>
            <input
              type='text'
              value={text}
              placeholder='Search orders'
              className='search__box form-control'
              onChange={this.handleChangeText}
            />
          </div>
          {canAssign && <OrderFilterAssignee />}
          <OrderFilterDate />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ order, auth }) => {
  return {
    text: order.filter.text,
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutFilters);
