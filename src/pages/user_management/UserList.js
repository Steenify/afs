import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Badge } from 'reactstrap';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import Button from 'components/common/button';
import DataTable from 'components/common/DataTable';
import UserSearchBox from './UserSearchBox';
import moment from 'moment';

import { getPaginationItemsNumber } from 'utils';

import { actGetUsers, actUpdateUser, actUpdateSortUser } from './actions';

const UserList = (props) => {
  const { t } = useTranslation();

  const { users = [], userSearchBox = {}, sortColumns } = props;

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
    { accessor: 'login', Header: t('baseApp.userManagement.login') },
    {
      accessor: 'firstName',
      Header: t('baseApp.userManagement.firstName'),
    },
    {
      accessor: 'lastName',
      Header: t('baseApp.userManagement.lastName'),
    },
    { accessor: 'email', Header: t('baseApp.userManagement.email') },
    {
      accessor: 'createdDate',
      Header: t('baseApp.userManagement.createdDate'),
      Cell: ({ row: { original } }) =>
        original.createdDate &&
        moment(original.createdDate).format('DD/MM/YYYY HH:mm'),
    },
    {
      accessor: 'status',
      Header: t('baseApp.userManagement.status'),
      Cell: ({ row: { original } }) => (
        <button
          onClick={() => handleStatus(original)}
          style={{ background: 'none', border: 'none' }}>
          {original.activated ? (
            <Badge color='success' pill>
              {t('baseApp.userManagement.activated')}
            </Badge>
          ) : (
            <Badge color='danger' pill>
              {t('baseApp.userManagement.deactivated')}
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
          to={`/user/detail/${original.login}`}
          color='primary'>
          {t('entity.action.edit')}
        </Button>
      ),
      width: 68,
    },
  ];

  const handleLoad = ({ page, size, sortBy }) => {
    const params = {
      ...userSearchBox,
      page,
      size,
      sort: sortBy,
    };

    props.actUpdateSortUser(sortBy);
    props.actGetUsers(params);
  };

  const handleStatus = (user) => {
    const params = { ...user };
    params['activated'] = !user.activated;
    props.actUpdateUser(params);
  };

  const handleSearch = (values) => {
    const params = { ...values };

    if (sortColumns && sortColumns.length) {
      params['sort'] = sortColumns;
    }

    props.actGetUsers(params);
  };

  return (
    <div>
      <UserSearchBox onSearch={handleSearch} style={{ marginTop: 15 }} />
      <DataTable
        data={users}
        columns={columns}
        className='bg-white'
        serverSide
        totalPage={(size) => getPaginationItemsNumber(props.totalItems, size)}
        onLoad={handleLoad}
      />
    </div>
  );
};

const mapStateToProps = ({ user, form }) => ({
  users: user.data.users,
  totalItems: user.data.totalItems,
  ui: user.ui.list,
  error: user.error,
  userSearchBox: form.userSearchBox,
  sortColumns: user.data.sortColumns,
});

export default connect(mapStateToProps, {
  actGetUsers,
  actUpdateUser,
  actUpdateSortUser,
})(UserList);
