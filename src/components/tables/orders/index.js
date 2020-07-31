import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spinner } from 'reactstrap';

import TableBody from 'components/common/tableBody';
import TableHeader from 'components/common/tableHeader';

import { PERMITTIONS_CONFIG } from 'config';

import { remove, get } from 'lodash';

import OrderBulkAction from 'components/tables/orders/orderBulkAction';
import OrderPaging from 'components/tables/orders/orderPaging';
import OrderFilter from 'components/tables/orders/orderFilters';

import orderBudgetCell from 'components/tables/orders/cells/orderBugetCell';
import AssignArtistCell from 'components/tables/orders/cells/orderAssignArtistCell';
import OrderDetailCell from 'components/tables/orders/cells/orderDetailCell';
import OrderCustomerCell from 'components/tables/orders/cells/orderCustomerCell';
import OrderPaymentCell from 'components/tables/orders/cells/orderPaymentCell';
import OrderSelectedCell from 'components/tables/orders/cells/orderSelectedCell';
import OrderSelectedAll from 'components/tables/orders/headers/orderSelectedAll';
import OrderCreatedDateCell from 'components/tables/orders/cells/orderCreateDateCell';
import OrderSubTotalCell from 'components/tables/orders/cells/orderSubTotalCell';
import OrderStatusCell from 'components/tables/orders/cells/orderStatusCell';
import OrderLastUpdateDateCell from 'components/tables/orders/cells/orderLastUpdateCell';

import { getOrderTableStatusAction, getListAction } from './actions';

class OrderTable extends PureComponent {
  componentDidMount() {
    const { getOrderTableStatusAction, reducer, getListAction, filter } = this.props;
    getOrderTableStatusAction({ reducer });
    getListAction({ payload: filter, reducer });
  }

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
    const { loading, accountInfo, ids, reducer = 'orders', showFilter = true } = this.props;
    let columnsOrder = [
      {
        accessor: 'selected',
        Header: OrderSelectedAll,
        headerProps: { reducer },
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
      <>
        {showFilter && <OrderFilter reducer={reducer} />}

        <div className={`order__wrapper relative`}>
          <div className={`order__loading ${!loading && 'd-none'}`}>
            <Spinner /> <span className='text'>Loading</span>
          </div>
          {isCanPay && <OrderBulkAction reducer={reducer} />}
          <div className='table-responsive bg-light steenify-table bg-white order__table'>
            <table className='table'>
              <TableHeader columns={columnsOrder} />
              <TableBody cellProps={{ goToDetail: this.goToDetail, reducer }} getRowProps={this.getRowProps} reducer={reducer} data={ids} columns={columnsOrder} rowName='TableRowOrder' />
            </table>
          </div>
        </div>
        <OrderPaging reducer={reducer} />
      </>
    );
  }
}

const mapStateToProps = ({ orderTable, auth }, ownProps) => {
  const { reducer = 'orders' } = ownProps;
  const ids = get(orderTable, `${reducer}.table.ids`) || [];
  const loading = get(orderTable, `${reducer}.table.loading`);
  return {
    ids,
    loading,
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = { getOrderTableStatusAction, getListAction };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderTable));
