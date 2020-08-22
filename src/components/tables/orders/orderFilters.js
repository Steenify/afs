import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce, get } from 'lodash';

import { PERMITTIONS_CONFIG } from 'configs';

import CanShow from 'components/layout/canshow';

import { updateOrderTableFilterAction } from './actions';

import OrderFilterAssignee from './orderFilterAssignee';
import OrderFilterStatus from './orderFilterStatus';
import { countTotalOrders } from 'utils';

class OrderFilters extends Component {
  constructor() {
    super();
    this.handleSearchTextAPI = debounce(this.handleSearchTextAPI, 1000);
  }

  handleChangeStatus = (event) => {
    const { updateOrderTableFilterAction, reducer } = this.props;
    const { target } = event;
    const alert = target.getAttribute('data');
    updateOrderTableFilterAction({
      payload: {
        alert,
        page: 0,
      },
      reducer,
    });
  };

  handleChangeText = (e) => {
    const { value } = e.target;
    this.handleSearchTextAPI(value);
  };

  handleCheckPoster = () => {
    const { updateOrderTableFilterAction, reducer, hasPoster } = this.props;
    updateOrderTableFilterAction({
      payload: { hasPoster: !hasPoster, page: 0 },
      reducer,
    });
  };

  handleSearchTextAPI = (value) => {
    const { updateOrderTableFilterAction, reducer } = this.props;
    updateOrderTableFilterAction({
      payload: { text: value, page: 0 },
      reducer,
    });
  };

  render() {
    const { text, accountInfo, reducer, selectedAlertType, orderStatusCount, hasPoster } = this.props;

    const canAssign = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.ASSIGN_BOOKING);
    const totalOrders = countTotalOrders(orderStatusCount);

    return (
      <div className='order__filter'>
        <div className='list_status d-none d-sm-block'>
          <button data='' onClick={this.handleChangeStatus} key={`list__status_option__all`} className={`status ${!selectedAlertType && 'active'}`}>
            All
            <span className='number'>{totalOrders || 0}</span>
          </button>
          <button data='NO_ACTIVITY' onClick={this.handleChangeStatus} key={`list__alert_option__no_activity`} className={`status NO_ACTIVITY ${selectedAlertType === 'NO_ACTIVITY' && 'active'}`}>
            No Activity in 24h
            <span className='number'>{orderStatusCount['NO_ACTIVITY'] || 0}</span>
          </button>
          <button
            data='LATE_WORK_LOG_DEADLINE'
            onClick={this.handleChangeStatus}
            key={`list__alert_option__late`}
            className={`status LATE_WORK_LOG_DEADLINE ${selectedAlertType === 'LATE_WORK_LOG_DEADLINE' && 'active'}`}>
            No Sketch in 3 days
            <span className='number'>{orderStatusCount['LATE_WORK_LOG_DEADLINE'] || 0}</span>
          </button>
          <CanShow permission={PERMITTIONS_CONFIG.SHOW_POSTER}>
            <button onClick={this.handleCheckPoster} key={`list__alert_option__has_poster`} className={`status ${hasPoster === true && 'active'}`}>
              Has Poster
            </button>
          </CanShow>
        </div>
        <div className='filter__main'>
          <div className='filter__text'>
            <input type='text' defaultValue={text} placeholder='Search orders' className='search__box form-control' onChange={this.handleChangeText} />
          </div>
          <OrderFilterStatus reducer={reducer} />
          {canAssign && <OrderFilterAssignee reducer={reducer} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ orderTable, auth }, ownProps) => {
  const { reducer = 'orders' } = ownProps;
  const table = get(orderTable, `${reducer}`);
  return {
    text: table.filter.text,
    accountInfo: auth.data.accountInfo,
    selectedAlertType: table.filter.alert,
    orderStatusCount: table.orderStatusCount,
    hasPoster: table.filter.hasPoster,
  };
};

const mapDispatchToProps = {
  updateOrderTableFilterAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilters);
