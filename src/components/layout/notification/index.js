import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import { connect } from 'react-redux';
import Popover from 'react-tiny-popover';

import { ReactComponent as Bell } from 'assets/img/bell.svg';

import { getNotificationsCountAction, readAllNotificationAction } from 'pages/notifications/actions';

import NotiContent from './notiContent';

import './style.scss';

class Notification extends Component {
  constructor() {
    super();
    this.state = {
      isPopoverOpen: false,
    };
  }

  componentDidMount() {
    const { getNotificationsCount } = this.props;
    getNotificationsCount();
  }

  toggle = () => {
    const { readAllNotification, count } = this.props;
    const { isPopoverOpen } = this.state;

    this.setState(
      {
        isPopoverOpen: !isPopoverOpen,
      },
      () => {
        if (count > 0) {
          readAllNotification();
        }
      },
    );
  };

  render() {
    const { className, count } = this.props;
    const { isPopoverOpen } = this.state;
    return (
      <Popover isOpen={isPopoverOpen} transitionDuration={0.000001} position={['bottom']} padding={10} onClickOutside={this.toggle} content={() => <NotiContent onClose={this.toggle} />}>
        <button type='button' onClick={this.toggle} className={`noti__toggle ${isPopoverOpen && 'active'} ${className || ''}`}>
          <div className='icon'>
            <Bell />
          </div>
          {count > 0 && (
            <Badge className='number' color='danger'>
              {count || 0}
            </Badge>
          )}
        </button>
      </Popover>
    );
  }
}

const mapStateToProps = ({ notification }) => ({
  count: notification.ui.count,
});

const mapDispatchToProps = {
  getNotificationsCount: getNotificationsCountAction,
  readAllNotification: readAllNotificationAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
