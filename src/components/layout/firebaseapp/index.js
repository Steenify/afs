import React, { Component, useEffect } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getNotificationsCountAction } from 'pages/notifications/actions';
import { getOrderTableListAction } from 'components/tables/orders/actions';
import { newCommentWorkLogAction, editCommentWorkLogAction, updateBookingItemSummaryAction, uploadFileWorkLogAction, rejectWorkLogAction } from './actions';

import { Messaging, isSupportedMessage } from 'vendor/firebase';

import './styles.scss';
import { WEB_ROUTES } from 'configs';

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
          {payload?.data?.senderName && <strong className='fcm_mess__sender'>{payload?.data?.senderName || ''}</strong>}
          <span className='fcm_mess__text'>{(payload?.data?.body || '').replace(payload?.data?.senderName, '')}</span>
        </div>
      </div>
    </div>
  );
};

const FCMComment = ({ payload }) => {
  return (
    <div className='fcm_mess'>
      {payload?.notification?.icon && (
        <div className='fcm_mess__icon'>
          <img src={payload?.notification?.icon} alt='fcm_mess__icon' />
        </div>
      )}
      <div className='fcm_mess__body'>
        <div className='fcm_mess__mess'>
          {payload?.data?.sender && <strong className='fcm_mess__sender'>{payload?.data?.sender || ''}</strong>}
          <span className='fcm_mess__text'>
            {' '}
            commented: "{payload?.data?.content}" in <span className='link'>#{payload?.data?.orderNumber}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const FCMOrder = ({ payload }) => {
  return (
    <div className='fcm_mess'>
      {payload?.notification?.icon && (
        <div className='fcm_mess__icon'>
          <img src={payload?.notification?.icon} alt='fcm_mess__icon' />
        </div>
      )}
      <div className='fcm_mess__body'>
        <div className='fcm_mess__mess'>
          {payload?.data?.statusName && <strong className='fcm_mess__sender'>{payload?.data?.statusName || ''}</strong>}
          <span className='fcm_mess__text'>
            {' '}
            <span className='link'>#{payload?.data?.orderNumber}</span> has been assigned to you.
          </span>
        </div>
      </div>
    </div>
  );
};

const FCMWorkLog = ({ payload }) => {
  const action = payload?.data?.action?.split('.')?.[1] || '';
  return (
    <div className='fcm_mess'>
      {payload?.notification?.icon && (
        <div className='fcm_mess__icon'>
          <img src={payload?.notification?.icon} alt='fcm_mess__icon' />
        </div>
      )}
      <div className='fcm_mess__body'>
        <div className='fcm_mess__mess'>
          {payload?.data?.orderNumber && (
            <strong className='fcm_mess__sender'>
              <span className='link'>#{payload?.data?.orderNumber}</span>
            </strong>
          )}
          .<span className='fcm_mess__text'> Your art subbmission has been {action === 'approve' ? 'approved' : 'rejected'}.</span>
        </div>
      </div>
    </div>
  );
};

const FireBaseApp = (props) => {
  const {
    getNotificationsCount,
    newCommentWorkLogAction,
    editCommentWorkLogAction,
    getOrderTableListAction,
    updateBookingItemSummaryAction,
    uploadFileWorkLogAction,
    rejectWorkLogAction,
    history,
  } = props;
  const goToOrder = (payload) => {
    payload.data?.code && history.push(WEB_ROUTES.ORDERS_DETAIL.path.replace(':id', payload.data?.code));
  };
  useEffect(() => {
    if (isSupportedMessage) {
      const subscriber = Messaging.onMessage((payload) => {
        console.log('FirerBaseApp -> componentDidMount -> payload', JSON.stringify(payload));
        const type = payload?.data?.type;
        const action = payload?.data?.action;
        getNotificationsCount();
        if (type === 'NOTIFICATION') {
          toast(<MsgFCM payload={payload} />);
        }

        if (action === 'booking.assign') {
          getOrderTableListAction({});
          toast(<FCMOrder payload={payload} />, { onClick: () => goToOrder(payload) });
        }

        if (action === 'booking_item.modifySummarization') {
          updateBookingItemSummaryAction(payload.data);
        }

        if (action === 'booking_work_log.upload') {
          uploadFileWorkLogAction(payload.data);
        }

        if (action === 'booking_work_log.reject') {
          rejectWorkLogAction(payload.data);
          toast(<FCMWorkLog payload={payload} />, { onClick: () => goToOrder(payload) });
        }

        if (action === 'booking_work_log.approve') {
          toast(<FCMWorkLog payload={payload} />, { onClick: () => goToOrder(payload) });
        }

        if (action === 'booking_comment.create') {
          newCommentWorkLogAction(payload.data);
          toast(<FCMComment payload={payload} />, { onClick: () => goToOrder(payload) });
        }

        if (action === 'booking_comment.modify') {
          editCommentWorkLogAction(payload.data);
        }
      });
      return subscriber;
    }
  }, [isSupportedMessage]);

  return <></>;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  getNotificationsCount: getNotificationsCountAction,
  newCommentWorkLogAction,
  editCommentWorkLogAction,
  getOrderTableListAction,
  updateBookingItemSummaryAction,
  uploadFileWorkLogAction,
  rejectWorkLogAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FireBaseApp));

// const payload = {
//   data: {
//     image: '[]',
//     code: 'd953c9873d62774814d2978ed17f7676',
//     orderNumber: '1593',
//     sender: 'Administrator',
//     action: 'booking_comment.modify',
//     id: '468',
//     entity: 'booking_comment',
//     content: 'hello there',
//     bookingWorkLog: '827',
//   },
//   from: '88204029628',
//   priority: 'normal',
//   notification: { icon: 'https://cdn.shopify.com/s/files/1/0281/7035/4736/t/11/assets/favicon.ico?v=18057392847654471452' },
// };

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
