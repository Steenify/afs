import React, { useRef } from 'react';
import { connect } from 'react-redux';

import { ReactComponent as PencilIcon } from 'assets/img/pencil.svg';
import Button from 'components/common/button';

import { formatMoney } from 'utils';
import { updateArtistDetailApiAction, updateArtistDetailAction } from '../artists/actions';
import { toast } from 'react-toastify';

const ArtistDetailInfo = (props) => {
  const { artist, updateArtistDetailApiAction, updateArtistDetailAction } = props;
  const noteRef = useRef(null);

  const updateNoteAction = () => {
    const note = noteRef.current.value;
    updateArtistDetailApiAction({ id: artist?.id, login: artist?.login, artistExtension: { note } }, () => {
      updateArtistDetailAction({ note });
      toast.dark('Note is updated');
    });
  };

  const doingCount = artist?.numSketch + artist?.numSketchEdit + artist?.numColor + artist?.numColorEdit || 0;
  const reviewCount = artist?.numSketchReview + artist?.numColorReview + artist?.numExportFile || 0;

  return (
    <div className='artist_detail__original artist_detail__box box'>
      <div className='box__header'>
        <div>
          <div className='box__title'>
            {artist?.firstName} {artist?.lastName}
          </div>
          <div className='subText'>
            Speed: <span className='text-black'>{artist?.workingSpeedScore}</span>, Quality: <span className='text-black'>{artist?.productQualityScore}</span>, Attitude:{' '}
            <span className='text-black'>{artist?.workingAttitudeScore}</span>
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
          <div className='subText'>Total Unpaid</div>
          <div className='box__title text-blue'>{formatMoney(artist?.totalUnpaid)}</div>
          <div className='subText'>Total Paid</div>
          <div className='box__title'>{formatMoney(artist?.totalPaid)}</div>
        </div>
      </div>
      <div className='box__body'>
        <div className='box__sub_title d-flex align-items-center mb-2'>
          Artist Note <PencilIcon className='m-2' />
          <Button color='primary' onClick={updateNoteAction} className='btn-create' containerClassName='ml-auto'>
            Save
          </Button>
        </div>
        <textarea ref={noteRef} defaultValue={artist?.note} className='form-control' placeholder='Good Naruto, effect cool...' rows='2' />
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updateArtistDetailApiAction,
  updateArtistDetailAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetailInfo);
