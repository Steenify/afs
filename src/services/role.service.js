import { request } from 'utils/request';

const AUTHORITIES_API = '/api/authorities';
const PERMISSIONS_API = '/api/permissions';

export const getAuthorities = () =>
  request({
    url: AUTHORITIES_API,
    method: 'GET',
  });

export const getAuthority = (id) =>
  request({
    url: AUTHORITIES_API + `/${id}`,
    method: 'GET',
  });

export const updateAuthority = (data) =>
  request({
    url: AUTHORITIES_API,
    method: 'PUT',
    data,
  });

export const createAuthority = (data) =>
  request({
    url: AUTHORITIES_API,
    method: 'POST',
    data,
  });

export const deleteAuthority = (id) =>
  request({
    url: AUTHORITIES_API + `/${id}`,
    method: 'DELETE',
  });

export const getAllPermissions = () =>
  request({
    url: PERMISSIONS_API,
    method: 'GET',
  });

export const getPermission = (id) =>
  request({
    url: PERMISSIONS_API + `/${id}`,
    method: 'GET',
  });

export const createPermission = (data) =>
  request({
    url: PERMISSIONS_API,
    method: 'POST',
    data,
  });

export const updatePermission = (data) =>
  request({
    url: PERMISSIONS_API,
    method: 'PUT',
    data,
  });

export const deletePermission = (id) =>
  request({
    url: PERMISSIONS_API + `/${id}`,
    method: 'DELETE',
  });
