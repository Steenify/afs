import { request } from 'utils/request';

const CUSTOMER_CARE_API = '/api/customers-care';

export const getRemindersService = (params) =>
  request({
    url: `${CUSTOMER_CARE_API}/reminders`,
    method: 'GET',
    params,
  });

export const markAsRemindedService = (data) =>
  request({
    url: `${CUSTOMER_CARE_API}/reminders/remind`,
    method: 'PUT',
    data,
  });
