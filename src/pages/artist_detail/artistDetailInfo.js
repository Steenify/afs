import React from 'react';
import { connect } from 'react-redux';

import P from 'components/common/parapraph';
import { ReactComponent as PencilIcon } from 'assets/img/pencil.svg';

import { formatMoney } from 'utils';
import { updateArtistDetailAction } from '../artists/actions';

const ArtistDetailInfo = (props) => {
  const { artist, updateArtistDetail } = props;

  const handleUpdateNote = (e) => {
    const { value } = e.target;

    updateArtistDetail({
      note: value,
    });
  };

  return (
    <div className='artist_detail__original artist_detail__box box'>
      <div className='box__header'>
        <div>
          <div className='box__title'>
            {artist?.firstName} {artist?.lastName}
          </div>
          <div>
            <span className='subText'>Speed:</span> 13, <span className='subText'>Quality:</span> 2, <span className='subText'>Attitude:</span> 2
          </div>
          <div>
            <span className='subText'>Doing:</span> 13, <span className='subText'>Review:</span> 2
          </div>
          <div>
            <span className='subText'>Processed:</span> 13 order(s)
          </div>
        </div>

        <div className='float-right'>
          <div className='subText'>Total Unpaid</div>
          <div className='box__title text-blue'>{formatMoney(artist?.totalUnpaid)}</div>
          <div className='subText'>Total Paid</div>
          <div className='box__title'>{formatMoney(artist?.totalPaid)}</div>
        </div>
      </div>
      <div className='box__body'>
        <div className='box__sub_title'>
          Artist Note <PencilIcon />
        </div>
        <textarea onChange={handleUpdateNote} value={artist?.note || ''} className='form-control' placeholder='Good Naruto, effect cool...' rows='4'></textarea>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updateArtistDetail: updateArtistDetailAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetailInfo);
