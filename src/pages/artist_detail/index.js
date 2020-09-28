import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Layout from 'components/common/Layout';
import Breadcrumb from 'components/common/breadcrumb';

import { WEB_ROUTES } from 'configs';

import { getArtistDetailAction } from './actions';

import ArtistDetail from './artistDetail';

import './style.scss';

const ArtistDetailContainer = ({ getArtistDetail }) => {
  const { login } = useParams();

  useEffect(() => {
    getArtistDetail(login);
  }, [getArtistDetail, login]);

  return (
    <Layout documentTitle={WEB_ROUTES.ARTISTS_DETAIL.title} container fluid>
      <Breadcrumb data={[{ title: WEB_ROUTES.ARTISTS.title, isBack: true }]} />
      <ArtistDetail />
    </Layout>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  getArtistDetail: getArtistDetailAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetailContainer);
