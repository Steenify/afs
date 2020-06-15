import React from 'react';
import { useTranslation } from 'react-i18next';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';
import ArtistList from './artistList';

import './style.scss';

import { WEB_ROUTES } from 'config';

const Orders = () => {
  const { t } = useTranslation();

  return (
    <Layout documentTitle={t(WEB_ROUTES.ARTISTS.title)} container fluid>
      <PageTitle title={t(WEB_ROUTES.ARTISTS.title)} className='mb-0 mr-3' />
      <ArtistList />
    </Layout>
  );
};

export default Orders;
