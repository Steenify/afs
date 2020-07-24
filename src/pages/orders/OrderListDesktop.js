import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spinner } from 'reactstrap';

import TableBody from 'components/common/tableBody';
import TableHeader from 'components/common/tableHeader';

import { PERMITTIONS_CONFIG } from 'config';

import { remove } from 'lodash';

import orderBudgetCell from './orderBugetCell';
import AssignArtistCell from './assignArtistCell';
import OrderDetailCell from './orderDetailCell';
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

class OrderListDesktop extends PureComponent {
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
    const { loading, accountInfo, ids } = this.props;

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
      // {
      //   accessor: 'deadline',
      //   minWidth: 100,
      //   Header: 'Deadline',
      //   Cell: OrderDeadlineCell,
      // },
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
      },
      {
        accessor: 'assignedTo',
        Header: 'Assigned',
        minWidth: 100,
        Cell: AssignArtistCell,
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
        {isCanPay && <OrderBulkAction />}
        <div className='table-responsive bg-light steenify-table bg-white order__table'>
          <table className='table'>
            <TableHeader columns={columnsOrder} />
            <TableBody cellProps={{ goToDetail: this.goToDetail }} getRowProps={this.getRowProps} data={ids} columns={columnsOrder} rowName='TableRowOrder' />
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ order, auth }) => ({
  ids: order.list.ids,
  loading: order.ui.list.loading,
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderListDesktop));
