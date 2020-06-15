import React from 'react';
import { useTranslation } from 'react-i18next';

import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';
import PageTitle from 'components/common/PageTitle';
import OrderList from './OrderList';

import './style.scss';

import { WEB_ROUTES } from 'config';

const Orders = () => {
  const { t } = useTranslation();

  return (
    <Layout documentTitle={t(WEB_ROUTES.ORDERS.title)} container fluid>
      <Breadcrumb
        data={[
          {
            title: t('baseApp.orderManagement.home.title'),
            active: false,
            path: WEB_ROUTES.ORDERS.path,
          },
        ]}
      />
      <PageTitle title={t(WEB_ROUTES.ORDERS.title)} className='mb-0 mr-3' />
      <OrderList />
    </Layout>
  );
};

export default Orders;
