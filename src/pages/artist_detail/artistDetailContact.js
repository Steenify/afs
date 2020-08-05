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
            {artist?.email && <p className='mb-1'>Email: {artist?.email}</p>}
            {artist?.phoneNumber && <p className='mb-1'>Phone: {artist?.phoneNumber}</p>}
            {artist?.fbChat && (
              <p className='mb-1'>
                Facebook Chat: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${artist?.fbChat}`}>
                  Link
                </a>
              </p>
            )}
            {artist?.mailChain && (
              <p className='mb-1'>
                Mail Chain: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${artist?.mailChain}`}>
                  Link
                </a>
              </p>
            )}
            {artist?.fbUrl && (
              <p className='mb-1'>
                Facebook: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${artist?.fbUrl}`}>
                  Link
                </a>
              </p>
            )}
            {artist?.igUrl && (
              <p className='mb-1'>
                Instagram: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${artist?.igUrl}`}>
                  Link
                </a>
              </p>
            )}
            {artist?.snapChatUrl && (
              <p className='mb-1'>
                SnapChat: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${artist?.snapChatUrl}`}>
                  Link
                </a>
              </p>
            )}
            {artist?.linkedUrl && (
              <p className='mb-1'>
                LinkedIn: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${artist?.linkedUrl}`}>
                  Link
                </a>
              </p>
            )}
            {artist?.twitterUrl && (
              <p className='mb-1'>
                Twitter: &nbsp;
                <a target='_blank' rel='noopener noreferrer' href={`${artist?.twitterUrl}`}>
                  Link
                </a>
              </p>
            )}
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
