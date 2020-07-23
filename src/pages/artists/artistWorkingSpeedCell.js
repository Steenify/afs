import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Popover from 'react-tiny-popover';

import Button from 'components/common/button';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import {
  updateArtistItemsAction,
  updateArtistDetailApiAction,
} from './actions';

const ArtistWorkingSpeedCell = ({
  workingSpeedScore,
  id,
  login,
  updateArtistItems,
  updateArtistDetailApi,
}) => {
  const [value, setValue] = useState(workingSpeedScore || '');

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  useEffect(() => {
    setValue(workingSpeedScore || '');
  }, [workingSpeedScore]);

  const onChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const onSave = (e) => {
    e.preventDefault();
    toggle();
    updateArtistItems({
      id: id,
      field: 'workingSpeedScore',
      value: value,
    });

    updateArtistDetailApi(
      {
        id: id,
        login: login,
        artistExtension: {
          workingSpeedScore: value,
        },
      },
      () => {
        toast.dark(`[${login}] updated ${value} speed score`);
      },
    );
  };

  const scores = [...Array(10).keys()];

  return (
    <Popover
      isOpen={isPopoverOpen}
      transitionDuration={0.000001}
      position={'bottom'}
      padding={10}
      disableReposition
      onClickOutside={toggle}
      content={() => (
        <div className='order__info order__user p-3'>
          <form action='' onSubmit={onSave}>
            <div className='order__budget'>
              <div className='data'>
                <strong className='title mr-3'>Speed</strong>
                <select
                  className='form-control'
                  value={value}
                  onChange={onChange}>
                  <option value='0'>0</option>
                  {scores.map((sco) => {
                    return (
                      <option
                        key={`artist__${id}__select__score_speed__${sco}`}
                        value={sco + 1}>
                        {sco + 1}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='ctas'>
                <Button
                  onClick={toggle}
                  className='bugdet__cancel cta pl-0'
                  type='button'
                  color='link'>
                  Cancel
                </Button>
                <Button
                  onClick={onSave}
                  className='bugdet__save cta pr-0'
                  type='button'
                  color='link'>
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}>
      <button
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        className='order__toggle order__user text-left w-100'>
        <div className='d-flex justify-content-end'>
          {workingSpeedScore || 0}
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
    workingSpeedScore: item?.workingSpeedScore || '',
    id: item?.id,
    login: item?.login || 0,
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
)(ArtistWorkingSpeedCell);
