import React from 'react';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';
import OrderList from './OrderList';

import './style.scss';

import { WEB_ROUTES } from 'config';
import { useTranslation } from 'react-i18next';

const Orders = () => {
  const { t } = useTranslation();
  return (
    <Layout className='order__container' documentTitle={t(WEB_ROUTES.ORDERS.title)} container fluid>
      <PageTitle title={WEB_ROUTES.ORDERS.title} className='mb-0 mr-3' />
      <OrderList />
    </Layout>
  );
};

export default Orders;
