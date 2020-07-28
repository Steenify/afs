import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';
import Button from 'components/common/button';
import Breadcrumb from 'components/common/breadcrumb';

import { WEB_ROUTES } from 'config';

import ArtistDetailInfo from './artistDetailInfo';
import ArtistDetailContact from './artistDetailContact';
import { getArtistAction } from '../artists/actions';

import OrderListDesktop from 'pages/orders/OrderListDesktop';
import { getOrdersAction, updateOrderFiltersAcion, getOrderStatusAction } from 'pages/orders/actions';

const ArtistDetail = ({ getArtist, artist, getOrdersAction, updateOrderFiltersAcion, getOrderStatusAction }) => {
  const { login } = useParams();
  const history = useHistory();

  useEffect(() => {
    getArtist(login);
    getOrderStatusAction();
    updateOrderFiltersAcion({ assignee: login, page: 0, size: 100, sizeMobile: 100, sort: [{ id: 'number', desc: true }], text: '' });
    getOrdersAction();
  }, [getArtist, login, updateOrderFiltersAcion, getOrdersAction, getOrderStatusAction]);

  const goToEdit = () => {
    const url = WEB_ROUTES.ARTISTS_DETAIL_FORM.path.replace(':login', artist.login);
    history.push(url);
  };

  return (
    <Layout documentTitle={WEB_ROUTES.ARTISTS_DETAIL.title} container fluid>
      <Breadcrumb data={[{ title: WEB_ROUTES.ARTISTS.title, isBack: true }]} />
      <div className='artist_detail'>
        <PageTitle title={`${artist.firstName || ''} ${artist.lastName || ''}`} className='artist_detail__header'>
          <div className='ml-auto'>
            <Button color='primary' onClick={goToEdit} className='btn-create'>
              Edit
            </Button>
          </div>
        </PageTitle>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='artist_detail__wrapper'>
              <ArtistDetailInfo artist={artist} />
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='artist_detail__wrapper'>
              <ArtistDetailContact artist={artist} />
            </div>
          </div>
        </div>
        <div>
          <OrderListDesktop />
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = ({ artists }) => ({
  artist: artists.artist,
});

const mapDispatchToProps = {
  getArtist: getArtistAction,
  getOrdersAction,
  updateOrderFiltersAcion,
  getOrderStatusAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetail);
