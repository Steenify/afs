import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';

import Popover from 'react-tiny-popover';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';

import {
  getArtistsAssignAction,
  assignOrdersArtistAction,
} from '../orders/actions';

import ListArtists from 'components/layout/ListArtistAssign';

const OrderAssignedBox = ({ order, getArtistsAssign, assignOrdersArtist }) => {
  const { assignedTo } = order;

  useEffect(() => {
    getArtistsAssign();
  }, [getArtistsAssign]);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => setIsPopoverOpen(!isPopoverOpen);

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
      setIsPopoverOpen(false);
      assignOrdersArtist(payload, () => {
        toast.dark('updated assigned artist!');
      });
    }
  };

  if (isEmpty(order)) {
    return null;
  }

  return (
    <div className='order_detail__assigned mr-3'>
      <Popover
        isOpen={isPopoverOpen}
        position={'bottom'}
        transitionDuration={0.000001}
        padding={10}
        onClickOutside={toggle}
        content={() => <ListArtists onSave={onSave} assignedTo={assignedTo} />}>
        <button
          type='button'
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          className='order__toggle order__assigned assign__artist budget p-0'>
          <div className='d-flex align-items-end'>
            <strong className='mr-2'> Artist:</strong>
            <span className='name'>
              {isEmpty(assignedTo) || assignedTo?.login === 'null'
                ? '____________'
                : `${assignedTo?.fullName || ''}` ||
                  `${assignedTo?.firstName || ''} ${
                    assignedTo?.lastName || ''
                  }`}
            </span>
            <span className='icon d-block ml-1'>
              <Pencil width='14px' height='14px' />
            </span>
          </div>
        </button>
      </Popover>
    </div>
  );
};

const mapStateToProps = ({ order }) => ({
  artists: order.artists,
});

const mapDispatchToProps = {
  getArtistsAssign: getArtistsAssignAction,
  assignOrdersArtist: assignOrdersArtistAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderAssignedBox);
