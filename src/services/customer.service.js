import { request } from 'utils/request';

const CUSTOMER_GROUPS_API = '/api/customer-groups';
const CUSTOMER_API = '/api/customers';

export const getAllCustomerGroups = () =>
  request({
    url: CUSTOMER_GROUPS_API,
    method: 'GET',
  });

export const getCustomerGroup = (id) =>
  request({
    url: CUSTOMER_GROUPS_API + `/${id}`,
    method: 'GET',
  });

export const createCustomerGroup = (data) =>
  request({
    url: CUSTOMER_GROUPS_API,
    method: 'POST',
    data,
  });

export const updateCustomerGroup = (data) =>
  request({
    url: CUSTOMER_GROUPS_API,
    method: 'PUT',
    data,
  });

export const deleteCustomerGroup = (id) =>
  request({
    url: CUSTOMER_GROUPS_API + `/${id}`,
    method: 'DELETE',
  });

export const getCustomers = (data) =>
  request({
    url: CUSTOMER_API,
    method: 'GET',
    params: data,
  });

export const getCustomer = (login) =>
  request({
    url: CUSTOMER_API + `/${login}`,
    method: 'GET',
  });

export const updateCustomer = (data) =>
  request({
    url: CUSTOMER_API,
    method: 'PUT',
    data: data,
  });

export const createCustomer = (data) =>
  request({
    url: CUSTOMER_API,
    method: 'POST',
    data: data,
  });
