import { request } from 'utils/request';

const CUSTOMER_API = '/api/customers';

export const getCustomersService = (data) =>
  request({
    url: CUSTOMER_API,
    method: 'GET',
    params: data,
  });

export const getCustomerDetailService = (login) =>
  request({
    url: CUSTOMER_API + `/${login}`,
    method: 'GET',
  });

export const updateCustomerService = (data) =>
  request({
    url: CUSTOMER_API,
    method: 'PUT',
    data: data,
  });

export const createCustomerService = (data) =>
  request({
    url: CUSTOMER_API,
    method: 'POST',
    data: data,
  });

export const updateCustomerTagsService = (login, data) =>
  request({
    url: CUSTOMER_API + `/${login}/tags`,
    method: 'PUT',
    data,
  });
