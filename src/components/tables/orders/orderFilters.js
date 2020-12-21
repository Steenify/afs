import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce, get } from 'lodash';

import { PERMITTIONS_CONFIG } from 'configs';

import CanShow from 'components/layout/canshow';

import { updateOrderTableFilterAction } from './actions';

import OrderFilterAssignee from './orderFilterAssignee';
import OrderFilterStatus from './orderFilterStatus';
import OrderFilterTag from './orderFilterTag';
import OrderFilterSource from './orderFilterSource';
import { countTotalOrders } from 'utils';

class OrderFilters extends Component {
  constructor() {
    super();
    this.handleSearchTextAPI = debounce(this.handleSearchTextAPI, 1000);
  }

  handleChangeStatusResset = (event) => {
    const { updateOrderTableFilterAction, reducer } = this.props;
    updateOrderTableFilterAction({
      payload: {
        alert: '',
        page: 0,
        cs: '',
        hasPoster: false,
      },
      reducer,
    });
  };

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

  handleCheckCS = () => {
    const { updateOrderTableFilterAction, reducer, cs, accountInfo } = this.props;

    const { login } = accountInfo;

    const filter_cs = cs ? '' : login;

    updateOrderTableFilterAction({
      payload: { cs: filter_cs, page: 0 },
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
    const { text, accountInfo, reducer, selectedAlertType, orderStatusCount, hasPoster, cs } = this.props;

    const canAssign = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.ASSIGN_BOOKING);
    const totalOrders = countTotalOrders(orderStatusCount);

    return (
      <div className='order__filter'>
        <div className='list_status d-none d-sm-block'>
          <button data='' onClick={this.handleChangeStatusResset} key={`list__status_option__all`} className={`status ${!selectedAlertType && 'active'}`}>
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
          <CanShow permission={PERMITTIONS_CONFIG.VIEW_LASTEST_UPDATED_ORDER}>
            <button
              data='ARTIST_UPLOADED'
              key={`list__alert_option__new_update`}
              onClick={this.handleChangeStatus}
              className={`status ARTIST_UPLOADED COLOR_REVIEW ${selectedAlertType === 'ARTIST_UPLOADED' && 'active'}`}>
              Artist Updated
              <span className='number'>{orderStatusCount['ARTIST_UPLOADED'] || 0}</span>
            </button>
          </CanShow>
          <CanShow permission={PERMITTIONS_CONFIG.SHOW_POSTER}>
            <button onClick={this.handleCheckPoster} key={`list__alert_option__has_poster`} className={`status ${hasPoster === true && 'active'}`}>
              Has Poster
              <span className='number'>{orderStatusCount['CANVAS'] || 0}</span>
            </button>
          </CanShow>
          <CanShow permission={PERMITTIONS_CONFIG.VIEW_MY_ORDER_CS}>
            <button onClick={this.handleCheckCS} key={`list__alert_option__has_poster`} className={`status SKETCH ${cs !== '' && 'active'}`}>
              My Orders
              <span className='number'>{orderStatusCount['MY_ORDERS'] || 0}</span>
            </button>
          </CanShow>
        </div>
        <div className='filter__main flex-wrap'>
          <div className='filter__text'>
            <input type='text' defaultValue={text} placeholder='Search orders' className='search__box form-control' onChange={this.handleChangeText} />
          </div>
          <div className='filter__filters'>
            <CanShow permission={PERMITTIONS_CONFIG.VIEW_ORDER_SOURCE}>
              <OrderFilterSource reducer={reducer} />
            </CanShow>
            <OrderFilterTag reducer={reducer} />
            <OrderFilterStatus reducer={reducer} />
            {canAssign && <OrderFilterAssignee reducer={reducer} />}
          </div>
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
    cs: table.filter.cs,
  };
};

const mapDispatchToProps = {
  updateOrderTableFilterAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderFilters);
