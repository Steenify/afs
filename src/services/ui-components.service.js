import { request } from 'utils/request';

const UI_COMPONENT_API = '/api/ui-components';

export const getUIComponentService = (params) =>
  request({
    url: UI_COMPONENT_API,
    method: 'GET',
    params,
  });

export const createUIComponentService = (data) =>
  request({
    url: UI_COMPONENT_API,
    method: 'POST',
    data,
  });

export const updateUIComponentService = (id, data) =>
  request({
    url: `${UI_COMPONENT_API}/${id}`,
    method: 'PUT',
    data,
  });

export const deleteUIComponentService = (id) =>
  request({
    url: `${UI_COMPONENT_API}/${id}`,
    method: 'DELETE',
  });
