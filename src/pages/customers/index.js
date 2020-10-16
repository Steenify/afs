import React from 'react';
import { useTranslation } from 'react-i18next';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';
import CustomerList from './customersList';
import CustomerCreate from './customersCreate';
import CustomerTagsModal from './customerTagsModal';

import './style.scss';

import { WEB_ROUTES } from 'configs';

const CustomerManagement = () => {
  const { t } = useTranslation();

  return (
    <Layout documentTitle={t(WEB_ROUTES.CUSTOMER_LIST.title)} container fluid>
      <PageTitle title={t(WEB_ROUTES.CUSTOMER_LIST.title)} className='mb-0' containerClassName='mb-3'>
        <CustomerCreate containerClassName='ml-auto' />
      </PageTitle>
      <CustomerList />
      <CustomerTagsModal />
    </Layout>
  );
};

export default CustomerManagement;
