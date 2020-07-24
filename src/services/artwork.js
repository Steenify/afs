import { request } from 'utils/request';

const ARTWORK_API = '/api/artworks';

export const getArtworkService = (params) =>
  request({
    url: ARTWORK_API,
    method: 'GET',
    params,
  });
