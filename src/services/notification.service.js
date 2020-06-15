import { request } from 'utils/request';

const NOTIFICATION_API = '/api/notifications';

export const getAllNotifications = (data) =>
  request({
    url: NOTIFICATION_API,
    method: 'GET',
    params: data,
  });

export const createNotification = (data) =>
  request({
    url: NOTIFICATION_API,
    method: 'POST',
    data,
  });

export const deleteNotification = (id) =>
  request({
    url: NOTIFICATION_API + `/${id}`,
    method: 'DELETE',
  });

export const publishNotification = (data) =>
  request({
    url: NOTIFICATION_API + '/publish',
    method: 'POST',
    data,
  });
