import React from 'react';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';
import UserList from './UserList';
import UserCreate from './UserCreate';

import './style.scss';

import { WEB_ROUTES } from 'configs';

const UserManagement = () => {
  return (
    <Layout documentTitle={WEB_ROUTES.USER_LIST.title} container fluid>
      <PageTitle title={WEB_ROUTES.USER_LIST.title} className='mb-0' containerClassName='mb-3'>
        <UserCreate containerClassName='ml-auto' />
      </PageTitle>
      <UserList />
    </Layout>
  );
};

export default UserManagement;
