import React from 'react';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';
import OrderTable from 'components/tables/orders';

import { WEB_ROUTES } from 'configs';

const Orders = () => {
  return (
    <Layout className='order__container' documentTitle={WEB_ROUTES.ORDERS.title} container fluid>
      <PageTitle title={WEB_ROUTES.ORDERS.title} className='mb-0 mr-3' />
      <OrderTable />
    </Layout>
  );
};

export default Orders;
