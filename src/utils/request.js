/* @flow */
import axios from 'axios';
import { grantType, HostAPI } from 'config';

export type RequestType = {
  host?: string,

  url?: string,

  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS',

  params?: Object,

  data?: Object,

  headers?: Object,

  token?: string,
};

export const request = async ({
  host = '',
  url = '',
  method = 'GET',
  params = {},
  data = {},
  headers = {},
  token = localStorage.getItem('token'),
}: RequestType) => {
  const res = await axios({
    url: `${host || HostAPI}${url}`,
    method,
    data,
    params,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${grantType} ${token}`,
      ...headers,
    },
  });
  return res;
};

export const fakeRequest = (response: any) =>
  new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: response,
      });
    }, 1500);
  });

export default request;
