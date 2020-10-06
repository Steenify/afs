import React from 'react';
import { connect } from 'react-redux';

import P from 'components/common/parapraph';
import Button from 'components/common/button';

const ArtistDetailContact = (props) => {
  const { artist, setUpdating } = props;

  return (
    <div className='artist_detail__contact artist_detail__box box'>
      <div className='box__header'>
        <div className='box__title'>Contact Info</div>
        <div className='actions'>
          <Button onClick={() => setUpdating(true)} color='primary' className='btn-create mb-2'>
            Edit
          </Button>
        </div>
      </div>
      <div className='box__body'>
        <div className='mb-4'>
          {artist?.email && <p className='mb-1'>Email: {artist?.email}</p>}
          {artist?.phoneNumber && (
            <p className='mb-1'>
              Phone Number:{artist?.phonePrefix} {artist?.phoneNumber}
            </p>
          )}
          {artist?.fbUrl && (
            <p className='mb-1'>
              Facebook:
              <a target='_blank' rel='noopener noreferrer' href={`${artist?.fbUrl}`}>
                Link
              </a>
            </p>
          )}
          {artist?.igUrl && (
            <p className='mb-1'>
              Instagram:
              <a target='_blank' rel='noopener noreferrer' href={`${artist?.igUrl}`}>
                Link
              </a>
            </p>
          )}
          {artist?.igUrl && <p className='mb-1'>Facebook UID: {artist?.uid}</p>}
          {artist?.country && (
            <p className='mb-1'>
              Country: {artist?.country} {artist?.countryCode ? `- ${artist?.countryCode}` : ''}
            </p>
          )}
        </div>
        <div className='box__sub_title mb-2 mt-4'>Payment Info:</div>
        <div className='subText mb-4'>
          <P text={artist?.paymentInfo || 'N/A'} id='ArtistPayBox' />
        </div>
        {artist?.paymentMethods?.map?.((payment) => (
          <div key={`artist_payment_method_${payment.id}`}>
            <span className='subText mr-2'>{payment?.serviceName}:</span>
            <span className='box__link'>{payment.type === 'BANKING' ? payment.number : payment.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ artistDetail }) => ({
  artist: artistDetail.data.artist,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetailContact);
