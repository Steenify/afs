import React from 'react';

const ArtistDetailContact = (props) => {
  const { artist } = props;
  return (
    <div className='artist_detail__contact artist_detail__box box'>
      <div className='box__header'>
        <div className='box__title'>Contact Info</div>
      </div>
      <div className='box__body'>
        <div className='row mb-4'>
          <div className='col-6'>
            <div className='box__link'>{artist?.email}</div>
            <div className='box__link'>{artist?.fbUrl}</div>
            <div className='box__link'>{artist?.igUrl}</div>
            <div className='box__link'>{artist?.snapChatUrl}</div>
            <div className='box__link'>{artist?.linkedUrl}</div>
            <div className='box__link'>{artist?.twitterUrl}</div>
            <div className=''>
              {artist?.phonePrefix} {artist?.phoneNumber}
            </div>
          </div>
          <div className='col-6'>
            <div>{artist?.artistExtension?.address1}</div>
            <div>
              {artist?.artistExtension?.city} {artist?.artistExtension?.provinceCode} {artist?.artistExtension?.zip}
            </div>
            <div>{artist?.artistExtension?.country}</div>
          </div>
        </div>
        <div className='box__sub_title mb-2 mt-4'>Payment Info</div>
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

export default ArtistDetailContact;
