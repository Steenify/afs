import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import { Desktop, Mobile } from 'components/responsive';

import { getOrdersAction, updateOrderFiltersAcion } from './actions';

import OrderFilters from './orderFilters';

import OrderPaging from './orderPaging';

import OrderListDesktop from './OrderListDesktop';
// import OrderListMobile from './OrderListMobile';

class OrderList extends Component {
  componentDidMount() {
    const { getOrders } = this.props;
    setTimeout(() => {
      getOrders({});
    }, 1000);
  }

  gotoPage = (page) => {
    const { updateOrderFilters, getOrders } = this.props;
    updateOrderFilters({ page: page - 1 });
    getOrders({});
  };

  render() {
    return (
      <div>
        <OrderFilters />
        <OrderListDesktop />
        {/* <Desktop>
        </Desktop>
        <Mobile>
          <OrderListMobile />
        </Mobile> */}
        <OrderPaging gotoPage={this.gotoPage} />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  getOrders: getOrdersAction,
  updateOrderFilters: updateOrderFiltersAcion,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(OrderList));
