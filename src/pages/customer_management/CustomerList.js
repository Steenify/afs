import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import Button from 'components/common/button';
import DataTable from 'components/common/DataTable';
import CustomerSearchBox from './CustomerSearchBox';

import { getPaginationItemsNumber } from 'utils';

import {
  actGetCustomers,
  actUpdateCustomer,
  actUpdateSortCustomer,
} from './actions';

const CustomerList = (props) => {
  const { customerSearchBox = {}, sortColumns } = props;
  const { t } = useTranslation();

  const columns = [
    {
      Header: '#',
      id: 'row',
      maxWidth: 50,
      filterable: false,
      Cell: ({ row: { index }, state: { pageSize, pageIndex } }) => {
        const step = pageIndex * 10;
        return index + 1 + step;
      },
    },
    { accessor: 'login', Header: t('baseApp.customerManagement.login') },
    {
      accessor: 'firstName',
      Header: t('baseApp.customerManagement.firstName'),
    },
    { accessor: 'lastName', Header: t('baseApp.customerManagement.lastName') },
    { accessor: 'email', Header: t('baseApp.customerManagement.email') },
    {
      accessor: 'createdDate',
      Header: t('baseApp.customerManagement.createdDate'),
    },
    {
      accessor: 'status',
      Header: t('baseApp.customerManagement.status'),
      Cell: ({ row: { original } }) => (
        <button
          onClick={() => handleStatus(original)}
          style={{ background: 'none', border: 'none' }}>
          {original.activated ? (
            <Badge color='success' pill>
              {t('baseApp.customerManagement.activated')}
            </Badge>
          ) : (
            <Badge color='danger' pill>
              {t('baseApp.customerManagement.createdDate')}
            </Badge>
          )}
        </button>
      ),
    },
    {
      accessor: 'edit',
      Header: '',
      Cell: ({ row: { original } }) => (
        <Button
          tag={Link}
          to={`/customer/detail/${original.login}`}
          color='primary'>
          {t('entity.action.edit')}
        </Button>
      ),
      width: 68,
    },
  ];

  useEffect(() => {
    props.actGetCustomers();
  }, []);

  const handleLoad = ({ page, size, sortBy }) => {
    const params = {
      ...customerSearchBox,
      page,
      size,
      sort: sortBy,
    };

    props.actUpdateSortCustomer(sortBy);
    props.actGetCustomers(params);
  };

  const handleStatus = (customer) => {
    const params = { ...customer };
    params['activated'] = !customer.activated;
    props.actUpdateCustomer(params);
  };

  const handleSearch = (values) => {
    const params = { ...values };

    if (sortColumns && sortColumns.length) {
      params['sort'] = sortColumns;
    }

    props.actGetCustomers(params);
  };

  const { customers = [], ui, error } = props;

  return (
    <div>
      <CustomerSearchBox onSearch={handleSearch} style={{ marginTop: 15 }} />
      <DataTable
        data={customers}
        columns={columns}
        className='bg-white'
        serverSide
        totalPage={(size) => getPaginationItemsNumber(props.totalItems, size)}
        onLoad={handleLoad}
      />
    </div>
  );
};

const mapStateToProps = ({ customer, form }) => ({
  customers: customer.data.customers,
  totalItems: customer.data.totalItems,
  ui: customer.ui.list,
  error: customer.error.list,
  customerSearchBox: form.customerSearchBox,
  sortColumns: customer.data.sortColumns,
});

export default connect(mapStateToProps, {
  actGetCustomers,
  actUpdateCustomer,
  actUpdateSortCustomer,
})(CustomerList);
