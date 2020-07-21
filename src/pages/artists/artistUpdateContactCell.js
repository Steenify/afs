import React, { useState } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import Popover from 'react-tiny-popover';
import { toast } from 'react-toastify';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import { PERMITTIONS_CONFIG } from 'config';

import {
  updateArtistItemsAction,
  updateArtistDetailApiAction,
} from './actions';

import ListContacts from './listContact';

const ArtistUpdateContactCell = ({
  id,
  uid,
  login,
  updateArtistDetailApi,
  updateArtistItems,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const onSave = (value) => {
    toggle();
    updateArtistItems({
      id: id,
      field: 'uid',
      value: value.exId,
    });

    updateArtistDetailApi(
      {
        id: id,
        login: login,
        artistExtension: {
          uid: value.exId,
        },
      },
      () => {
        toast.dark(`[${login}] updated with contact ID!`);
      },
    );
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      position={'bottom'}
      transitionDuration={0.0000001}
      padding={10}
      onClickOutside={toggle}
      content={() => <ListContacts onSave={onSave} uid={uid} />}>
      <button
        type='button'
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        className='order__toggle order__assigned w-100'>
        <div className='d-flex'>
          <span className='name'>{uid || '__________'}</span>
          <span className='icon d-block ml-1'>
            <Pencil width='14px' height='14px' />
          </span>
        </div>
      </button>
    </Popover>
  );
};

const mapStateToProps = ({ artists, auth }, ownProps) => {
  const { data } = ownProps;
  const { items } = artists.data;
  const item = items[data] || {};
  return {
    id: item?.id || 0,
    uid: item?.uid || 0,
    login: item?.login || '',
    accountInfo: auth.data.accountInfo,
  };
};

const mapDispatchToProps = {
  updateArtistItems: updateArtistItemsAction,
  updateArtistDetailApi: updateArtistDetailApiAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistUpdateContactCell);
