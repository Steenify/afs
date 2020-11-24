import { request } from 'utils/request';

const EMAIL_TEMPLATES = '/api/email-templates';

export const getEmailTemplatesService = (params) =>
  request({
    url: EMAIL_TEMPLATES,
    method: 'GET',
    params,
  });
