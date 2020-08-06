import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Layout from 'components/common/Layout';
import PageTitle from 'components/common/PageTitle';
import Button from 'components/common/button';
import Breadcrumb from 'components/common/breadcrumb';

import { WEB_ROUTES } from 'configs';

import ArtistDetailInfo from './artistDetailInfo';
import ArtistDetailContact from './artistDetailContact';

import OrderTable from 'components/tables/orders';

import { getArtistAction } from '../artists/actions';

const reducerName = 'artistDetail';

const ArtistDetail = ({ getArtist, artist }) => {
  const { login } = useParams();
  const history = useHistory();

  useEffect(() => {
    getArtist(login);
  }, [getArtist, login]);

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
          <OrderTable reducer={reducerName} showFilter={false} filter={{ assignee: login }} />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetail);
