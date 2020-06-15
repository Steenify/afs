import { request } from 'utils/request';

const ORDERS_API = '/api/bookings';

export const getAllOrdersService = (params) =>
  request({
    url: ORDERS_API,
    method: 'GET',
    params,
  });

export const getOrderService = (id) =>
  request({
    url: `${ORDERS_API}/${id}`,
    method: 'GET',
  });

export const updateOrderService = (data) =>
  request({
    url: `${ORDERS_API}`,
    method: 'PUT',
    data: data,
  });

export const updateOrderBudgetService = (data, id) =>
  request({
    url: `${ORDERS_API}/${id}/budget`,
    method: 'PUT',
    data: data,
  });

export const assignOrderService = ({ id, to }) =>
  request({
    url: `${ORDERS_API}/${id}/assign/${to}`,
    method: 'PUT',
  });

export const changeOrderStatusService = ({ id, to }) =>
  request({
    url: `${ORDERS_API}/${id}/status/${to}`,
    method: 'PUT',
  });

export const updateOrderItemSumarizeService = ({ id, itemId, data }) =>
  request({
    url: `${ORDERS_API}/${id}/items/${itemId}/summarize`,
    method: 'PUT',
    data,
  });

export const updateOrderItemFileService = ({ id, itemId, data }) =>
  request({
    url: `${ORDERS_API}/${id}/items/${itemId}/upload`,
    method: 'POST',
    data,
  });

export const getOrderCustomerService = (id) =>
  request({
    url: `${ORDERS_API}/${id}/customer`,
    method: 'GET',
  });

export const getOrderWorkLogService = ({ id }) =>
  request({
    url: `${ORDERS_API}/${id}/work-logs`,
    method: 'GET',
  });

export const uploadOrderWorkLogService = ({ id, logId, data }) =>
  request({
    url: `${ORDERS_API}/${id}/work-logs/${logId}/upload`,
    method: 'POST',
    data,
  });

export const approvedOrderWorkLogService = ({ id, logId }) =>
  request({
    url: `${ORDERS_API}/${id}/work-logs/${logId}/approve`,
    method: 'PUT',
  });

export const rejectedOrderWorkLogService = ({ id, logId }) =>
  request({
    url: `${ORDERS_API}/${id}/work-logs/${logId}/reject`,
    method: 'PUT',
  });

export const getOrderEmailService = ({ id, templateId }) =>
  request({
    url: `${ORDERS_API}/${id}/email/${templateId}`,
    method: 'GET',
  });

export const sentOrderEmailNotifyService = ({ id, data }) =>
  request({
    url: `${ORDERS_API}/${id}/email`,
    method: 'POST',
    data,
  });

export const uploadOrderWorkLogCommentService = ({ id, logId, data }) =>
  request({
    url: `${ORDERS_API}/${id}/work-logs/${logId}/comments`,
    method: 'POST',
    data,
  });

export const deleteOrderWorkLogCommentService = ({ id, logId, comId }) =>
  request({
    url: `${ORDERS_API}/${id}/work-logs/${logId}/comments/${comId}`,
    method: 'DELETE',
  });

export const updateOrderWorkLogCommentService = ({ id, logId, comId, data }) =>
  request({
    url: `${ORDERS_API}/${id}/work-logs/${logId}/comments/${comId}`,
    method: 'PUT',
    data,
  });

export const updateOrderArtistPaymentService = (id, data) =>
  request({
    url: `${ORDERS_API}/${id}/artist-payment-status`,
    method: 'PUT',
    data,
  });

export const updateOrderArtistPaymentBulkService = (status, data) =>
  request({
    url: `${ORDERS_API}/artist-payment-status/${status}`,
    method: 'PUT',
    data,
  });
export const getOrderCountByStatusService = () =>
  request({
    url: `${ORDERS_API}/count-by-status`,
    method: 'GET',
  });
