import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';

import { remove } from 'lodash';
import { useTranslation } from 'react-i18next';

import DataTable from 'components/common/DataTable';
import InPageLoading from 'components/common/inPageLoading';
import { PERMITTIONS_CONFIG } from 'config';

import {
  getPaginationItemsNumber,
  getSelectedStatus,
  dateTimeToDeadline,
  formatNumber,
} from 'utils';

import {
  getOrdersAction,
  updateOrdersBudgetAction,
  updateOrderAcion,
  getArtistsAction,
  updateOrdersArtistAction,
  updateOrderPaymentStatusAction,
} from './actions';

import orderBudgetCell from './orderBugetCell';
import AssignArtistCell from './assignArtistCell';
import OrderDetailCell from './orderDetailCell';
import OrderFilters from './orderFilters';
import OrderCustomerCell from './orderCustomerCell';
import OrderPaymentCell from './orderPaymentCell';
import OrderBulkAction from './orderBulkAction';
import OrderSelectedCell from './orderSelectedCell';
import OrderSelectedAll from './orderSelectedAll';

const listNoActionHeader = [
  'Created Date',
  'Deadline',
  'Price',
  'Status',
  'Payment',
];

const OrderList = (props) => {
  const { t } = useTranslation();
  const {
    getOrders,
    orders = [],
    updateOrderBudget,
    updateOrder,
    getArtists,
    loading,
    updateOrdersArtist,
    status,
    accountInfo,
    updateOrderPaymentStatus,
  } = props;

  const history = useHistory();

  const canAssignOrder = accountInfo?.permissions?.includes(
    PERMITTIONS_CONFIG.ASSIGN_BOOKING,
  );
  useEffect(() => {
    if (canAssignOrder) {
      getArtists();
    }
  }, [getArtists, canAssignOrder]);

  const handleUpdate = (index, key, value, original) => {
    updateOrder({
      index,
      key,
      value,
    });
    if (key === 'assignedTo') {
      const payload = { id: original.id, to: value.login };
      updateOrdersArtist(payload);
    }
    if (key === 'budget') {
      const payload = {
        id: original.id,
        budget: value,
      };
      updateOrderBudget(payload, original.id, () => {
        toast.success('Budget updated!');
      });
    }

    if (key === 'artistPaymentStatus') {
      const payload = {
        status: value,
      };
      updateOrderPaymentStatus(payload, original.id);
    }
  };

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
      Cell: ({ row: { original } }) =>
        (original.paidAt && dateTimeToDeadline(original.paidAt)) || '',
    },
    {
      accessor: 'deadline',
      minWidth: 100,
      Header: 'Deadline',
      Cell: ({ row: { original } }) =>
        (original.deadline && dateTimeToDeadline(original.deadline)) || '',
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
      Cell: ({ row: { original } }) =>
        original?.subtotal ? `${formatNumber(original.subtotal)}$` : '',
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
      minWidth: 170,
      Header: 'Status',
      Cell: ({ row: { original } }) => (
        <div>
          <span
            className={`order__status ${
              getSelectedStatus(original.status, status).name
            }`}>
            {getSelectedStatus(original.status, status).friendlyName}
          </span>
        </div>
      ),
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

  const getCellProps = ({ column, row }) => {
    const { original } = row;
    if (listNoActionHeader.indexOf(column?.Header) !== -1) {
      return {
        onClick: () => goToDetail(original?.code),
      };
    }
    return {};
  };

  const getTrProps = (tr, row) => {
    const { original } = row;
    const now = new Date().getTime();
    const deadline = new Date(original.deadline).getTime();
    const isLated = now > deadline || false;
    const isNotDone = original.status !== 'DONE';
    return {
      ...tr,
      className: `${isLated && isNotDone ? 'lated' : ''} ${
        !isNotDone && 'DONE'
      }`,
    };
  };

  return (
    <div>
      <OrderFilters
        onSearch={handleLoad}
        query={{ sortBy: [{ id: 'number', desc: true }] }}
      />

      <div className='order__wrapper relative'>
        {isCanPay && <OrderBulkAction updateOrder={updateOrder} />}

        <DataTable
          data={orders}
          columns={columns}
          className='bg-white'
          serverSide
          totalPage={(size) => getPaginationItemsNumber(props.totalItems, size)}
          onLoad={handleLoad}
          updateCell={handleUpdate}
          sortBy={[{ id: 'number', desc: true }]}
          getCellProps={getCellProps}
          getTrProps={getTrProps}
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

      <InPageLoading isLoading={loading} />
    </div>
  );
};

const mapStateToProps = ({ order, auth }) => ({
  totalItems: order.list.totalItems,
  orders: order.list.orders,
  loading: order.ui.list.loading,
  status: order.status,
  accountInfo: auth.data.accountInfo,
});

const mapDispatchToProps = {
  getOrders: getOrdersAction,
  updateOrderBudget: updateOrdersBudgetAction,
  updateOrder: updateOrderAcion,
  getArtists: getArtistsAction,
  updateOrdersArtist: updateOrdersArtistAction,
  updateOrderPaymentStatus: updateOrderPaymentStatusAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
