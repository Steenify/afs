import React from 'react';
import { useTranslation } from 'react-i18next';

import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';
import PageTitle from 'components/common/PageTitle';
import UserList from './UserList';
import UserCreate from './UserCreate';

import './style.scss';

import { WEB_ROUTES } from 'config';

const UserManagement = () => {
  const { t } = useTranslation();

  return (
    <Layout documentTitle={t(WEB_ROUTES.USER_LIST.title)} container fluid>
      <Breadcrumb
        data={[
          {
            title: t('baseApp.userManagement.home.title'),
            active: false,
            path: WEB_ROUTES.USER_LIST.path,
          },
        ]}
      />
      <PageTitle title={t(WEB_ROUTES.USER_LIST.title)} className='mb-0 mr-3'>
        <UserCreate />
      </PageTitle>
      <UserList />
    </Layout>
  );
};

export default UserManagement;
