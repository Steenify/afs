import { request } from 'utils/request';

const ARTIST_API = '/api/artists';

export const getAllArtistsService = (params) =>
  request({
    url: ARTIST_API,
    method: 'GET',
    params,
  });

export const getArtistService = (login) =>
  request({
    url: `${ARTIST_API}/${login}`,
    method: 'GET',
  });

export const updateArtistService = (data) =>
  request({
    url: `${ARTIST_API}/budget`,
    method: 'PUT',
    data: data,
  });
