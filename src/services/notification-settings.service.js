import { request } from 'utils/request';

const NOTIFICATION_API = '/api/notification-settings';

export const getNotificationActionsService = (params) =>
  request({
    url: NOTIFICATION_API + '/actions',
    method: 'GET',
    params,
  });

export const getNotificationActionService = (actionId) =>
  request({
    url: `${NOTIFICATION_API}/actions/${actionId}`,
    method: 'GET',
  });

export const updateNotificationActionService = (actionId, data) =>
  request({
    url: `${NOTIFICATION_API}/actions/${actionId}`,
    method: 'PUT',
    data,
  });

export const getRecipientsService = (s) =>
  request({
    url: NOTIFICATION_API + '/actions/recipients',
    method: 'GET',
    params: { s },
  });
