import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import Popover from 'react-tiny-popover';

import { ReactComponent as Pencil } from 'assets/img/pencil.svg';
import ListArtists from 'components/layout/ListArtistAssign';

import { assignOrdersArtistAction } from '../orders/actions';

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
    const { order, assignOrdersArtist } = this.props;
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
        assignOrdersArtist(payload, () => {
          toast.dark(`Order [#${order?.number}] is assigned to [${name}]`);
        });
      },
    );
  };

  render() {
    const { order } = this.props;
    const { assignedTo } = order;

    const { isPopoverOpen } = this.state;

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
          content={() => (
            <ListArtists onSave={this.onSave} assignedTo={assignedTo} />
          )}>
          <button
            type='button'
            onClick={this.toggle}
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
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  assignOrdersArtist: assignOrdersArtistAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderAssignedBox);
