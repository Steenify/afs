import React from 'react';
import { useTranslation } from 'react-i18next';

import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';
import PageTitle from 'components/common/PageTitle';
import CustomerList from './CustomerList';
import CustomerCreate from './CustomerCreate';

import { WEB_ROUTES } from 'config';

const CustomerManagement = () => {
  const { t } = useTranslation();

  return (
    <Layout documentTitle={t(WEB_ROUTES.CUSTOMER_LIST.title)} container fluid>
      <Breadcrumb
        data={[
          {
            title: t(WEB_ROUTES.CUSTOMER_LIST.title),
            active: false,
            path: '/customer',
          },
        ]}
      />
      <PageTitle
        title={t(WEB_ROUTES.CUSTOMER_LIST.title)}
        className='mb-0 mr-3'>
        <CustomerCreate />
      </PageTitle>
      <CustomerList />
    </Layout>
  );
};

export default CustomerManagement;
