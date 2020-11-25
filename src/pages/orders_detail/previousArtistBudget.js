import React from 'react';
import { formatMoney } from 'utils';
const PreviousArtistBudget = ({ item = {} }) => {
  return (
    <div className='order_detail__previousArtistBudget'>
      <div className='previous-artist-row'>
        <span className='label text-gray'>Previous Artist:</span>
        <strong className='value text-gray'>{item?.artist?.fullName}</strong>
      </div>
      <div className='previous-artist-row'>
        <span className='label text-gray'>Budget:</span>
        <strong className='value text-gray'>{formatMoney(item?.budget)}</strong>
      </div>
    </div>
  );
};

export default PreviousArtistBudget;
