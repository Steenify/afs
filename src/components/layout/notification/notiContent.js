import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import { ReactComponent as Logo } from 'assets/img/logo.svg';
import { ReactComponent as NotiEmpty } from 'assets/img/no__notification.svg';
import {
  getAllNotifications,
  getNotificationDetail,
} from 'services/notification.service';

import { truncates, dateTimeFromNow, actionTryCatchCreator } from 'utils';

class NotiContent extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      notis: [],
    };
  }

  componentDidMount() {
    this.handleGetNoti();
  }

  handleGetNoti = () => {
    const params = {
      page: 0,
      sort: 'asc',
    };

    const onPending = () => {};
    const onSuccess = (data) => {
      this.setState({
        isLoading: false,
        notis: data,
      });
    };
    const onError = (error) => {
      console.log('handleGetNoti', JSON.stringify(error));
    };

    actionTryCatchCreator({
      service: getAllNotifications(params),
      onPending,
      onSuccess,
      onError,
    });
  };

  handleClick = (noti) => {
    const { history, onClose } = this.props;
    const onPending = () => {};
    const onSuccess = () => {};
    const onError = (error) => {
      console.log('handleClick', JSON.stringify(error));
    };

    actionTryCatchCreator({
      service: getNotificationDetail(noti.id),
      onPending,
      onSuccess,
      onError,
    });
    onClose();
    if (noti?.additionalData?.code) {
      history.push(`/order/${noti?.additionalData?.code}`);
    }
  };

  handleRenderContent = () => {
    const { notis } = this.state;
    if (!notis.length) {
      return (
        <div className='noti__empty'>
          <div className='content'>
            <NotiEmpty className='icon' />
            <h4 className='title'>No notifications received.</h4>
          </div>
        </div>
      );
    }

    return notis.map((noti) => (
      <div
        onClick={() => this.handleClick(noti)}
        key={`list_noti__header__${noti.id}`}
        className={`noti__item ${noti.status}`}>
        <div className='noti__icon'>
          <div className='icon'>
            <Logo />
          </div>
        </div>
        <div className='noti__info'>
          <div className='noti__desc'>
            <strong>{noti.senderName}: </strong>
            {truncates(noti.content, 60)}
            {noti?.additionalData?.orderNumber && (
              <span> #{noti?.additionalData?.orderNumber}</span>
            )}
          </div>
          <div className='noti__date'>{dateTimeFromNow(noti.createdDate)}</div>
        </div>
      </div>
    ));
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div className='noti__content'>
        <div className='noti__header'>
          <h3 className='noti__title'>Notifications</h3>
        </div>
        <div className='noti__body'>
          {isLoading ? (
            <div
              style={{ minHeight: '100px' }}
              className=' d-flex align-items-center justify-content-center'>
              <Spinner />
            </div>
          ) : (
            this.handleRenderContent()
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(NotiContent);
