import React from 'react';
import { useTranslation } from 'react-i18next';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';
import CSList from './customerServiceList';

import './style.scss';

import { WEB_ROUTES } from 'configs';

const Orders = () => {
  const { t } = useTranslation();

  return (
    <Layout documentTitle={t(WEB_ROUTES.CS.title)} container fluid>
      <PageTitle title={t(WEB_ROUTES.CS.title)} className='mb-0 mr-3' />
      <CSList />
    </Layout>
  );
};

export default Orders;
