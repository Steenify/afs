import { request } from 'utils/request';

const TAG_API = '/api/tags';

export const getAllTagsService = (params) =>
  request({
    url: TAG_API,
    method: 'GET',
    params,
  });

// export const addTagsService = (tagName = '') =>
//   request({
//     url: TAG_API,
//     method: 'POST',
//     data: { name: tagName },
//   });
