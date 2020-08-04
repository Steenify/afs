import { request } from 'utils/request';

const GET_LIST = '/api/late-notifications';
const GET_EMAIL_TEMPLATE = '/api/late-notifications/email-preview';
const GET_MESSAGE_TEMPLATE = '/api/late-notifications/message-preview';
const SEND_EMAIL = (id) => `/api/late-notifications/${id}/email`;
const GENERATE_EMAIL_TEMPLATE = '/api/late-notifications/generate-email-template';
const VIEW_SENT_CONTENT = (id, bookingId) => `/api/late-notifications/${id}/sent-email/${bookingId}`;

export const getLateNotificationService = (params) =>
  request({
    url: GET_LIST,
    method: 'GET',
    params,
  });

export const getLateNotificationEmailTemplateService = (params) =>
  request({
    url: GET_EMAIL_TEMPLATE,
    method: 'GET',
    params,
  });

export const getLateNotificationMessageTemplateService = (params) =>
  request({
    url: GET_MESSAGE_TEMPLATE,
    method: 'GET',
    params,
  });

export const generateEmailTemplateService = (data) =>
  request({
    url: GENERATE_EMAIL_TEMPLATE,
    method: 'POST',
    data,
  });

export const sendLateNotificationEmailService = (id = 0, items = []) =>
  request({
    url: SEND_EMAIL(id),
    method: 'POST',
    data: {
      request: items,
    },
  });

export const viewLateNotificationSentContentService = (id = 0, bookingId = 0) =>
  request({
    url: VIEW_SENT_CONTENT(id, bookingId),
    method: 'POST',
  });
