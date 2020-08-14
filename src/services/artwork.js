import { request } from 'utils/request';

const ARTWORK_API = '/api/artworks';

export const getArtworkService = (params) =>
  request({
    url: ARTWORK_API,
    method: 'GET',
    params,
  });

export const getArtworkDetailService = (id) =>
  request({
    url: `${ARTWORK_API}/${id}`,
  });

export const addArtworkService = (data) =>
  request({
    url: `${ARTWORK_API}`,
    method: 'POST',
    data,
  });

export const deleteArtworkDetailService = (id) =>
  request({
    url: `${ARTWORK_API}/${id}`,
    method: 'DELETE',
  });
