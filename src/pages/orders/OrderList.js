import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import DataTable from 'components/common/DataTable';
import TableLoader from 'components/common/tableLoader';

import { PERMITTIONS_CONFIG } from 'config';

import { getPaginationItemsNumber } from 'utils';

import { getOrdersAction } from './actions';

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

const OrderList = (props) => {
  const { getOrders, updateOrder, loading, accountInfo, ids } = props;

  const history = useHistory();

  let columns = [
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

  if (
    !accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.VIEW_CUSTOMER_INFO)
  ) {
    columns = remove(columns, (col) => col.Header !== 'Customner');
  }
  if (
    !accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.VIEW_ORDER_SUBTOTAL)
  ) {
    columns = remove(columns, (col) => col.Header !== 'Price');
  }

  const isCanPay = accountInfo?.permissions?.includes(
    PERMITTIONS_CONFIG.UPDATE_PAYMENT_STATUS,
  );

  const handleLoad = ({ page, size, sortBy }) => {
    const params = {
      page,
      size,
      sort: sortBy,
    };
    getOrders(params);
  };

  const goToDetail = (code) => {
    if (code) {
      history.push(`/order/${code}`);
    }
  };

  // const getTrProps = (tr, row) => {
  //   const { original } = row;
  //   const now = new Date().getTime();
  //   const deadline = new Date(original.deadline).getTime();
  //   const isLated = now > deadline || false;
  //   const isNotDone = original.status !== 'DONE';
  //   return {
  //     ...tr,
  //     className: `${isLated && isNotDone ? 'lated' : ''} ${
  //       !isNotDone && 'DONE'
  //     }`,
  //   };
  // };

  return (
    <div>
      <OrderFilters
        onSearch={handleLoad}
        query={{ sortBy: [{ id: 'number', desc: true }] }}
      />

      <div className={`${!loading && 'd-none'}`}>
        <TableLoader />
      </div>

      <div className={`order__wrapper relative ${loading && 'd-none'}`}>
        {isCanPay && <OrderBulkAction updateOrder={updateOrder} />}

        <DataTable
          data={ids}
          columns={columns}
          className='bg-white order__table'
          serverSide
          totalPage={(size) => getPaginationItemsNumber(props.totalItems, size)}
          onLoad={handleLoad}
          goToDetail={goToDetail}
          sortBy={[{ id: 'number', desc: true }]}
          whiteListSort={[
            'customer',
            'assignedTo',
            'budget',
            'status',
            'artistPaymentStatus',
            'selected',
          ]}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ order, auth }) => ({
  totalItems: order.list.totalItems,
  ids: order.list.ids,
  loading: order.ui.list.loading,
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {
  getOrders: getOrdersAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
