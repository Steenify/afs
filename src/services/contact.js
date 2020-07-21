import { request } from 'utils/request';

const CONTACT_API = '/api/contacts';

export const getAllContactsService = (params) =>
  request({
    url: CONTACT_API,
    method: 'GET',
    params,
  });
