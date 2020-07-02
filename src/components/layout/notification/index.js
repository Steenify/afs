import React, { useState, useEffect } from 'react';
import { Badge } from 'reactstrap';
import { connect } from 'react-redux';
import Popover from 'react-tiny-popover';

import { ReactComponent as Bell } from 'assets/img/bell.svg';

import {
  getNotificationsCountAction,
  readAllNotificationAction,
} from 'pages/notifications/actions';

import NotiContent from './notiContent';

import './style.scss';

const Notification = (props) => {
  const {
    className,
    count,
    getNotificationsCount,
    readAllNotification,
  } = props;

  useEffect(() => {
    getNotificationsCount();
  }, [getNotificationsCount]);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const toggle = () => {
    readAllNotification();
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      transitionDuration={0.000001}
      position={['bottom']}
      padding={10}
      onClickOutside={toggle}
      content={() => <NotiContent onClose={toggle} />}>
      <button
        type='button'
        onClick={toggle}
        className={`noti__toggle ${isPopoverOpen && 'active'} ${
          className || ''
        }`}>
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
};

const mapStateToProps = ({ notification }) => ({
  count: notification.ui.count,
});

const mapDispatchToProps = {
  getNotificationsCount: getNotificationsCountAction,
  readAllNotification: readAllNotificationAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
