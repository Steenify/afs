import { request } from 'utils/request';

const TAG_API = '/api/tags';

export const getAllTagsService = (params) =>
  request({
    url: TAG_API,
    method: 'GET',
    params,
  });
