import { request } from 'utils/request';

const GET_LIST = '/api/late-notifications';
const GET_TEMPLATE = '/api/late-notifications/email-preview';

export const getLateNotificationService = (params) =>
  request({
    url: GET_LIST,
    method: 'GET',
    params,
  });

export const getLateNotificationTemplateService = (params) =>
  request({
    url: GET_TEMPLATE,
    method: 'GET',
    params,
  });
