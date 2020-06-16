import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Spinner, DropdownMenu, DropdownToggle, Dropdown } from 'reactstrap';
import { isEmpty, filter, lowerCase } from 'lodash';
import { toast } from 'react-toastify';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import { getArtistsAction, updateOrdersArtistAction } from '../orders/actions';

const OrderAssignedBox = ({
  order,
  getArtists,
  artists,
  updateOrdersArtist,
}) => {
  const { assignedTo } = order;

  useEffect(() => {
    getArtists();
  }, [getArtists]);

  const [search, setSearch] = useState('');

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSave = (artist) => {
    if ((assignedTo || {})['login'] === artist?.login) {
      toast.warn('Please select new artist!');
      return;
    }

    if (isEmpty(artist)) {
      toast.warn('Please select Artist');
      return;
    }

    if (!isEmpty(artist)) {
      const payload = { id: order.id, to: artist.login };
      updateOrdersArtist(payload, () => {
        toast.success('updated assigned artist!');
        setDropdownOpen(false);
      });
    }
  };

  if (isEmpty(order)) {
    return (
      <div
        style={{ minHeight: '100px' }}
        className='order_detail__customer box d-flex align-items-center justify-content-center'>
        <Spinner />
      </div>
    );
  }

  let filteredArtist = artists;

  if (search) {
    filteredArtist = filter(artists, (art) => {
      if (art.fullName) {
        return (
          lowerCase(
            art?.fullName || `${art?.firstName} ${art?.lastName}`,
          ).indexOf(lowerCase(search)) !== -1
        );
      }
      return false;
    });
  }

  return (
    <div className='order_detail__assigned mr-3'>
      <Dropdown
        className='assign__artist'
        isOpen={dropdownOpen}
        toggle={toggle}>
        <DropdownToggle className='order__toggle budget p-0'>
          <div className='d-flex align-items-end'>
            <strong className='mr-2'> Assigned:</strong>
            <span className='name'>
              {isEmpty(assignedTo)
                ? '_________'
                : assignedTo?.fullName ||
                  `${assignedTo?.firstName} ${assignedTo?.lastName}`}
            </span>
            <span className='icon d-block ml-1'>
              <Pencil width='14px' height='14px' />
            </span>
          </div>
        </DropdownToggle>
        <DropdownMenu className='order__dropdowns'>
          <div className='order__artist'>
            <div className='search mb-3'>
              <input
                type='text'
                placeholder='Artist Name'
                value={search}
                onChange={onChangeSearch}
                className='form-control search__input'
              />
            </div>

            <div className='list mb-3'>
              <button
                onClick={() => onSave({ login: 'null' })}
                key={`list__artist__login`}
                className={`artist__select`}>
                <strong className='name'>___Select___</strong>
                <div className='status d-block'></div>
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
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const mapStateToProps = ({ order }) => ({
  artists: order.artists,
});

const mapDispatchToProps = {
  getArtists: getArtistsAction,
  updateOrdersArtist: updateOrdersArtistAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderAssignedBox);
