import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import { ReactComponent as Logo } from 'assets/img/logo.svg';
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
        notis: data,
        isLoading: false,
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

  handleCliclNoti = (noti) => {
    const { history } = this.props;

    const onPending = () => {};
    const onSuccess = () => {};
    const onError = (error) => {
      console.log('handleCliclNoti', JSON.stringify(error));
    };

    actionTryCatchCreator({
      service: getNotificationDetail(noti.id),
      onPending,
      onSuccess,
      onError,
    });

    if (noti?.additionalData?.code) {
      history.push(`/order/${noti?.additionalData?.code}`);
    }
  };

  render() {
    const { notis, isLoading } = this.state;
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
            notis.map((noti) => (
              <div
                onClick={() => this.handleCliclNoti(noti)}
                key={`list_noti__header__${noti.id}`}
                className='noti__item'>
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
                  <div className='noti__date'>
                    {dateTimeFromNow(noti.createdDate)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(NotiContent);
