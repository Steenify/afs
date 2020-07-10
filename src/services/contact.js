import { request } from 'utils/request';

const ARTIST_API = '/api/artists';

export const getAllArtistsService = (params) =>
  request({
    url: ARTIST_API,
    method: 'GET',
    params,
  });
