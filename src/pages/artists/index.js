import React from 'react';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';
import ArtistList from './artistList';

import './style.scss';

import { WEB_ROUTES } from 'configs';

const Artists = () => {
  return (
    <Layout documentTitle={WEB_ROUTES.ARTISTS.title} container fluid>
      <PageTitle title={WEB_ROUTES.ARTISTS.title} className='mb-3 mr-3' />
      <ArtistList />
    </Layout>
  );
};

export default Artists;
