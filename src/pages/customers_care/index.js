import React from 'react';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';
import ReminderList from './reminderList';

import '../customers/style.scss';

import { WEB_ROUTES } from 'configs';

const CustomersCare = () => {
  return (
    <Layout documentTitle={WEB_ROUTES.CUSTOMERS_CARE.title} container fluid>
      <PageTitle title={WEB_ROUTES.CUSTOMERS_CARE.title} className='mb-0' containerClassName='mb-3' />
      <ReminderList />
    </Layout>
  );
};

export default CustomersCare;
