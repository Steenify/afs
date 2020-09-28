import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as PencilIcon } from 'assets/img/pencil.svg';
import P from 'components/common/parapraph';
import Button from 'components/common/button';

import { formatMoney } from 'utils';
import { updateArtistDetailApiAction, updateArtistDetailAction } from '../artists/actions';

const ArtistDetailInfo = (props) => {
  const { artist, setUpdating } = props;

  const doingCount = artist?.numSketch + artist?.numSketchEdit + artist?.numColor + artist?.numColorEdit || 0;
  const reviewCount = artist?.numSketchReview + artist?.numColorReview + artist?.numExportFile || 0;

  return (
    <div className='artist_detail__original artist_detail__box box'>
      <div className='box__header align-items-start'>
        <div>
          <div className='box__title'>
            {artist?.firstName} {artist?.lastName}
          </div>
          <div className='subText'>
            Speed: <span className='text-black'>{artist?.workingSpeedScore || 0}</span>, Quality: <span className='text-black'>{artist?.productQualityScore || 0}</span>, Attitude:
            <span className='text-black'>{artist?.workingAttitudeScore || 0}</span>
          </div>
          <div>
            <span className='subText'>
              Doing: <span className='text-black'>{doingCount}</span>, Review: <span className='text-black'>{reviewCount}</span>
            </span>
          </div>
          <div>
            <span className='subText'>
              Processed: <span className='text-black'>{artist?.numDone}</span> order(s)
            </span>
          </div>
        </div>

        <div className='float-right text-right'>
          <Button onClick={() => setUpdating(true)} color='primary' className='btn-create mb-2'>
            Edit
          </Button>
          <div className='subText'>Total Unpaid</div>
          <div className='box__title text-blue'>{formatMoney(artist?.totalUnpaid)}</div>
          <div className='subText'>Total Paid</div>
          <div className='box__title'>{formatMoney(artist?.totalPaid)}</div>
        </div>
      </div>
      <div className='box__body'>
        <div className='box__sub_title mb-2'>
          <span className='cursor-pointer toggle'>
            <span className='icon mr-1'>
              <PencilIcon width='14px' height='14px' />
            </span>
            Artist Note
          </span>
        </div>
        <div className='subText'>
          <P text={artist?.note || 'N/A'} id='ArtistNoteBox' />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ artistDetail }) => ({
  artist: artistDetail.data.artist,
});

const mapDispatchToProps = {
  updateArtistDetailApiAction,
  updateArtistDetailAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetailInfo);
