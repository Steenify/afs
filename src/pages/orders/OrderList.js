import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spinner } from 'reactstrap';

// import DataTable from 'components/common/DataTable';
import TableBody from 'components/common/tableBody';
import TableHeader from 'components/common/tableHeader';

import { PERMITTIONS_CONFIG } from 'config';

import { getOrdersAction, updateOrderFiltersAcion } from './actions';

import { remove } from 'lodash';

import orderBudgetCell from './orderBugetCell';
import AssignArtistCell from './assignArtistCell';
import OrderDetailCell from './orderDetailCell';
import OrderFilters from './orderFilters';
import OrderCustomerCell from './orderCustomerCell';
import OrderPaymentCell from './orderPaymentCell';
import OrderBulkAction from './orderBulkAction';
import OrderSelectedCell from './orderSelectedCell';
import OrderSelectedAll from './orderSelectedAll';
import OrderCreatedDateCell from './orderCreateDateCell';
// import OrderDeadlineCell from './orderDeadlineCell';
import OrderSubTotalCell from './orderSubTotalCell';
import OrderStatusCell from './orderStatusCell';
import OrderLastUpdateDateCell from './orderLastUpdateCell';
import OrderPaging from './orderPaging';

let columnsOrder = [
  {
    accessor: 'selected',
    Header: OrderSelectedAll,
    minWidth: 40,
    Cell: OrderSelectedCell,
  },
  {
    accessor: 'number',
    Header: 'Number',
    minWidth: 100,
    Cell: OrderDetailCell,
  },
  {
    accessor: 'paidAt',
    Header: 'Created Date',
    minWidth: 130,
    Cell: OrderCreatedDateCell,
  },
  // {
  //   accessor: 'deadline',
  //   minWidth: 100,
  //   Header: 'Deadline',
  //   Cell: OrderDeadlineCell,
  // },
  {
    accessor: 'lastModifiedDate',
    minWidth: 130,
    Header: 'Last Update',
    Cell: OrderLastUpdateDateCell,
  },
  {
    accessor: 'customer',
    Header: 'Customner',
    minWidth: 80,
    Cell: OrderCustomerCell,
  },

  {
    accessor: 'subtotal',
    Header: 'Price',
    minWidth: 100,
    className: 'text-right',
    Cell: OrderSubTotalCell,
  },
  {
    accessor: 'budget',
    Header: 'Budget',
    className: 'text-right',
    minWidth: 100,
    Cell: orderBudgetCell,
  },
  {
    accessor: 'assignedTo',
    Header: 'Assigned To',
    minWidth: 120,
    Cell: AssignArtistCell,
  },
  {
    accessor: 'status',
    minWidth: 150,
    Header: 'Status',
    Cell: OrderStatusCell,
  },
  {
    accessor: 'artistPaymentStatus',
    Header: 'Payment',
    minWidth: 100,
    Cell: OrderPaymentCell,
  },
];

class OrderList extends Component {
  componentDidMount() {
    const { getOrders } = this.props;

    setTimeout(() => {
      getOrders({});
    }, 1000);
  }

  getRowProps = (row) => {
    const now = new Date().getTime();
    const deadline = new Date(row.deadline).getTime();
    const isLated = now > deadline || false;
    const isNotDone = row.status !== 'DONE';
    return {
      className: `${isLated && isNotDone ? 'lated' : ''} ${
        !isNotDone && 'DONE'
      }`,
    };
  };

  goToDetail = (code) => {
    const { history } = this.props;
    if (code) {
      history.push(`/order/${code}`);
    }
  };

  gotoPage = (page) => {
    const { updateOrderFilters, getOrders } = this.props;
    updateOrderFilters({ page: page - 1 });
    getOrders({});
  };

  render() {
    const { loading, accountInfo, ids } = this.props;

    if (
      !accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.VIEW_CUSTOMER_INFO)
    ) {
      columnsOrder = remove(columnsOrder, (col) => col.Header !== 'Customner');
    }
    if (
      !accountInfo?.permissions?.includes(
        PERMITTIONS_CONFIG.VIEW_ORDER_SUBTOTAL,
      )
    ) {
      columnsOrder = remove(columnsOrder, (col) => col.Header !== 'Price');
    }

    const isCanPay = accountInfo?.permissions?.includes(
      PERMITTIONS_CONFIG.UPDATE_PAYMENT_STATUS,
    );

    return (
      <div>
        <OrderFilters />

        <div className={`order__wrapper relative`}>
          <div className={`order__loading ${!loading && 'd-none'}`}>
            <Spinner /> <span className='text'>Loading</span>
          </div>
          {isCanPay && <OrderBulkAction />}

          <div className='table-responsive bg-light steenify-table bg-white order__table'>
            <table className='table'>
              <TableHeader columns={columnsOrder} />
              <TableBody
                cellProps={{ goToDetail: this.goToDetail }}
                getRowProps={this.getRowProps}
                data={ids}
                columns={columnsOrder}
                rowName='TableRowOrder'
              />
            </table>
          </div>

          <OrderPaging gotoPage={this.gotoPage} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ order, auth }) => ({
  totalItems: order.list.totalItems,
  ids: order.list.ids,
  loading: order.ui.list.loading,
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {
  getOrders: getOrdersAction,
  updateOrderFilters: updateOrderFiltersAcion,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(OrderList));
