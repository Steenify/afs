import { request } from 'utils/request';

const CS_API = '/api/cs';

export const getCSService = (params) =>
  request({
    url: CS_API,
    method: 'GET',
    params,
  });
