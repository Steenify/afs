import React from 'react';

import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';

import { WEB_ROUTES } from 'config';

import Detail from './customersDetail';

import './style.scss';

const CustomerDetail = () => {
  return (
    <Layout documentTitle={WEB_ROUTES.CUSTOMER_DETAIL.title} container fluid>
      <Breadcrumb data={[{ title: WEB_ROUTES.CUSTOMER_LIST.title, isBack: true }]} />
      <Detail />
    </Layout>
  );
};

export default CustomerDetail;
