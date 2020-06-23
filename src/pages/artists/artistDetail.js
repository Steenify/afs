import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Layout from 'components/common/Layout';
import Button from 'components/common/button';

import { WEB_ROUTES } from 'config';
import { formatMoney } from 'utils';

import { ReactComponent as ArrowLeftIcon } from 'assets/img/arrowleft.svg';

import { getArtistAction, updateArtistDetailAction } from './actions';

const ArtistDetail = ({ getArtist, artist, updateArtistDetail }) => {
  const { login } = useParams();

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getArtist(login);
  }, [getArtist, login]);

  const handleUpdateNote = (e) => {
    const { value } = e.target;

    updateArtistDetail({
      note: value,
    });
  };

  return (
    <Layout documentTitle={WEB_ROUTES.ARTISTS_DETAIL.title} container fluid>
      <div className='d-flex mt-2 mb-3'>
        <Button
          className='artists__back'
          tag={Link}
          color='link'
          to={WEB_ROUTES.ARTISTS.path}
          replace>
          <ArrowLeftIcon />
          &nbsp; &nbsp;
          <span className='d-none d-md-inline'>{WEB_ROUTES.ARTISTS.title}</span>
        </Button>
      </div>

      <div className='artists__title'>{`${artist?.firstName} ${artist?.lastName}`}</div>
      <div className='artists__box box'>
        <div className='info'>
          <div className='row'>
            <div className='col-md-2'>
              <div className='info__item'>
                <div className='info__title'>Status</div>
                <div className='info__body'>
                  <div>Progress: {artist?.totalInProgress} orders</div>
                  <div>Processed: {artist?.totalDone} orders</div>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='info__item'>
                <div className='info__title'>CONTACT</div>

                <div className='info__body'>
                  {artist?.email && (
                    <p className='mb-1'>
                      Email: &nbsp;
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={`${artist?.email}`}>
                        {artist?.email}
                      </a>
                    </p>
                  )}

                  {artist?.fbUrl && (
                    <p className='mb-1'>
                      Facebook: &nbsp;
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={`${artist?.fbUrl}`}>
                        {artist?.fbUrl}
                      </a>
                    </p>
                  )}
                  {artist?.igUrl && (
                    <p className='mb-1'>
                      Instagram: &nbsp;
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={`${artist?.igUrl}`}>
                        {artist?.igUrl}
                      </a>
                    </p>
                  )}
                  {artist?.phoneNumber && (
                    <p className='mb-1'>
                      Instagram: &nbsp;
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={`tel:${artist?.phonePrefix}${artist?.phoneNumber}`}>
                        {artist?.phonePrefix}
                        {artist?.phoneNumber}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='info__item'>
                <div className='info__title'>Artist Note</div>
                <div className='info__body'>
                  <textarea
                    onChange={handleUpdateNote}
                    value={artist?.note || ''}
                    className='form-control'
                    placeholder='Good Naruto, effect cool...'
                    rows='4'></textarea>
                </div>
              </div>
            </div>
            <div className='col-md-2'>
              <div className='info__item text-right'>
                <div className='text-muted mb-2'> Total spent to date</div>
                <div className='info__title'>
                  {formatMoney(artist?.totalPaid || 0)}
                </div>
              </div>
            </div>
          </div>
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
  updateArtistDetail: updateArtistDetailAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetail);
