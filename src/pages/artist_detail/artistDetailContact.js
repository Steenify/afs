import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import { ReactComponent as PencilIcon } from 'assets/img/pencil.svg';
import Button from 'components/common/button';
import P from 'components/common/parapraph';
import PopoverSelectField from 'components/common/popoverSelectField';
import PopoverInputField from 'components/common/popoverInputField';

import { updateArtistDetailApiAction, updateArtistDetailAction } from '../artists/actions';
import { toast } from 'react-toastify';

const ArtistDetailContact = (props) => {
  const { artist, updateArtistDetailApiAction, updateArtistDetailAction } = props;

  const onUpdateInfo = (field, title, value) => {
    updateArtistDetailApiAction({ ...artist, [field]: value }, () => {
      updateArtistDetailAction({ [field]: value });
      toast.dark(`${title} is updated`);
    });
  };

  const onUpdateExtension = (field, title, value) => {
    updateArtistDetailApiAction({ id: artist?.id, login: artist?.login, artistExtension: { [field]: value } }, () => {
      updateArtistDetailAction({ [field]: value });
      toast.dark(`${title} is updated`);
    });
  };

  return (
    <div className='artist_detail__contact artist_detail__box box'>
      <div className='box__header'>
        <div className='box__title'>Contact Info</div>
      </div>
      <div className='box__body'>
        <div className='row mb-4'>
          <div className='col-6'>
            <p className='mb-1'>
              <PopoverInputField value={artist?.email} title='Email' showTitle onSave={(value) => onUpdateInfo('email', 'Email', value)} />
            </p>
            <p className='mb-1'>
              <PopoverInputField value={artist?.phoneNumber} title='Phone' showTitle onSave={(value) => onUpdateInfo('phoneNumber', 'Phone', value)} />
            </p>
            <p className='mb-1'>
              <PopoverInputField value={artist?.fbChat} title='Facebook Chat' showTitle showValue={false} onSave={(value) => onUpdateExtension('fbChat', 'Facebook Chat', value)} />
              {artist?.fbChat && (
                <a target='_blank' rel='noopener noreferrer' href={`${artist?.fbChat}`}>
                  Link
                </a>
              )}
            </p>
            <p className='mb-1'>
              <PopoverInputField value={artist?.mailChain} title='Mail Chain' showTitle showValue={false} onSave={(value) => onUpdateExtension('mailChain', 'Mail Chain', value)} />
              {artist?.mailChain && (
                <a target='_blank' rel='noopener noreferrer' href={`${artist?.mailChain}`}>
                  Link
                </a>
              )}
            </p>
            <p className='mb-1'>
              <PopoverInputField value={artist?.fbUrl} title='Facebook' showTitle showValue={false} onSave={(value) => onUpdateExtension('fbUrl', 'Facebook', value)} />
              {artist?.fbUrl && (
                <a target='_blank' rel='noopener noreferrer' href={`${artist?.fbUrl}`}>
                  Link
                </a>
              )}
            </p>
            <p className='mb-1'>
              <PopoverInputField value={artist?.igUrl} title='Instagram' showTitle showValue={false} onSave={(value) => onUpdateExtension('igUrl', 'Instagram', value)} />
              {artist?.igUrl && (
                <a target='_blank' rel='noopener noreferrer' href={`${artist?.igUrl}`}>
                  Link
                </a>
              )}
            </p>
            <p className='mb-1'>
              <PopoverInputField value={artist?.snapChatUrl} title='SnapChat' showTitle showValue={false} onSave={(value) => onUpdateExtension('snapChatUrl', 'SnapChat', value)} />
              {artist?.snapChatUrl && (
                <a target='_blank' rel='noopener noreferrer' href={`${artist?.snapChatUrl}`}>
                  Link
                </a>
              )}
            </p>
            <p className='mb-1'>
              <PopoverInputField value={artist?.linkedUrl} title='LinkedIn' showTitle showValue={false} onSave={(value) => onUpdateExtension('linkedUrl', 'LinkedIn', value)} />
              {artist?.linkedUrl && (
                <a target='_blank' rel='noopener noreferrer' href={`${artist?.linkedUrl}`}>
                  Link
                </a>
              )}
            </p>
            <p className='mb-1'>
              <PopoverInputField value={artist?.twitterUrl} title='Twitter' showTitle showValue={false} onSave={(value) => onUpdateExtension('twitterUrl', 'Twitter', value)} />
              {artist?.twitterUrl && (
                <a target='_blank' rel='noopener noreferrer' href={`${artist?.twitterUrl}`}>
                  Link
                </a>
              )}
            </p>
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

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updateArtistDetailApiAction,
  updateArtistDetailAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetailContact);
