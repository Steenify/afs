import React from 'react';

import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';

import { WEB_ROUTES } from 'config';

import Detail from './customersDetail';

import './style.scss';
import { useTranslation } from 'react-i18next';

const CustomerDetail = () => {
  const { t } = useTranslation();
  return (
    <Layout documentTitle={t(WEB_ROUTES.CUSTOMER_DETAIL.title)} container fluid>
      <Breadcrumb data={[{ title: WEB_ROUTES.CUSTOMER_LIST.title, isBack: true }]} />
      <Detail />
    </Layout>
  );
};

export default CustomerDetail;
