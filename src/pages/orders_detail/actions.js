import { find, findIndex } from 'lodash';
import { toast } from 'react-toastify';

import { actionCreator, actionTryCatchCreator } from 'utils';
import {
  getOrderService,
  updateOrderItemSumarizeService,
  updateOrderItemFileService,
  getOrderCustomerService,
  changeOrderStatusService,
  getOrderWorkLogService,
  getOrderCanvasWorkLogService,
  createOrderCanvasWorkLogService,
  uploadOrderWorkLogService,
  uploadOrderWorkLogCommentService,
  deleteOrderWorkLogCommentService,
  updateOrderWorkLogCommentService,
  approvedOrderWorkLogService,
  rejectedOrderWorkLogService,
  canceledOrderWorkLogService,
  getOrderEmailService,
  sentOrderEmailNotifyService,
  deleteFileDeliveryService,
  deleteFileSumaryService,
  getOrderFBTemplateService,
  sentOrderFBTemplateNotifyService,
  deleteOrderWorkLogAttachmentService,
  updateOrderCanvasTrackingCodeWorkLogService,
  getEmailRemindTemplateService,
  getMessageRemindTemplateService,
  sendEmailRemindService,
  sendMessageRemindService,
  setOrderCustomerService,
  addOrderItemService,
  getOrderTodoList,
  createOrderTodoList,
  updateOrderTodoList,
  resolvedOrderTodoList,
  removeOrderTodoList,
  getBudgetsHistoryService,
  updateOrderBudgetService,
  adjustOrderBudgetService,
} from 'services/order';
import { getAssignArtistsService } from 'services/artist';

export const ORDER_DETAIL_ACTIONS = {
  UPDATE_ORDER_ITEM_SUMARIZE: 'UPDATE_ORDER_ITEM_SUMARIZE',
  UPDATE_SHOW_EMAIL_NOTIFY: 'UPDATE_SHOW_EMAIL_NOTIFY',
  UPDATE_EMAIL_NOTIFY: 'UPDATE_EMAIL_NOTIFY',
  UPDATE_FB_TEMPLATE_NOTIFY: 'UPDATE_FB_TEMPLATE_NOTIFY',
  UPDATE_REMIND_TEMPLATE: 'UPDATE_REMIND_TEMPLATE',
  UPDATE_ORDER_CUSTOMER: 'UPDATE_ORDER_CUSTOMER',
  UPDATE_SHOW_EMAIL_REMIND: 'UPDATE_SHOW_EMAIL_REMIND',
  UPDATE_SHOW_ADD_PRODUCT_MODAL: 'UPDATE_SHOW_ADD_PRODUCT_MODAL',
  UPDATE_SHOW_ASSIGNED_MODAL: 'UPDATE_SHOW_ASSIGNED_MODAL',
  SET_ORDER_DETAIL_BUDGET: 'SET_ORDER_DETAIL_BUDGET',
};

export const updateOrderItemSumarizeAction = (payload) => (dispatch) => {
  dispatch({
    type: ORDER_DETAIL_ACTIONS.UPDATE_ORDER_ITEM_SUMARIZE,
    payload,
  });
};
export const updateShowEmailNotifyAction = (payload) => (dispatch) => {
  dispatch({
    type: ORDER_DETAIL_ACTIONS.UPDATE_SHOW_EMAIL_NOTIFY,
    payload,
  });
};
export const updateShowEmailRemindAction = (payload) => (dispatch) => {
  dispatch({
    type: ORDER_DETAIL_ACTIONS.UPDATE_SHOW_EMAIL_REMIND,
    payload,
  });
};

export const updatOrderCustomerAction = (payload) => (dispatch) => {
  dispatch({
    type: ORDER_DETAIL_ACTIONS.UPDATE_ORDER_CUSTOMER,
    payload,
  });
};
export const updateEmailNotifyAction = (payload) => (dispatch) => {
  dispatch({
    type: ORDER_DETAIL_ACTIONS.UPDATE_EMAIL_NOTIFY,
    payload,
  });
};
export const updateShowAddProductAction = (payload) => (dispatch) => {
  dispatch({
    type: ORDER_DETAIL_ACTIONS.UPDATE_SHOW_ADD_PRODUCT_MODAL,
    payload,
  });
};
export const updateRemindTemplateAction = (
  payload = {
    fbTemplate: '',
    fbTemplateAttachments: [],
    email: '',
    emailTitle: '',
  },
) => (dispatch) => {
  dispatch({
    type: ORDER_DETAIL_ACTIONS.UPDATE_REMIND_TEMPLATE,
    payload,
  });
};

export const updateFbTemplateNotifyAction = (payload) => (dispatch) => {
  dispatch({
    type: ORDER_DETAIL_ACTIONS.UPDATE_FB_TEMPLATE_NOTIFY,
    payload,
  });
};

export const GET_ORDER_DETAIL_ACTION = actionCreator('GET_ORDER_DETAIL_ACTION');
export const getOrderDetailAction = (id) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_ORDER_DETAIL_ACTION.PENDING,
    });
  };
  const onSuccess = (data, headers) => {
    dispatch({
      type: GET_ORDER_DETAIL_ACTION.SUCCESS,
      payload: { data, headers },
    });
  };
  const onError = (error) => {
    console.log('getOrderDetailAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: GET_ORDER_DETAIL_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getOrderService(id),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_ORDER_ITEM_SUMARIZE_ACTION = actionCreator('UPDATE_ORDER_ITEM_SUMARIZE_ACTION');
export const updateOrderItemSumarizeAPIAction = (id, itemId, data, cb) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: UPDATE_ORDER_ITEM_SUMARIZE_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: UPDATE_ORDER_ITEM_SUMARIZE_ACTION.SUCCESS,
    });

    cb && cb(data);
  };
  const onError = (error) => {
    console.log('updateOrderItemSumarizeAPIAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: UPDATE_ORDER_ITEM_SUMARIZE_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: updateOrderItemSumarizeService({ id, itemId, data }),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_ORDER_ITEM_FILES_ACTION = actionCreator('UPDATE_ORDER_ITEM_FILES_ACTION');
export const updateOrderItemFilesAction = (id, itemId, index, data, files, cb) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: UPDATE_ORDER_ITEM_FILES_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    if (data) {
      dispatch({
        type: UPDATE_ORDER_ITEM_FILES_ACTION.SUCCESS,
        payload: { data: files, index },
      });
      cb && cb(data);
    } else {
      toast.error('Can not saved file, Please try again later!');
    }
  };
  const onError = (error) => {
    console.log('updateOrderItemSumarizeAPIAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: UPDATE_ORDER_ITEM_FILES_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: updateOrderItemFileService({ id, itemId, data }),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_ORDER_CUSTOMER_ACTION = actionCreator('GET_ORDER_CUSTOMER_ACTION');
export const getOrderCustomerAction = (id) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_ORDER_CUSTOMER_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: GET_ORDER_CUSTOMER_ACTION.SUCCESS,
      payload: { data },
    });
  };
  const onError = (error) => {
    console.log('getOrderCustomerAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: GET_ORDER_CUSTOMER_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getOrderCustomerService(id),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_ORDER_STATUS_ACTION = actionCreator('UPDATE_ORDER_STATUS_ACTION');
export const updateOrderStatusAction = (id, to, artistId) => (dispatch, getState) => {
  const { status } = getState().orderTable.orders;

  const onPending = () => {
    dispatch({
      type: UPDATE_ORDER_STATUS_ACTION.PENDING,
    });
  };

  const onSuccess = (data) => {
    const newStatus = find(status, (sta) => sta.id === data.statusId) || {};

    dispatch({
      type: UPDATE_ORDER_STATUS_ACTION.SUCCESS,
      payload: {
        status: newStatus.name,
        data,
        artistId,
      },
    });
  };

  const onError = (error) => {
    console.log('updateOrderStatusAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: UPDATE_ORDER_STATUS_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: changeOrderStatusService({ id, to }),
    onPending,
    onSuccess,
    onError,
  });
};

export const CREATE_ORDER_CANVAS_WORK_LOG_ACTION = actionCreator('CREATE_ORDER_CANVAS_WORK_LOG_ACTION');
export const createOrderCanvasWorkLogAction = (id, logId, workLogType = 'workLog') => (dispatch, getState) => {
  const workLog = getState().orderDetail.data[workLogType];
  const workLogIndex = findIndex(workLog, (log) => log.id === logId);

  const onPending = () => {
    dispatch({
      type: CREATE_ORDER_CANVAS_WORK_LOG_ACTION.PENDING,
    });
  };

  const onSuccess = (data) => {
    const { accountInfo } = getState().auth.data;
    const actor = `${accountInfo?.firstName || ''} ${accountInfo?.lastName || ''}`;

    const activives = [
      {
        activityType: 'APPROVED',
        actor,
        lastActionDate: new Date(),
      },
    ];
    dispatch({
      type: APPROVED_WORK_LOG_ACTION.SUCCESS,
      payload: { index: workLogIndex, activives, isStartingCanvas: true, workLogType },
    });
    dispatch({
      type: CREATE_ORDER_CANVAS_WORK_LOG_ACTION.SUCCESS,
      payload: { data },
    });
  };

  const onError = (error) => {
    console.log('createOrderCanvasWorkLogAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: CREATE_ORDER_CANVAS_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: createOrderCanvasWorkLogService({ id }),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_ORDER_CANVAS_WORK_LOG_ACTION = actionCreator('GET_ORDER_CANVAS_WORK_LOG_ACTION');
export const getOrderCanvasWorkLogAction = (id) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_ORDER_CANVAS_WORK_LOG_ACTION.PENDING,
    });
  };

  const onSuccess = (data) => {
    dispatch({
      type: GET_ORDER_CANVAS_WORK_LOG_ACTION.SUCCESS,
      payload: { data },
    });
  };

  const onError = (error) => {
    console.log('getOrderCanvasWorkLogAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: GET_ORDER_CANVAS_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getOrderCanvasWorkLogService({ id }),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_ORDER_WORK_LOG_ACTION = actionCreator('GET_ORDER_WORK_LOG_ACTION');
export const getOrderWorkLogAction = (id) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_ORDER_WORK_LOG_ACTION.PENDING,
    });
  };

  const onSuccess = (data) => {
    dispatch({
      type: GET_ORDER_WORK_LOG_ACTION.SUCCESS,
      payload: { data },
    });
  };

  const onError = (error) => {
    console.log('updateOrderWorkLoadAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: GET_ORDER_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getOrderWorkLogService({ id }),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPLOAD_FILE_WORK_LOG_ACTION = actionCreator('UPLOAD_FILE_WORK_LOG_ACTION');
export const uploadFileWorkLogAction = (id, logId, payload, index, files, cb, workLogType = 'workLog', artistId) => (dispatch, getState) => {
  const onPending = () => {
    dispatch({
      type: UPLOAD_FILE_WORK_LOG_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    const { accountInfo } = getState().auth.data;
    const actor = `${accountInfo?.firstName || ''} ${accountInfo?.lastName || ''}`;

    const activives = [
      {
        activityType: 'UPLOADED',
        actor,
        lastActionDate: new Date(),
      },
    ];

    if (data) {
      cb && cb();
      dispatch({
        type: UPLOAD_FILE_WORK_LOG_ACTION.SUCCESS,
        payload: { data: files, index, activives, workLogType, artistId },
      });
    } else {
      toast.error('Can not saved file, Please try again later!');
    }
  };
  const onError = (error) => {
    console.log('uploadFileWorkLogAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: UPLOAD_FILE_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: uploadOrderWorkLogService({ id, logId, data: payload }),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPLOAD_COMMENT_WORK_LOG_ACTION = actionCreator('UPLOAD_COMMENT_WORK_LOG_ACTION');
export const uploadCommentWorkLogAction = (id, logId, payload, index, cb, workLogType = 'workLog', artistId) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: UPLOAD_COMMENT_WORK_LOG_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: UPLOAD_COMMENT_WORK_LOG_ACTION.SUCCESS,
      payload: { data, index, workLogType, artistId },
    });

    cb && cb();
  };
  const onError = (error) => {
    console.log('uploadCommentWorkLogAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: UPLOAD_COMMENT_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: uploadOrderWorkLogCommentService({ id, logId, data: payload }),
    onPending,
    onSuccess,
    onError,
  });
};

export const DELETE_ATTACHMENT_WORK_LOG_ACTION = actionCreator('DELETE_ATTACHMENT_WORK_LOG_ACTION');
export const deleteAttachmentWorkLogAction = (id, logId, attachmentId, logIndex, attachmentIndex, cb, workLogType = 'workLog', artistId) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: DELETE_ATTACHMENT_WORK_LOG_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    if (cb) cb();
    dispatch({
      type: DELETE_ATTACHMENT_WORK_LOG_ACTION.SUCCESS,
      payload: { logIndex, attachmentIndex, workLogType, artistId },
    });
  };
  const onError = (error) => {
    console.log('deleteAttachmentWorkLogAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: DELETE_ATTACHMENT_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: deleteOrderWorkLogAttachmentService({ id, logId, attachmentId }),
    onPending,
    onSuccess,
    onError,
  });
};

export const DELETE_COMMENT_WORK_LOG_ACTION = actionCreator('DELETE_COMMENT_WORK_LOG_ACTION');
export const deleteCommentWorkLogAction = (id, logId, comId, logIndex, comIndex, workLogType = 'workLog', artistId) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: DELETE_COMMENT_WORK_LOG_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: DELETE_COMMENT_WORK_LOG_ACTION.SUCCESS,
      payload: { logIndex, comIndex, workLogType, artistId },
    });
  };
  const onError = (error) => {
    console.log('deleteCommentWorkLogAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: DELETE_COMMENT_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: deleteOrderWorkLogCommentService({ id, logId, comId }),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_TRACKING_CODE_WORK_LOG_ACTION = actionCreator('UPDATE_TRACKING_CODE_WORK_LOG_ACTION');
export const updateTrackingCodeWorkLogAction = (id, data, cb) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: UPDATE_TRACKING_CODE_WORK_LOG_ACTION.PENDING,
    });
  };
  const onSuccess = () => {
    dispatch({
      type: UPDATE_TRACKING_CODE_WORK_LOG_ACTION.SUCCESS,
      payload: { id, data },
    });
    cb && cb();
  };
  const onError = (error) => {
    console.log('updateTrackingCodeWorkLogAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: UPDATE_TRACKING_CODE_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: updateOrderCanvasTrackingCodeWorkLogService({ id, data }),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_COMMENT_WORK_LOG_ACTION = actionCreator('UPDATE_COMMENT_WORK_LOG_ACTION');
export const updateCommentWorkLogAction = (id, logId, comId, payload, logIndex, comIndex, cb, workLogType = 'workLog', artistId) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: UPDATE_COMMENT_WORK_LOG_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: UPDATE_COMMENT_WORK_LOG_ACTION.SUCCESS,
      payload: { logIndex, comIndex, data, workLogType, artistId },
    });
    cb && cb();
  };
  const onError = (error) => {
    console.log('updateCommentWorkLogAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: UPDATE_COMMENT_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: updateOrderWorkLogCommentService({
      id,
      logId,
      comId,
      data: payload,
    }),
    onPending,
    onSuccess,
    onError,
  });
};

export const APPROVED_WORK_LOG_ACTION = actionCreator('APPROVED_WORK_LOG_ACTION');
export const approvedWorkLogAction = (id, logId, workLogType = 'workLog', isMarkAsDone = false, artistId) => (dispatch, getState) => {
  const workLog = getState().orderDetail.data[workLogType]?.[artistId] || [];
  const workLogIndex = findIndex(workLog, (log) => log.id === logId);

  const onPending = () => {
    dispatch({
      type: APPROVED_WORK_LOG_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    const { accountInfo } = getState().auth.data;
    const actor = `${accountInfo?.firstName || ''} ${accountInfo?.lastName || ''}`;

    const activives = [
      {
        activityType: 'APPROVED',
        actor,
        lastActionDate: new Date(),
      },
    ];
    dispatch({
      type: APPROVED_WORK_LOG_ACTION.SUCCESS,
      payload: { data, index: workLogIndex, activives, workLogType, isMarkAsDone, artistId },
    });
  };
  const onError = (error) => {
    console.log('approvedWorkLogAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: APPROVED_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: approvedOrderWorkLogService({ id, logId }),
    onPending,
    onSuccess,
    onError,
  });
};

export const REJECTED_WORK_LOG_ACTION = actionCreator('REJECTED_WORK_LOG_ACTION');
export const rejectedWorkLogAction = (id, logId, payload, index, cb, workLogType = 'workLog', artistId) => (dispatch, getState) => {
  // const { workLog } = getState().orderDetail.data;
  // const workLogIndex = findIndex(workLog, (log) => log.id === logId);

  const onPending = () => {
    dispatch({
      type: REJECTED_WORK_LOG_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    cb && cb();

    const { accountInfo } = getState().auth.data;
    const actor = `${accountInfo?.firstName || ''} ${accountInfo?.lastName || ''}`;

    const activives = [
      {
        activityType: 'REJECTED',
        actor,
        lastActionDate: new Date(),
      },
    ];

    const comment = data?.comments[0] || {};
    dispatch({
      type: UPLOAD_COMMENT_WORK_LOG_ACTION.SUCCESS,
      payload: { data: comment, index, workLogType, artistId },
    });

    data.comments = [];

    dispatch({
      type: REJECTED_WORK_LOG_ACTION.SUCCESS,
      payload: { data, index, activives, workLogType, artistId },
    });
  };
  const onError = (error) => {
    console.log('rejectedWorkLogAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: REJECTED_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: rejectedOrderWorkLogService({ id, logId, data: payload }),
    onPending,
    onSuccess,
    onError,
  });
};

export const CANCELED_WORK_LOG_ACTION = actionCreator('CANCELED_WORK_LOG_ACTION');
export const canceledWorkLogAction = (id, logId, index, workLogType = 'workLog', artistId) => (dispatch, getState) => {
  const onPending = () => {
    dispatch({
      type: CANCELED_WORK_LOG_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    console.log('onSuccess -> data', data);
    dispatch({
      type: CANCELED_WORK_LOG_ACTION.SUCCESS,
      payload: {
        index,
        workLogType,
        orderStatus: data?.status || '',
        artistId,
      },
    });
  };
  const onError = (error) => {
    console.log('canceledWorkLogAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: CANCELED_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: canceledOrderWorkLogService({ id, logId }),
    onPending,
    onSuccess,
    onError,
  });
};

export const getNotifyTemplatesAction = (id, templateId, workLogIndex, workLogType = 'workLog', artistId) => (dispatch) => {
  dispatch(getEmailTemplateAction(id, templateId, workLogIndex, workLogType, artistId));
  dispatch(getFBMessageTemplateAction(id, templateId, workLogIndex, workLogType, artistId));
};

export const getRemindTemplatesAction = (id, workLogIndex, workLogType = 'workLog', artistId) => (dispatch) => {
  dispatch(getRemindEmailTemplateAction(id, workLogIndex, workLogType, artistId));
  dispatch(getRemindFBMessageTemplateAction(id, workLogIndex, workLogType, artistId));
};

export const GET_EMAIL_TEMPLATE_ACTION = actionCreator('GET_EMAIL_TEMPLATE_ACTION');
export const getEmailTemplateAction = (id, templateId, workLogIndex, workLogType = 'workLog', artistId) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_EMAIL_TEMPLATE_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: GET_EMAIL_TEMPLATE_ACTION.SUCCESS,
      payload: { data, templateId, workLogIndex, workLogType, artistId },
    });
  };
  const onError = (error) => {
    console.log('getEmailTemplateAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: GET_EMAIL_TEMPLATE_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getOrderEmailService({ id, templateId }),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_REMIND_EMAIL_TEMPLATE_ACTION = actionCreator('GET_REMIND_EMAIL_TEMPLATE_ACTION');
export const getRemindEmailTemplateAction = (id, workLogIndex, workLogType = 'workLog', artistId) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_REMIND_EMAIL_TEMPLATE_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: GET_REMIND_EMAIL_TEMPLATE_ACTION.SUCCESS,
      payload: { data, workLogIndex, workLogType, artistId },
    });
  };
  const onError = (error) => {
    console.log('getRemindEmailTemplateAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: GET_REMIND_EMAIL_TEMPLATE_ACTION.ERROR,
      payload: error.response,
    });
  };

  //TODO: create services for (getEmailTemplate, getFBTemplate, sendEmail, sendFB) for remind action when api available
  actionTryCatchCreator({
    service: getEmailRemindTemplateService(id),
    onPending,
    onSuccess,
    onError,
  });
};

export const SENT_EMAIL_NOTIFY_ACTION = actionCreator('SENT_EMAIL_NOTIFY_ACTION');
export const sendEmailNotifyAction = (customerEmail = '', workLogType = 'workLog') => (dispatch, getState) => {
  const onPending = () => {
    dispatch({
      type: SENT_EMAIL_NOTIFY_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    const { accountInfo } = getState().auth.data;
    const actor = `${accountInfo?.firstName || ''} ${accountInfo?.lastName || ''}`;

    const activives = [
      {
        activityType: 'NOTIFIED_CUSTOMER',
        actor,
        lastActionDate: new Date(),
        notificationChannel: 'EMAIL',
      },
    ];
    dispatch({
      type: SENT_EMAIL_NOTIFY_ACTION.SUCCESS,
      payload: {
        activives,
        workLogType,
      },
    });
    toast.dark('Notified Customer!');
  };
  const onError = (error) => {
    console.log('sendEmailNotifyAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: SENT_EMAIL_NOTIFY_ACTION.ERROR,
      payload: error.response,
    });
  };

  const { data } = getState().orderDetail;
  const { email, order } = data;
  const payload = {
    content: email,
    to: customerEmail,
  };
  actionTryCatchCreator({
    service: sentOrderEmailNotifyService({ id: order.id, data: payload }),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_FB_MESSAGE_TEMPLATE_ACTION = actionCreator('GET_FB_MESSAGE_TEMPLATE_ACTION');
export const getFBMessageTemplateAction = (id, templateId, workLogIndex, workLogType = 'workLog', artistId) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_FB_MESSAGE_TEMPLATE_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: GET_FB_MESSAGE_TEMPLATE_ACTION.SUCCESS,
      payload: { data, templateId, workLogIndex, workLogType, artistId },
    });
  };
  const onError = (error) => {
    console.log('getFBMessageTemplateAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: GET_FB_MESSAGE_TEMPLATE_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getOrderFBTemplateService({ id, templateId }),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_REMIND_FB_MESSAGE_TEMPLATE_ACTION = actionCreator('GET_REMIND_FB_MESSAGE_TEMPLATE_ACTION');
export const getRemindFBMessageTemplateAction = (id, workLogIndex, workLogType = 'workLog', artistId) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_REMIND_FB_MESSAGE_TEMPLATE_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: GET_REMIND_FB_MESSAGE_TEMPLATE_ACTION.SUCCESS,
      payload: { data, workLogIndex, workLogType, artistId },
    });
  };
  const onError = (error) => {
    console.log('getRemindFBMessageTemplateAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: GET_REMIND_FB_MESSAGE_TEMPLATE_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getMessageRemindTemplateService(id),
    onPending,
    onSuccess,
    onError,
  });
};

export const SENT_FB_MESSAGES_NOTIFY_ACTION = actionCreator('SENT_FB_MESSAGES_NOTIFY_ACTION');
export const sendFBMessageNotifyAction = (psid, workLogType = 'workLog') => (dispatch, getState) => {
  const onPending = () => {
    dispatch({
      type: SENT_FB_MESSAGES_NOTIFY_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    const { accountInfo } = getState().auth.data;
    const actor = `${accountInfo?.firstName || ''} ${accountInfo?.lastName || ''}`;

    const activives = [
      {
        activityType: 'NOTIFIED_CUSTOMER',
        actor,
        lastActionDate: new Date(),
        notificationChannel: 'MESSENGER',
      },
    ];
    dispatch({
      type: SENT_FB_MESSAGES_NOTIFY_ACTION.SUCCESS,
      payload: {
        activives,
        workLogType,
      },
    });
    toast.dark('Notified Customer!');
  };
  const onError = (error) => {
    console.log('sendFBMessageNotifyAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: SENT_FB_MESSAGES_NOTIFY_ACTION.ERROR,
      payload: error.response,
    });
  };

  const { data } = getState().orderDetail;
  const { fbTemplate, order, fbTemplateAttachments } = data;
  const payload = {
    content: fbTemplate,
    attachments: fbTemplateAttachments || [],
    psid: psid || '',
  };
  actionTryCatchCreator({
    service: sentOrderFBTemplateNotifyService({ id: order.id, data: payload }),
    onPending,
    onSuccess,
    onError,
  });
};

export const DELETE_FILE_DELIVERY_ACTION = actionCreator('DELETE_FILE_DELIVERY_ACTION');
export const deleteFileDeliveryAction = (id, fileId, logIndex, fileIndex, cb, workLogType = 'workLog', artistId) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: DELETE_FILE_DELIVERY_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    if (data) {
      cb && cb();
      dispatch({
        type: DELETE_FILE_DELIVERY_ACTION.SUCCESS,
        payload: { logIndex, fileIndex, workLogType, artistId },
      });
    } else {
      toast.error('Can not delete file, Please try again later!');
    }
  };
  const onError = (error) => {
    console.log('deleteFileDeliveryAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: DELETE_FILE_DELIVERY_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: deleteFileDeliveryService(id, fileId),
    onPending,
    onSuccess,
    onError,
  });
};

export const DELETE_FILE_SUMMARY_ACTION = actionCreator('DELETE_FILE_SUMMARY_ACTION');
export const deleteFileSummaryAction = (id, itemId, fileId, itemIndex, fileIndex, cb) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: DELETE_FILE_SUMMARY_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    if (data) {
      cb && cb();
      dispatch({
        type: DELETE_FILE_SUMMARY_ACTION.SUCCESS,
        payload: { itemIndex, fileIndex },
      });
    } else {
      toast.error('Can not delete file, Please try again later!');
    }
  };
  const onError = (error) => {
    console.log('deleteFileSummaryAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: DELETE_FILE_SUMMARY_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: deleteFileSumaryService(id, itemId, fileId),
    onPending,
    onSuccess,
    onError,
  });
};

export const SENT_EMAIL_REMIND_ACTION = actionCreator('SENT_EMAIL_REMIND_ACTION');
export const sentEmailRemindAction = (data, orderId, workLogType = 'workLog') => (dispatch, getState) => {
  const onPending = () => {
    dispatch({
      type: SENT_EMAIL_REMIND_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    const { accountInfo } = getState().auth.data;
    const actor = `${accountInfo?.firstName || ''} ${accountInfo?.lastName || ''}`;

    const activives = [
      {
        activityType: 'REMINDER_CUSTOMER',
        actor,
        lastActionDate: new Date(),
        notificationChannel: 'EMAIL',
      },
    ];
    dispatch({
      type: SENT_EMAIL_REMIND_ACTION.SUCCESS,
      payload: {
        activives,
        workLogType,
      },
    });
    toast.dark('Reminded Customer via email!');
  };
  const onError = (error) => {
    console.log('sendEmailNotifyAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: SENT_EMAIL_REMIND_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: sendEmailRemindService(data, orderId),
    onPending,
    onSuccess,
    onError,
  });
};

export const SENT_MESSAGE_REMIND_ACTION = actionCreator('SENT_MESSAGE_REMIND_ACTION');
export const sentMessageRemindAction = (data, orderId, workLogType = 'workLog') => (dispatch, getState) => {
  const onPending = () => {
    dispatch({
      type: SENT_MESSAGE_REMIND_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    const { accountInfo } = getState().auth.data;
    const actor = `${accountInfo?.firstName || ''} ${accountInfo?.lastName || ''}`;

    const activives = [
      {
        activityType: 'REMINDER_CUSTOMER',
        actor,
        lastActionDate: new Date(),
        notificationChannel: 'MESSENGER',
      },
    ];
    dispatch({
      type: SENT_MESSAGE_REMIND_ACTION.SUCCESS,
      payload: {
        activives,
        workLogType,
      },
    });
    toast.dark('Reminded Customer via fb/ig!');
  };
  const onError = (error) => {
    console.log('sendEmailNotifyAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: SENT_MESSAGE_REMIND_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: sendMessageRemindService(data, orderId),
    onPending,
    onSuccess,
    onError,
  });
};

export const setOrderCustomerBookingAction = (payload, orderId, cb) => (dispatch, getState) => {
  const onPending = () => {};
  const onSuccess = (data) => {
    cb && cb();
    getOrderCustomerAction(orderId)(dispatch, getState);
  };
  const onError = (error) => {
    console.log('setOrderCustomerBookingAction -> onError -> error', JSON.stringify(error));
  };

  actionTryCatchCreator({
    service: setOrderCustomerService(payload, orderId),
    onPending,
    onSuccess,
    onError,
  });
};

export const ADD_ORDER_ITEM_ACTION = actionCreator('ADD_ORDER_ITEM_ACTION');
export const addOrderItemAction = (orderId, data, cb) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: ADD_ORDER_ITEM_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: ADD_ORDER_ITEM_ACTION.SUCCESS,
      payload: data,
    });
    cb && cb();
  };
  const onError = (error) => {
    console.log('addOrderItemAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: ADD_ORDER_ITEM_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: addOrderItemService(orderId, data),
    onPending,
    onSuccess,
    onError,
  });
};

export const getBudgetsHistoryAction = ({ orderId = '', onPending = () => {}, onSuccess = () => {}, onError = () => {} }) => (dispatch) => {
  actionTryCatchCreator({
    service: getBudgetsHistoryService(orderId),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_ORDER_TODO_LIST_ACTION = actionCreator('GET_ORDER_TODO_LIST_ACTION');
export const getOrderTodoListAction = (orderId) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_ORDER_TODO_LIST_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: GET_ORDER_TODO_LIST_ACTION.SUCCESS,
      payload: data,
    });
  };
  const onError = (error) => {
    dispatch({
      type: GET_ORDER_TODO_LIST_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getOrderTodoList(orderId),
    onPending,
    onSuccess,
    onError,
  });
};

export const CREATE_ORDER_TODO_LIST_ACTION = actionCreator('CREATE_ORDER_TODO_LIST_ACTION');
export const createOrderTodoListAction = (orderId, payload, cb) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: CREATE_ORDER_TODO_LIST_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: CREATE_ORDER_TODO_LIST_ACTION.SUCCESS,
      payload: data,
    });
    cb && cb();
  };
  const onError = (error) => {
    console.log('createOrderTodoListAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: CREATE_ORDER_TODO_LIST_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: createOrderTodoList(orderId, payload),
    onPending,
    onSuccess,
    onError,
  });
};

export const EDIT_ORDER_TODO_LIST_ACTION = actionCreator('EDIT_ORDER_TODO_LIST_ACTION');
export const editOrderTodoListAction = (orderId, todoId, payload, index, cb) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: EDIT_ORDER_TODO_LIST_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: EDIT_ORDER_TODO_LIST_ACTION.SUCCESS,
      payload: {
        data,
        index,
      },
    });
    cb && cb();
  };
  const onError = (error) => {
    console.log('editOrderTodoListAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: EDIT_ORDER_TODO_LIST_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: updateOrderTodoList(orderId, todoId, payload),
    onPending,
    onSuccess,
    onError,
  });
};

export const RESOLVED_ORDER_TODO_LIST_ACTION = actionCreator('RESOLVED_ORDER_TODO_LIST_ACTION');
export const resolvedOrderTodoListAction = (orderId, todoId, index, cb) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: RESOLVED_ORDER_TODO_LIST_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: RESOLVED_ORDER_TODO_LIST_ACTION.SUCCESS,
      payload: {
        data,
        index,
      },
    });
    cb && cb();
  };
  const onError = (error) => {
    console.log('resolvedOrderTodoList => onError -> error', JSON.stringify(error));
    dispatch({
      type: RESOLVED_ORDER_TODO_LIST_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: resolvedOrderTodoList(orderId, todoId),
    onPending,
    onSuccess,
    onError,
  });
};
export const REMOVE_ORDER_TODO_LIST_ACTION = actionCreator('REMOVE_ORDER_TODO_LIST_ACTION');
export const removeOrderTodoListAction = (orderId, todoId, index, cb) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: REMOVE_ORDER_TODO_LIST_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: REMOVE_ORDER_TODO_LIST_ACTION.SUCCESS,
      payload: {
        index,
      },
    });
    cb && cb();
  };
  const onError = (error) => {
    console.log('removeOrderTodoListAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: REMOVE_ORDER_TODO_LIST_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: removeOrderTodoList(orderId, todoId),
    onPending,
    onSuccess,
    onError,
  });
};

export const updateShowAssignedBoxAction = (payload) => (dispatch) => {
  dispatch({
    type: ORDER_DETAIL_ACTIONS.UPDATE_SHOW_ASSIGNED_MODAL,
    payload,
  });
};

export const updateOrderBudgetAction = ({ orderId, data, onSuccess }) => (dispatch) => {
  actionTryCatchCreator({
    service: updateOrderBudgetService(data, orderId),
    onSuccess,
  });
};

export const adjustOrderBudgetAction = ({ orderId, data, onSuccess }) => (dispatch) => {
  actionTryCatchCreator({
    service: adjustOrderBudgetService(orderId, data),
    onSuccess,
  });
};

export const setBudgetAction = (payload) => (dispatch) => {
  dispatch({
    type: ORDER_DETAIL_ACTIONS.SET_ORDER_DETAIL_BUDGET,
    payload,
  });
};

export const getAssignArtistsAction = ({ params = '', onPending = () => {}, onSuccess = () => {}, onError = () => {} }) => (dispatch) => {
  actionTryCatchCreator({
    service: getAssignArtistsService(params),
    onPending,
    onSuccess,
    onError,
  });
};

export const ASSIGNED_MODAL_KEYs = {
  ASSIGNED: 'ASSIGNED',
  BUDGET_HISTORY: 'BUDGET_HISTORY',
  CHANGE_ARTIST: 'CHANGE_ARTIST',
  CHANGE_BUDGET: 'CHANGE_BUDGET',
  INCREASE_BUDGET: 'INCREASE_BUDGET',
  DECREASE_BUDGET: 'DECREASE_BUDGET',
};
