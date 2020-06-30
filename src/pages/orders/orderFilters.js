import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduce, debounce } from 'lodash';

import { PERMITTIONS_CONFIG } from 'config';

import {
  getOrderStatusAction,
  updateOrderFiltersAcion,
  getOrdersAction,
  getArtistsAssignAction,
} from './actions';

import OrderFilterAssignee from './orderFilterAssignee';

class OrderFilters extends Component {
  constructor() {
    super();
    this.handleSearchTextAPI = debounce(this.handleSearchTextAPI, 1000);
  }

  componentDidMount() {
    const { getOrderStatus } = this.props;
    getOrderStatus();
  }

  handleChangeStatus = (event) => {
    const { getOrders, updateOrderFilters } = this.props;
    const { target } = event;
    const status = target.getAttribute('data');
    updateOrderFilters({
      selectedStatus: status,
      page: 0,
    });
    getOrders({});
  };

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
    const {
      status,
      selectedStatus,
      orderStatusCount,
      text,
      accountInfo,
    } = this.props;

    const totalOrders = reduce(
      orderStatusCount,
      (res, value, key) => {
        if (key !== 'DONE') {
          return (res += value);
        }
        return res;
      },
      0,
    );

    const canAssign = accountInfo?.permissions?.includes(
      PERMITTIONS_CONFIG.ASSIGN_BOOKING,
    );

    return (
      <div className='order__filter'>
        <div className='list_status'>
          <button
            data=''
            onClick={this.handleChangeStatus}
            key={`list__status_option__all`}
            className={`status ${!selectedStatus && 'active'}`}>
            All
            <span className='number'>{totalOrders || 0}</span>
          </button>
          {status.map((sta) => (
            <button
              data={sta.name}
              onClick={this.handleChangeStatus}
              key={`list__status_option__${sta.name}`}
              className={`status  ${sta.name} ${
                selectedStatus === sta.name && 'active'
              }`}>
              {sta.friendlyName}
              {orderStatusCount[sta.name] && sta.name !== 'DONE' && (
                <span className='number'>{orderStatusCount[sta.name]}</span>
              )}
            </button>
          ))}
        </div>
        <div className='filter__main'>
          <div className='filter__text'>
            <input
              type='text'
              value={text}
              className='search__box form-control'
              onChange={this.handleChangeText}
            />
          </div>
          {canAssign && <OrderFilterAssignee />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ order, auth }) => {
  return {
    text: order.filter.text,
    status: order.status,
    selectedStatus: order.filter.selectedStatus,
    orderStatusCount: order.orderStatusCount,
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {
  getOrderStatus: getOrderStatusAction,
  updateOrderFilters: updateOrderFiltersAcion,
  getOrders: getOrdersAction,
  getArtistsAssign: getArtistsAssignAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilters);
