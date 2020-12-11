import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import Popover from 'react-tiny-popover';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';
import ListArtists from 'components/layout/ListArtistAssign';
import CanShow from 'components/layout/canshow';

import { PERMITTIONS_CONFIG } from 'configs';

import { ReactComponent as AssignedIcon } from 'assets/img/assigned.svg';

import { updateOrderTableAssignArtistAction } from 'components/tables/orders/actions';

class OrderAssignedBox extends Component {
  constructor() {
    super();
    this.state = {
      isPopoverOpen: false,
    };
  }

  toggle = () => {
    this.setState((prevState) => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  onSave = (artist) => {
    const { isPopoverOpen } = this.state;
    const { order, updateOrderTableAssignArtistAction } = this.props;
    const { assignedTo } = order;

    if ((assignedTo || {})['login'] === artist?.login) {
      toast.warn('Please select new artist!');
      return;
    }

    if (isEmpty(artist)) {
      toast.warn('Please select Artist');
      return;
    }

    this.setState(
      {
        isPopoverOpen: !isPopoverOpen,
      },
      () => {
        const payload = { id: order.id, to: artist.login };
        const name = artist.login !== 'null' ? artist.firstName : '_______';
        updateOrderTableAssignArtistAction({ payload, onSuccess: () => toast.dark(`Order [#${order?.number}] is assigned to [${name}]`) });
      },
    );
  };

  render() {
    const { order } = this.props;
    const { isPopoverOpen } = this.state;

    const { assignedTo, artistBudgets } = order;

    const hasMultiArtist = artistBudgets.length > 1;

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
          onClickOutside={this.toggle}
          content={() => <ListArtists onSave={this.onSave} assignedTo={assignedTo} />}>
          <button type='button' onClick={this.toggle} className='order__toggle order__assigned assign__artist budget p-0'>
            <div className='d-flex align-items-end'>
              <CanShow permission={PERMITTIONS_CONFIG.VIEW_ALL_ARTIST_TABS}>
                {hasMultiArtist && (
                  <span style={{ marginBottom: '3px' }} className='d-block mr-1'>
                    <AssignedIcon />
                  </span>
                )}
              </CanShow>
              <strong className='mr-2'> Artist:</strong>
              <span className='name'>
                {isEmpty(assignedTo) || assignedTo?.login === 'null' ? '____________' : `${assignedTo?.fullName || ''}` || `${assignedTo?.firstName || ''} ${assignedTo?.lastName || ''}`}
              </span>
              <span className='icon d-block ml-1'>
                <Pencil width='14px' height='14px' />
              </span>
            </div>
          </button>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updateOrderTableAssignArtistAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderAssignedBox);
