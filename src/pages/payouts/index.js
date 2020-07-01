import React from 'react';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';
import PayoutList from './payoutsList';

import './style.scss';

import { WEB_ROUTES } from 'config';

const Payouts = () => {
  return (
    <Layout documentTitle={WEB_ROUTES.PAYOUTS.title} container fluid>
      <PageTitle title={WEB_ROUTES.PAYOUTS.title} className='mb-0 mr-3' />
      <PayoutList />
    </Layout>
  );
};

export default Payouts;
