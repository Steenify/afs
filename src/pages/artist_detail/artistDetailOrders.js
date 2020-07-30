import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spinner } from 'reactstrap';

import TableBody from 'components/common/tableBody';
import TableHeader from 'components/common/tableHeader';

import { PERMITTIONS_CONFIG } from 'config';

import { remove, get } from 'lodash';

// import OrderBulkAction from './orderBulkAction';

import orderBudgetCell from 'components/tables/cells/orderBugetCell';
import AssignArtistCell from 'components/tables/cells/orderAssignArtistCell';
import OrderDetailCell from 'components/tables/cells/orderDetailCell';
import OrderCustomerCell from 'components/tables/cells/orderCustomerCell';
import OrderPaymentCell from 'components/tables/cells/orderPaymentCell';
import OrderSelectedCell from 'components/tables/cells/orderSelectedCell';
import OrderSelectedAll from 'components/tables/headers/orderSelectedAll';
import OrderCreatedDateCell from 'components/tables/cells/orderCreateDateCell';
// import OrderDeadlineCell from './orderDeadlineCell';
import OrderSubTotalCell from 'components/tables/cells/orderSubTotalCell';
import OrderStatusCell from 'components/tables/cells/orderStatusCell';
import OrderLastUpdateDateCell from 'components/tables/cells/orderLastUpdateCell';

import { updateOrderItemsAcion, updateOrdersBudgetAction, assignOrdersArtistAction, updateAllOrderSelectedAction } from './actions';

class OrderTableDesktop extends PureComponent {
  getRowProps = (row) => {
    const now = new Date().getTime();
    const deadline = new Date(row.deadline).getTime();
    const isLated = now > deadline || false;
    const isNotDone = row.status !== 'DONE';
    return {
      className: `${isLated && isNotDone ? 'lated' : ''} ${!isNotDone && 'DONE'}`,
    };
  };

  goToDetail = (code) => {
    const { history } = this.props;
    if (code) {
      history.push(`/order/${code}`);
    }
  };

  render() {
    const { loading, accountInfo, ids, updateOrderItemsAcion, updateOrdersBudgetAction, assignOrdersArtistAction, updateAllOrderSelectedAction } = this.props;

    let columnsOrder = [
      {
        accessor: 'selected',
        Header: OrderSelectedAll,
        headerProps: { updateAllOrderSelected: updateAllOrderSelectedAction, reducerPath: 'artistDetail' },
        minWidth: 40,
        Cell: OrderSelectedCell,
        cellProps: { updateOrderItems: updateOrderItemsAcion },
      },
      {
        accessor: 'number',
        Header: 'Number',
        minWidth: 100,
        Cell: OrderDetailCell,
        style: {
          width: 80,
        },
      },
      {
        accessor: 'paidAt',
        Header: 'Date',
        minWidth: 100,
        Cell: OrderCreatedDateCell,
      },
      {
        accessor: 'lastModifiedDate',
        minWidth: 110,
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
        minWidth: 80,
        className: 'text-right',
        style: {
          width: 80,
        },
        Cell: OrderSubTotalCell,
      },
      {
        accessor: 'budget',
        Header: 'Budget',
        className: 'text-right',
        minWidth: 80,
        style: {
          width: 80,
        },
        Cell: orderBudgetCell,
        cellProps: {
          updateOrdersBudget: updateOrdersBudgetAction,
          updateOrderItems: updateOrderItemsAcion,
        },
      },
      {
        accessor: 'assignedTo',
        Header: 'Assigned',
        minWidth: 100,
        Cell: AssignArtistCell,
        cellProps: {
          updateOrderItems: updateOrderItemsAcion,
          assignOrdersArtist: assignOrdersArtistAction,
        },
        style: {
          width: 110,
        },
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

    if (!accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.VIEW_CUSTOMER_INFO)) {
      columnsOrder = remove(columnsOrder, (col) => col.Header !== 'Customner');
    }
    if (!accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.VIEW_ORDER_SUBTOTAL)) {
      columnsOrder = remove(columnsOrder, (col) => col.Header !== 'Price');
    }

    const isCanPay = accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.UPDATE_PAYMENT_STATUS);

    return (
      <div className={`order__wrapper relative`}>
        <div className={`order__loading ${!loading && 'd-none'}`}>
          <Spinner /> <span className='text'>Loading</span>
        </div>
        {/* {isCanPay && <OrderBulkAction />} */}
        <div className='table-responsive bg-light steenify-table bg-white order__table'>
          <table className='table'>
            <TableHeader columns={columnsOrder} />
            <TableBody cellProps={{ goToDetail: this.goToDetail }} reducerPath='artistDetail' getRowProps={this.getRowProps} data={ids} columns={columnsOrder} rowName='TableRowOrder' />
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, artistDetail }, ownProps) => {
  const ids = get(artistDetail, 'table.ids') || {};
  const loading = get(artistDetail, 'table.loading');
  return {
    ids,
    loading,
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {
  updateOrderItemsAcion,
  updateOrdersBudgetAction,
  assignOrdersArtistAction,
  updateAllOrderSelectedAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderTableDesktop));
