import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import { getNotificationsCountAction } from 'pages/notifications/actions';

import { Messaging, isSupportedMessage } from 'vendor/firebase';

import './styles.scss';

const MsgFCM = ({ payload }) => {
  return (
    <div className='fcm_mess'>
      {payload?.notification?.icon && (
        <div className='fcm_mess__icon'>
          <img src={payload?.notification?.icon} alt='fcm_mess__icon' />
        </div>
      )}
      <div className='fcm_mess__body'>
        <div className='fcm_mess__mess'>
          {payload?.data?.senderName && (
            <strong className='fcm_mess__sender'>
              {payload?.data?.senderName || ''}
            </strong>
          )}
          <span className='fcm_mess__text'>
            {(payload?.data?.body || '').replace(payload?.data?.senderName, '')}
          </span>
        </div>
      </div>
    </div>
  );
};

class FirerBaseApp extends Component {
  componentDidMount() {
    const { getNotificationsCount } = this.props;
    if (isSupportedMessage) {
      Messaging.onMessage((payload) => {
        getNotificationsCount();
        toast(<MsgFCM payload={payload} />);
      });
    }
  }

  // handleToast = () => {
  //   const payload = {
  //     data: {
  //       orderNumber: '240',
  //       receiverName: 'Administrator ',
  //       senderAvatar: '',
  //       type: 'NOTIFICATION',
  //       body: 'Duy Pham commented on order 240',
  //       title: '',
  //       ref: 'https://afs.netlify.app/order/634fa61af57f40d712894e8bdd3baff2',
  //       senderName: 'Duy Pham',
  //       receiverId: '1',
  //       'google.c.a.e': '1',
  //       'gcm.notification.e': '1',
  //       additionalData:
  //         '{"code":"634fa61af57f40d712894e8bdd3baff2","orderNumber":"240","id":204,"entity":"booking_comment"}',
  //       receiverEmail: 'administrator@localhost',
  //     },
  //     from: '88204029628',
  //     priority: 'normal',
  //     notification: {
  //       body: 'Duy Pham commented on order 240',
  //       icon:
  //         'https://cdn.shopify.com/s/files/1/0281/7035/4736/t/11/assets/favicon.ico?v=18057392847654471452',
  //     },
  //   };

  //   toast(<MsgFCM payload={payload} />);
  // };

  render() {
    return <> </>;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  getNotificationsCount: getNotificationsCountAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(FirerBaseApp);
