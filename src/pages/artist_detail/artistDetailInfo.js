import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import { ReactComponent as PencilIcon } from 'assets/img/pencil.svg';
import Button from 'components/common/button';
import P from 'components/common/parapraph';
import PopoverSelectField from 'components/common/popoverSelectField';
import PopoverInputField from 'components/common/popoverInputField';

import { formatMoney } from 'utils';
import { updateArtistDetailApiAction, updateArtistDetailAction } from '../artists/actions';
import { toast } from 'react-toastify';

const ArtistDetailInfo = (props) => {
  const { artist, updateArtistDetailApiAction, updateArtistDetailAction } = props;
  const noteRef = useRef(null);
  const [editingFields, setEditingFields] = useState(new Set());

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
    onUpdateExtension('note', 'Note', note);
  };

  const onUpdateExtension = (field, title, value) => {
    updateArtistDetailApiAction({ id: artist?.id, login: artist?.login, artistExtension: { [field]: value } }, () => {
      updateArtistDetailAction({ [field]: value });
      onEndEditing(field);
      toast.dark(`${title} is updated`);
    });
  };

  const onUpdateInfo = (field, title, value) => {
    updateArtistDetailApiAction({ ...artist, [field]: value }, () => {
      updateArtistDetailAction({ [field]: value });
      onEndEditing(field);
      toast.dark(`${title} is updated`);
    });
  };

  const doingCount = artist?.numSketch + artist?.numSketchEdit + artist?.numColor + artist?.numColorEdit || 0;
  const reviewCount = artist?.numSketchReview + artist?.numColorReview + artist?.numExportFile || 0;
  const scoreOptions = [...Array(11).keys()].map((item) => ({ label: item, value: item }));

  return (
    <div className='artist_detail__original artist_detail__box box'>
      <div className='box__header'>
        <div>
          <div className='box__title'>
            <PopoverInputField value={artist?.firstName} title='First Name' onSave={(value) => onUpdateInfo('firstName', 'First Name', value)} />{' '}
            <PopoverInputField value={artist?.lastName} title='Last Name' onSave={(value) => onUpdateInfo('lastName', 'Last Name', value)} />
          </div>
          <div className='subText'>
            Speed:{' '}
            <PopoverSelectField
              className='text-black'
              id='workingSpeedScore'
              options={scoreOptions}
              value={artist?.workingSpeedScore}
              title='Speed'
              onSave={(value) => onUpdateExtension('workingSpeedScore', 'Speed', value)}
            />
            , Quality:{' '}
            <PopoverSelectField
              className='text-black'
              id='productQualityScore'
              options={scoreOptions}
              value={artist?.productQualityScore}
              title='Quality'
              onSave={(value) => onUpdateExtension('productQualityScore', 'Quality', value)}
            />
            , Attitude:{' '}
            <PopoverSelectField
              className='text-black'
              id='workingAttitudeScore'
              options={scoreOptions}
              value={artist?.workingAttitudeScore}
              title='Attitude'
              onSave={(value) => onUpdateExtension('workingAttitudeScore', 'Attitude', value)}
            />
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
          <span className='cursor-pointer toggle' onClick={() => onStartEditing('note')}>
            <span className='icon mr-1'>
              <PencilIcon width='14px' height='14px' />
            </span>
            Artist Note
          </span>
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
