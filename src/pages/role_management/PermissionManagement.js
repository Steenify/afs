import React from 'react';
import { useTranslation } from 'react-i18next';

import PermissionList from './PermissionList';
import PermissionCreate from './PermissionCreate';
import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';
import PageTitle from 'components/common/PageTitle';

import { WEB_ROUTES } from 'config';

const PermissionManagement = () => {
  const { t } = useTranslation();

  return (
    <Layout documentTitle={t(WEB_ROUTES.USER_PERMISSION.title)} container fluid>
      <Breadcrumb
        data={[
          {
            title: t(WEB_ROUTES.USER_PERMISSION.title),
            active: false,
            path: '/permission',
          },
        ]}
      />
      <PageTitle
        title={t(WEB_ROUTES.USER_PERMISSION.title)}
        className='mb-0 mr-3'>
        <PermissionCreate />
      </PageTitle>
      <PermissionList />
    </Layout>
  );
};

export default PermissionManagement;
