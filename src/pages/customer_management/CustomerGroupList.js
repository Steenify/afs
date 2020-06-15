import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner, UncontrolledAlert } from 'reactstrap';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import Button from 'components/common/button';
import DataTable from 'components/common/DataTable';

import { actGetCustomerGroups, actDeleteCustomerGroup } from './actions';

const CustomerList = (props) => {
  const { t } = useTranslation();

  const columns = [
    {
      accessor: 'name',
      Header: t('baseApp.customerGroup.name'),
      width: 'auto',
    },
    {
      accessor: 'description',
      Header: t('baseApp.customerGroup.description'),
      width: 'auto',
    },
    {
      accessor: 'edit',
      Header: '',
      Cell: ({ row: { original } }) => (
        <Button
          tag={Link}
          to={`/customer-group/detail/${original.id}`}
          color='primary'>
          {t('entity.action.edit')}
        </Button>
      ),
      width: 68,
    },
    {
      accessor: 'delete',
      Header: '',
      Cell: ({ row: { original } }) => (
        <Button color='danger' onClick={() => handleDelete(original.id)}>
          {t('entity.action.delete')}
        </Button>
      ),
      width: 68,
    },
  ];

  useEffect(() => {
    props.actGetCustomerGroups();
  }, []);

  const handleDelete = (id) => {
    if (id) {
      props.actDeleteCustomerGroup(id).then((res) => {
        if (res && res.status === 204) {
          props.actGetCustomerGroups();
        }
      });
    }
  };

  const { customerGroups = [], ui, error } = props;

  if (ui && ui.loading) {
    return (
      <div className='d-flex py-1 align-items-center justify-content-center'>
        <Spinner style={{ width: '3rem', height: '3rem' }} />
      </div>
    );
  }

  if (!_.isEmpty(error) && error.message) {
    return (
      <UncontrolledAlert color='danger'>{error.message}</UncontrolledAlert>
    );
  }

  return (
    <div className='role-list'>
      <DataTable
        data={customerGroups}
        columns={columns}
        className='bg-white'
        whiteListSort={['delete']}
      />
    </div>
  );
};

const mapStateToProps = ({ customer }) => ({
  customerGroups: customer.data.customerGroups,
});

export default connect(mapStateToProps, {
  actGetCustomerGroups,
  actDeleteCustomerGroup,
})(CustomerList);
