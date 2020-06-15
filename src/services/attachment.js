import { request } from 'utils/request';

const UPLOAD_API = '/api/attachments';

export const uploadService = (data) =>
  request({
    url: UPLOAD_API,
    method: 'POST',
    data,
  });
