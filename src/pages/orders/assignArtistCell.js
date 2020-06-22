import React, { useState } from 'react';
import { connect } from 'react-redux';
import { isEmpty, filter, lowerCase } from 'lodash';
import Popover from 'react-tiny-popover';
import { toast } from 'react-toastify';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import { PERMITTIONS_CONFIG } from 'config';

import { updateOrderItemsAcion, assignOrdersArtistAction } from './actions';

const AssignArtistCell = ({
  assignedTo,
  artists,
  accountInfo,
  id,
  updateOrderItems,
  assignOrdersArtist,
}) => {
  const [search, setSearch] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSave = (value) => {
    toggle();
    updateOrderItems({
      id: id,
      field: 'assignedTo',
      value: value,
    });

    const payload = { id: id, to: value.login };
    assignOrdersArtist(payload, () => {
      toast.success('Assigned order!');
    });
  };

  let filteredArtist = artists;

  if (search) {
    filteredArtist = filter(artists, (art) => {
      const hasName =
        lowerCase(
          art?.fullName || `${art?.firstName || ''} ${art?.lastName || ''}`,
        ).indexOf(lowerCase(search)) !== -1;
      const hasNote = lowerCase(art?.note).indexOf(lowerCase(search)) !== -1;

      if (hasName || hasNote) {
        return true;
      }
      return false;
    });
  }

  if (!accountInfo?.permissions?.includes(PERMITTIONS_CONFIG.ASSIGN_BOOKING)) {
    return (
      <div className=' order__assigned'>
        <span className='name'>
          {isEmpty(assignedTo)
            ? '____________'
            : `${assignedTo?.fullName || ''}` ||
              `${assignedTo?.firstName || ''} ${assignedTo?.lastName || ''}`}
        </span>
      </div>
    );
  }

  return (
    <Popover
      isOpen={isPopoverOpen}
      position={'bottom'}
      padding={10}
      disableReposition
      onClickOutside={toggle}
      content={() => (
        <div className='order__info p-3'>
          <div className='order__artist'>
            <div className='search mb-3'>
              <input
                type='text'
                placeholder='Search artist'
                value={search}
                onChange={onChange}
                className='form-control search__input search__box'
              />
            </div>

            <div className='list mb-3'>
              <button
                onClick={() => onSave({ login: 'null' })}
                key={`list__artist__login`}
                className={`artist__select `}>
                <strong className='name'>____________Select____________</strong>
                <div className='status'></div>
              </button>
              {filteredArtist.map((art) => (
                <button
                  onClick={() => onSave(art)}
                  key={`list__artist__${art.login}`}
                  className={`artist__select ${
                    art.login === assignedTo?.login ? 'active' : ''
                  }`}>
                  <div className='avt'>
                    <img
                      src={`https://ui-avatars.com/api/?name=${
                        art?.fullName || ''
                      }${art?.firstName || ''}${art?.lastName || ''}`}
                      alt='comments__author'
                    />
                  </div>

                  <div className='info'>
                    <strong className='name'>
                      {art?.fullName || `${art?.firstName} ${art?.lastName}`}
                    </strong>
                    <div className='status'>
                      {art.note && (
                        <div className='note text-break'>{`${art.note}`}</div>
                      )}
                      <div className='currProgress'>
                        Sketching: {art.currSketch}, Coloring: {art.currColor}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}>
      <button
        type='button'
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        className='order__toggle order__assigned w-100'>
        <div className='d-flex'>
          <span className='name'>
            {isEmpty(assignedTo) || assignedTo?.login === 'null'
              ? '____________'
              : `${assignedTo?.fullName || ''}` ||
                `${assignedTo?.firstName || ''} ${assignedTo?.lastName || ''}`}
          </span>
          <span className='icon d-block ml-1'>
            <Pencil width='14px' height='14px' />
          </span>
        </div>
      </button>
    </Popover>
  );
};

const mapStateToProps = ({ order, auth }, ownProps) => {
  const { original } = ownProps.row;
  const { items } = order.list;
  const item = items[original] || {};
  return {
    id: item?.id || 0,
    assignedTo: item?.assignedTo || {},
    accountInfo: auth.data.accountInfo,
    artists: order.artists,
  };
};

const mapDispatchToProps = {
  updateOrderItems: updateOrderItemsAcion,
  assignOrdersArtist: assignOrdersArtistAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignArtistCell);
