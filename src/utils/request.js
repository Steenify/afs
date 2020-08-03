import axios from 'axios';
import { grantType, HostAPI } from 'config';

import { getData } from 'utils';

export const request = async ({ host = '', url = '', method = 'GET', params = {}, data = {}, headers = {}, token = '', onUploadProgress }) => {
  const _token = token || getData('token');
  const uploadProgress = onUploadProgress || (() => {});
  const res = await axios({
    url: `${host || HostAPI}${url}`,
    method,
    data,
    params,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${grantType} ${_token}`,
      ...headers,
    },
    onUploadProgress: uploadProgress,
  });
  return res;
};

export const fakeRequest = (response) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: response,
      });
    }, 1500);
  });

export default request;
