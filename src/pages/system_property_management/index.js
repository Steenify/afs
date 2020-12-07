import React from 'react';
import { useTranslation } from 'react-i18next';

import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';
import PageTitle from 'components/common/PageTitle';
import SystemPropertyList from './SystemPropertyList';

import './style.scss';

import { WEB_ROUTES } from 'configs';

const SystemPropertiesManagement = () => {
  const { t } = useTranslation();

  return (
    <Layout documentTitle={t(WEB_ROUTES.SYSTEM_PROPERTY_LIST.title)} container fluid>
      <Breadcrumb
        data={[
          {
            title: t(WEB_ROUTES.SYSTEM_PROPERTY_LIST.title),
            active: false,
            path: WEB_ROUTES.SYSTEM_PROPERTY_LIST.path,
          },
        ]}
      />
      <PageTitle title={t(WEB_ROUTES.SYSTEM_PROPERTY_LIST.title)} className='mb-0 mr-3'></PageTitle>
      <SystemPropertyList />
    </Layout>
  );
};

export default SystemPropertiesManagement;
