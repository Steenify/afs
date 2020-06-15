import { request } from 'utils/request';

const SYSTEM_PROPERTIES_API = '/api/system-properties';

export const getAllSystemProperties = () =>
  request({
    url: SYSTEM_PROPERTIES_API,
    method: 'GET',
  });

export const getSystemProperty = (id) =>
  request({
    url: SYSTEM_PROPERTIES_API + `/${id}`,
    method: 'GET',
  });

export const updateSystemProperty = (data) =>
  request({
    url: SYSTEM_PROPERTIES_API,
    method: 'PUT',
    data,
  });
