import { request } from 'utils/request';

const STATUS_API = '/api/statuses';

export const getAllStatusService = (params) =>
  request({
    url: STATUS_API,
    method: 'GET',
    params,
  });
