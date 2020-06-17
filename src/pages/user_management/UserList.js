import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
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
    { accessor: 'login', Header: 'Login' },
    {
      accessor: 'firstName',
      Header: t('baseApp.userManagement.firstName'),
      minWidth: 120,
    },
    {
      accessor: 'lastName',
      minWidth: 120,
      Header: t('baseApp.userManagement.lastName'),
    },
    { accessor: 'email', Header: t('baseApp.userManagement.email') },
    {
      accessor: 'authorities',
      Header: 'Roles',
      Cell: ({ row: { original } }) => {
        return `${original.authorities.join(',')}`;
      },
    },
    {
      accessor: 'createdDate',
      minWidth: 150,
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

  const goToDetail = (login) => {
    if (login) {
      history.push(`/user/detail/${login}`);
    }
  };

  const listNoActionHeader = ['Login'];

  const getCellProps = ({ column, row }) => {
    const { original } = row;

    if (listNoActionHeader.indexOf(column?.Header) !== -1) {
      return {
        onClick: () => goToDetail(original?.login),
      };
    }
    return {};
  };

  return (
    <div>
      <UserSearchBox onSearch={handleSearch} style={{ marginTop: 15 }} />
      <DataTable
        data={users}
        columns={columns}
        className='bg-white'
        getCellProps={getCellProps}
        serverSide
        sortBy={[{ id: 'createdDate', desc: true }]}
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
