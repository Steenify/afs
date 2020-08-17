import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduce, debounce, get } from 'lodash';

import { PERMITTIONS_CONFIG } from 'configs';

import { updateOrderTableFilterAction, getOrderTableCountByStatusAction } from './actions';

import OrderFilterAssignee from './orderFilterAssignee';
import Select from 'react-select';

class OrderFilters extends Component {
  constructor() {
    super();
    this.handleSearchTextAPI = debounce(this.handleSearchTextAPI, 1000);
    this.handleSelectTags = debounce(this.handleSelectTags, 1000);
  }

  componentDidMount() {
    const { getOrderTableCountByStatusAction, reducer } = this.props;
    getOrderTableCountByStatusAction({ reducer });
  }

  handleChangeStatus = (event) => {
    const { updateOrderTableFilterAction, reducer } = this.props;
    const { target } = event;
    const status = target.getAttribute('data');
    updateOrderTableFilterAction({
      payload: {
        selectedStatus: status,
        page: 0,
      },
      reducer,
    });
  };

  handleChangeText = (e) => {
    const { value } = e.target;
    this.handleSearchTextAPI(value);
  };

  handleSearchTextAPI = (value) => {
    const { updateOrderTableFilterAction, reducer } = this.props;
    updateOrderTableFilterAction({
      payload: { text: value, page: 0 },
      reducer,
    });
  };
  handleSelectTags = (value) => {
    const { updateOrderTableFilterAction, reducer } = this.props;
    updateOrderTableFilterAction({
      payload: { tags: value, page: 0 },
      reducer,
    });
  };

  render() {
    const { status, selectedStatus, orderStatusCount, text, accountInfo, reducer, tagItems, tags } = this.props;
    console.log('OrderFilters -> render -> tagItems', tagItems);

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

    const canAssign = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.ASSIGN_BOOKING);

    return (
      <div className='order__filter'>
        <div className='list_status d-none d-sm-block'>
          <button data='' onClick={this.handleChangeStatus} key={`list__status_option__all`} className={`status ${!selectedStatus && 'active'}`}>
            All
            <span className='number'>{totalOrders || 0}</span>
          </button>
          {status.map((sta) => (
            <button data={sta.name} onClick={this.handleChangeStatus} key={`list__status_option__${sta.name}`} className={`status  ${sta.name} ${selectedStatus === sta.name && 'active'}`}>
              {sta.friendlyName}
              {orderStatusCount[sta.name] && sta.name !== 'DONE' && <span className='number'>{orderStatusCount[sta.name]}</span>}
            </button>
          ))}
        </div>
        <div className='filter__main'>
          <div className='filter__text'>
            <input type='text' defaultValue={text} placeholder='Search orders' className='search__box form-control' onChange={this.handleChangeText} />
          </div>
          {canAssign && <OrderFilterAssignee reducer={reducer} />}
        </div>

        {/* <div className='mt-3'>
          <Select isMulti options={tagItems} defaultValue={tags} onChange={this.handleSelectTags} formatCreateLabel={(input) => `Add tag "${input}"`} />
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = ({ orderTable, auth }, ownProps) => {
  const { reducer = 'orders' } = ownProps;
  const table = get(orderTable, `${reducer}`);
  return {
    text: table.filter.text,
    status: table.status,
    selectedStatus: table.filter.selectedStatus,
    orderStatusCount: table.orderStatusCount,
    accountInfo: auth.data.accountInfo,
    tagItems: table.tags.map((name, index) => ({ label: name, value: `${name}_${index}` })),
    tags: table.filter.tags,
  };
};

const mapDispatchToProps = {
  getOrderTableCountByStatusAction,
  updateOrderTableFilterAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilters);
