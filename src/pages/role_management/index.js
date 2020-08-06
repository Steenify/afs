import React from 'react';
import { useTranslation } from 'react-i18next';

import RoleList from './RoleList';
import RoleCreate from './RoleCreate';
import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';
import PageTitle from 'components/common/PageTitle';

import { WEB_ROUTES } from 'configs';

const RoleManagement = () => {
  const { t } = useTranslation();

  return (
    <Layout documentTitle={t(WEB_ROUTES.USER_ROLE.title)} container fluid>
      <Breadcrumb
        data={[
          {
            title: t(WEB_ROUTES.USER_ROLE.title),
            active: false,
            path: '/role',
          },
        ]}
      />
      <PageTitle title={t(WEB_ROUTES.USER_ROLE.title)} className='mb-0 mr-3'>
        <RoleCreate />
      </PageTitle>
      <RoleList />
    </Layout>
  );
};

export default RoleManagement;
