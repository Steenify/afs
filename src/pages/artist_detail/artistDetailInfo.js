import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import { ReactComponent as PencilIcon } from 'assets/img/pencil.svg';
import Button from 'components/common/button';
import P from 'components/common/parapraph';
import ArtistWorkingSpeedCell from 'pages/artists/cells/artistWorkingSpeedCell';

import { formatMoney } from 'utils';
import { updateArtistDetailApiAction, updateArtistDetailAction } from '../artists/actions';
import { toast } from 'react-toastify';

const ArtistDetailInfo = (props) => {
  const { artist, updateArtistDetailApiAction, updateArtistDetailAction } = props;
  const noteRef = useRef(null);
  const [editingFields, setEditingFields] = useState(new Set());
  console.log('ArtistDetailInfo -> editingFields', editingFields);

  const onStartEditing = (field) => {
    setEditingFields((prev) => new Set(prev).add(field));
  };

  const onEndEditing = (field) => {
    setEditingFields((prev) => {
      prev.delete(field);
      return new Set(prev);
    });
  };

  const updateNoteAction = () => {
    const note = noteRef.current.value;
    updateArtistDetailApiAction({ id: artist?.id, login: artist?.login, artistExtension: { note } }, () => {
      updateArtistDetailAction({ note });
      onEndEditing('note');
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
            Speed:{' '}
            <span className='text-black cursor-pointer toggle'>
              {artist?.workingSpeedScore}
              <span className='icon ml-1'>
                <PencilIcon width='14px' height='14px' />
              </span>
            </span>
            , Quality:{' '}
            <span className='text-black cursor-pointer toggle'>
              {artist?.productQualityScore}
              <span className='icon ml-1'>
                <PencilIcon width='14px' height='14px' />
              </span>
            </span>
            , Attitude:{' '}
            <span className='text-black cursor-pointer toggle'>
              {artist?.workingAttitudeScore}
              <span className='icon ml-1'>
                <PencilIcon width='14px' height='14px' />
              </span>
            </span>
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
        <div className='box__sub_title mb-2'>
          <div className='d-flex cursor-pointer toggle' onClick={() => onStartEditing('note')}>
            Artist Note
            <span className='icon ml-1'>
              <PencilIcon width='14px' height='14px' />
            </span>
          </div>
        </div>
        {editingFields.has('note') ? (
          <div>
            <textarea ref={noteRef} defaultValue={artist?.note} className='form-control' placeholder='Good Naruto, effect cool...' rows='4' />
            <div className='ctas'>
              <Button onClick={() => onEndEditing('note')} className='cancel cta pl-0' type='button' color='link'>
                Cancel
              </Button>
              <Button onClick={updateNoteAction} className='save cta pr-0' type='button' color='link'>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <P text={artist?.note || ''} id='ArtistNoteBox' />
        )}
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
