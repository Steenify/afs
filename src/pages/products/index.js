import React from 'react';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';

import { WEB_ROUTES } from 'configs';
import { useTranslation } from 'react-i18next';

import ProductList from './productList';

const Products = () => {
  const { t } = useTranslation();
  return (
    <Layout className='order__container' documentTitle={t(WEB_ROUTES.PRODUCTS.title)} container fluid>
      <PageTitle title={WEB_ROUTES.PRODUCTS.title} className='mb-3 mr-3'></PageTitle>
      <ProductList />
    </Layout>
  );
};

export default Products;
