import { request } from 'utils/request';

const AUTH_API = '/api/authenticate';
const ACCOUNT_API = '/api/account';

export const signin = (data) =>
  request({
    url: AUTH_API,
    method: 'POST',
    data: data,
  });

export const getAccount = () =>
  request({
    url: ACCOUNT_API,
  });

export const changePassword = (data) =>
  request({
    url: ACCOUNT_API + '/change-password',
    method: 'POST',
    data: data,
  });
