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

export const assignCSOrderService = ({ id, to }) =>
  request({
    url: `${ORDERS_API}/${id}/assign-cs/${to}`,
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

export const setOrderCustomerService = (data, id) =>
  request({
    url: `${ORDERS_API}/${id}/customer`,
    method: 'PUT',
    data,
  });

export const getOrderWorkLogService = ({ id }) =>
  request({
    url: `${ORDERS_API}/${id}/work-logs`,
    method: 'GET',
  });

export const createOrderCanvasWorkLogService = ({ id }) =>
  request({
    url: `${ORDERS_API}/${id}/work-logs/canvas`,
    method: 'POST',
  });

export const getOrderCanvasWorkLogService = ({ id }) =>
  request({
    url: `${ORDERS_API}/${id}/work-logs/canvas`,
    method: 'GET',
  });

export const updateOrderCanvasTrackingCodeWorkLogService = ({ id, data }) =>
  request({
    url: `${ORDERS_API}/${id}/work-logs/canvas/tracking`,
    method: 'POST',
    data,
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

export const rejectedOrderWorkLogService = ({ id, logId, data }) =>
  request({
    url: `${ORDERS_API}/${id}/work-logs/${logId}/reject`,
    method: 'PUT',
    data,
  });

export const canceledOrderWorkLogService = ({ id, logId }) =>
  request({
    url: `${ORDERS_API}/${id}/work-logs/${logId}/cancel`,
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

export const getOrderFBTemplateService = ({ id, templateId }) =>
  request({
    url: `${ORDERS_API}/${id}/message/${templateId}`,
    method: 'GET',
  });

export const sentOrderFBTemplateNotifyService = ({ id, data }) =>
  request({
    url: `${ORDERS_API}/${id}/message`,
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

export const deleteOrderWorkLogAttachmentService = ({ id, logId, attachmentId }) =>
  request({
    url: `${ORDERS_API}/${id}/work-logs/${logId}/attachment/${attachmentId}`,
    method: 'DELETE',
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

export const getOrderBulkMarkAsDoneService = (data) =>
  request({
    url: `${ORDERS_API}/bulk/mark-as-done`,
    method: 'PUT',
    data,
  });

export const deleteFileDeliveryService = (orderid, fileId) =>
  request({
    url: `${ORDERS_API}/${orderid}/deliveries/attachments/${fileId}`,
    method: 'DELETE',
  });

export const deleteFileSumaryService = (orderid, itemId, fileId) =>
  request({
    url: `${ORDERS_API}/${orderid}/items/${itemId}/attachments/${fileId}`,
    method: 'DELETE',
  });

export const getEmailRemindTemplateService = (orderId) =>
  request({
    url: `${ORDERS_API}/${orderId}/remind/email`,
  });

export const getMessageRemindTemplateService = (orderId) =>
  request({
    url: `${ORDERS_API}/${orderId}/remind/message`,
  });

export const sendEmailRemindService = (data, orderId) =>
  request({
    url: `${ORDERS_API}/${orderId}/remind/email`,
    method: 'POST',
    data,
  });

export const sendMessageRemindService = (data, orderId) =>
  request({
    url: `${ORDERS_API}/${orderId}/remind/message`,
    method: 'POST',
    data,
  });

export const getAllBookingTagsService = (params) =>
  request({
    url: `${ORDERS_API}/tags`,
    method: 'GET',
    params,
  });

export const addOrderItemService = (orderId, data) =>
  request({
    url: `${ORDERS_API}/${orderId}/items`,
    method: 'POST',
    data,
  });

export const getOrderTodoList = (orderId) =>
  request({
    url: `${ORDERS_API}/${orderId}/todo-list`,
    method: 'GET',
  });

export const createOrderTodoList = (orderId, data) =>
  request({
    url: `${ORDERS_API}/${orderId}/todo-list`,
    method: 'POST',
    data,
  });

export const updateOrderTodoList = (orderId, todoId, data) =>
  request({
    url: `${ORDERS_API}/${orderId}/todo-list/${todoId}`,
    method: 'PUT',
    data,
  });

export const resolvedOrderTodoList = (orderId, todoId) =>
  request({
    url: `${ORDERS_API}/${orderId}/todo-list/${todoId}/resolve`,
    method: 'PUT',
  });

export const removeOrderTodoList = (orderId, todoId) =>
  request({
    url: `${ORDERS_API}/${orderId}/todo-list/${todoId}`,
    method: 'DELETE',
  });

export const getBudgetsHistoryService = (orderId) =>
  request({
    url: `${ORDERS_API}/${orderId}/budget/log`,
  });

export const adjustOrderBudgetService = (orderId, data) =>
  request({
    url: `${ORDERS_API}/${orderId}/budget/adjust`,
    method: 'PUT',
    data,
  });
