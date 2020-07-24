import { request } from 'utils/request';

const CUSTOMER_GROUPS_API = '/api/customer-groups';

export const getAllCustomerGroupsService = () =>
  request({
    url: CUSTOMER_GROUPS_API,
    method: 'GET',
  });

export const getCustomerGroupService = (id) =>
  request({
    url: CUSTOMER_GROUPS_API + `/${id}`,
    method: 'GET',
  });

export const createCustomerGroupService = (data) =>
  request({
    url: CUSTOMER_GROUPS_API,
    method: 'POST',
    data,
  });

export const updateCustomerGroupService = (data) =>
  request({
    url: CUSTOMER_GROUPS_API,
    method: 'PUT',
    data,
  });

export const deleteCustomerGroupService = (id) =>
  request({
    url: CUSTOMER_GROUPS_API + `/${id}`,
    method: 'DELETE',
  });
