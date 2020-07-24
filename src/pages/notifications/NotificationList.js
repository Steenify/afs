import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ReactComponent as NotiEmpty } from 'assets/img/no__notification.svg';
import { ReactComponent as Logo } from 'assets/img/logo.svg';

import { truncates, dateTimeFromNow } from 'utils';

import { getAllNotificationsAction, getAllNotificationDetailAction } from './actions';

import './style.scss';
import { useHistory } from 'react-router-dom';

const NotificationList = (props) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { getAllNotificationsAction, getAllNotificationDetailAction, notifications, ui } = props;

  useEffect(() => {
    getAllNotificationsAction();
  }, [getAllNotificationsAction]);

  const handleClick = (noti) => {
    getAllNotificationDetailAction(noti.id);
    if (noti?.additionalData?.code) {
      history.push(`/order/${noti?.additionalData?.code}`);
    }
  };

  const handleRenderContent = () => {
    if (!notifications.length) {
      return (
        <div className='noti__empty'>
          <div className='content'>
            <NotiEmpty className='icon' />
            <h4 className='title'>No notifications received.</h4>
          </div>
        </div>
      );
    }

    return notifications.map((noti) => (
      <div onClick={() => handleClick(noti)} key={`list_noti__header__${noti.id}`} className={`noti__item ${noti.status}`}>
        <div className='noti__icon'>
          <div className='icon'>
            <Logo />
          </div>
        </div>
        <div className='noti__info'>
          <div className='noti__desc'>
            <strong>{noti.senderName}: </strong>
            {/* {truncates(noti.content, 120)} */}
            {noti.content}
            {noti?.additionalData?.orderNumber && <span> #{noti?.additionalData?.orderNumber}</span>}
          </div>
          <div className='noti__date'>{dateTimeFromNow(noti.createdDate)}</div>
        </div>
      </div>
    ));
  };
  return (
    <div className='notifications__page'>
      <div className='notifications__header'></div>
      <div className='notifications__body box'>
        <div>{handleRenderContent()}</div>
      </div>
      <div className='notifications__paging'>{/* <CustomersPaging /> */}</div>
    </div>
  );
};

const mapStateToProps = ({ notification }) => ({
  notifications: notification.data.notifications,
  totalItems: notification.data.totalItems,
  ui: notification.ui.list,
});

export default connect(mapStateToProps, {
  getAllNotificationsAction,
  getAllNotificationDetailAction,
})(NotificationList);
