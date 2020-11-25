import React from 'react';
import { useTranslation } from 'react-i18next';

import CustomerGroupList from './CustomerGroupList';
import CustomerGroupCreate from './CustomerGroupCreate';
import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';
import PageTitle from 'components/common/PageTitle';

import { WEB_ROUTES } from 'configs';

const CustomerGroupManagement = () => {
  return (
    <Layout documentTitle={WEB_ROUTES.CUSTOMER_GROUP_LIST.title} container fluid>
      <Breadcrumb
        data={[
          {
            title: WEB_ROUTES.CUSTOMER_GROUP_LIST.title,
            active: false,
            path: '/customer-group',
          },
        ]}
      />
      <PageTitle title={WEB_ROUTES.CUSTOMER_GROUP_LIST.title} className='mb-0 mr-3'>
        <CustomerGroupCreate />
      </PageTitle>
      <CustomerGroupList />
    </Layout>
  );
};

export default CustomerGroupManagement;
