import { request } from 'utils/request';

const USER_API = '/api/users';

export const getUsers = (data) =>
  request({
    url: USER_API,
    method: 'GET',
    params: data,
  });

export const getUser = (login) =>
  request({
    url: USER_API + `/${login}`,
    method: 'GET',
  });

export const updateUser = (data) =>
  request({
    url: USER_API,
    method: 'PUT',
    data: data,
  });

export const createUser = (data) =>
  request({
    url: USER_API,
    method: 'POST',
    data: data,
  });

export const getUserRoles = (data) =>
  request({
    url: USER_API + '/authorities',
    method: 'GET',
  });
