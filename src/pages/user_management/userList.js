import React from 'react';
import { connect } from 'react-redux';

import UserFilters from './userFilters';
import UserListTable from './userListTable';
import UserPaging from './userPaging';

const UserList = () => {
  return (
    <div className='user__page'>
      <div className='user__header box'>
        <UserFilters />
      </div>
      <div className='user__body'>
        <UserListTable />
      </div>
      <div className='user__paging'>
        <UserPaging />
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {})(UserList);
