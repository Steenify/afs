import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import PageTitle from 'components/common/PageTitle';

import ArtistDetailInfo from './artistDetailInfo';
import ArtistDetailContact from './artistDetailContact';

import OrderTable from 'components/tables/orders';

const reducerName = 'artistDetail';

const ArtistDetail = ({ artist }) => {
  if (isEmpty(artist)) {
    return null;
  }

  return (
    <div className='artist_detail'>
      <PageTitle title={`${artist?.firstName || ''} ${artist?.lastName || ''}`} className='artist_detail__header'></PageTitle>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='artist_detail__wrapper'>
            <ArtistDetailInfo />
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='artist_detail__wrapper'>
            <ArtistDetailContact />
          </div>
        </div>
      </div>
      <div>
        <OrderTable reducer={reducerName} showFilter={false} filter={{ assignee: artist?.login }} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ artistDetail }) => ({
  artist: artistDetail.data.artist,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetail);
