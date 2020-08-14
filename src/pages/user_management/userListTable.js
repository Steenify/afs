import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import TableBody from 'components/common/tableBody';
import TableHeader from 'components/common/tableHeader';

import UserSelectedAll from './headers/userSelectedAll';
import UserSelectedCell from './cells/userSelectedCell';
import UserLoginCell from './cells/userLoginCell';
import UserFullNameCell from './cells/userFullNameCell';
import UserEmailCell from './cells/userEmailCell';
import UserRoleCell from './cells/userRoleCell';
import UserCreatedDate from './cells/userCreatedDateCell';
import UserStatusCell from './cells/userStatusCell';

const UserListTable = (props) => {
  const { t } = useTranslation();
  const { loading, ids } = props;
  const columns = [
    {
      accessor: 'selected',
      minWidth: 40,
      Cell: UserSelectedCell,
      Header: UserSelectedAll,
    },
    {
      accessor: 'login',
      minWidth: 200,
      Cell: UserLoginCell,
      Header: 'Login',
    },
    {
      accessor: 'fullName',
      minWidth: 120,
      Cell: UserFullNameCell,
      Header: t('baseApp.userManagement.name'),
    },
    {
      accessor: 'email',
      minWidth: 120,
      Cell: UserEmailCell,
      Header: t('baseApp.userManagement.email'),
    },
    {
      accessor: 'authorities',
      Cell: UserRoleCell,
      Header: 'Roles',
    },
    {
      accessor: 'createdDate',
      minWidth: 150,
      Cell: UserCreatedDate,
      Header: t('baseApp.userManagement.createdDate'),
    },
    {
      accessor: 'status',
      Cell: UserStatusCell,
      Header: t('baseApp.userManagement.status'),
    },
  ];
  return (
    <div className={`payouts__list relative`}>
      <div className={`payouts__loading ${!loading && 'd-none'}`}>
        <Spinner /> <span className='text'>Loading</span>
      </div>
      <div className='table-responsive bg-light steenify-table bg-white payout__table'>
        <table className='table'>
          <TableHeader columns={columns} />
          <TableBody data={ids} columns={columns} />
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  ids: user.list.ids,
  loading: user.ui.list.loading,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserListTable));
