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
  uploadOrderWorkLogService,
  uploadOrderWorkLogCommentService,
  deleteOrderWorkLogCommentService,
  updateOrderWorkLogCommentService,
  approvedOrderWorkLogService,
  rejectedOrderWorkLogService,
  getOrderEmailService,
  sentOrderEmailNotifyService,
  deleteFileDeliveryService,
  deleteFileSumaryService,
  getOrderFBTemplateService,
  sentOrderFBTemplateNotifyService,
} from 'services/order';

export const ORDER_DETAIL_ACTIONS = {
  UPDATE_ORDER_ITEM_SUMARIZE: 'UPDATE_ORDER_ITEM_SUMARIZE',
  UPDATE_SHOW_EMAIL_NOTIFY: 'UPDATE_SHOW_EMAIL_NOTIFY',
  UPDATE_EMAIL_NOTIFY: 'UPDATE_EMAIL_NOTIFY',
  UPDATE_FB_TEMPLATE_NOTIFY: 'UPDATE_FB_TEMPLATE_NOTIFY',
  UPDATE_ORDER_CUSTOMER: 'UPDATE_ORDER_CUSTOMER',
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
export const updateOrderStatusAction = (id, to) => (dispatch, getState) => {
  const { status } = getState().order;

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
export const uploadFileWorkLogAction = (id, logId, payload, index, files, cb) => (dispatch, getState) => {
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
        payload: { data: files, index, activives },
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
export const uploadCommentWorkLogAction = (id, logId, payload, index, cb) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: UPLOAD_COMMENT_WORK_LOG_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: UPLOAD_COMMENT_WORK_LOG_ACTION.SUCCESS,
      payload: { data, index },
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

export const DELETE_COMMENT_WORK_LOG_ACTION = actionCreator('DELETE_COMMENT_WORK_LOG_ACTION');
export const deleteCommentWorkLogAction = (id, logId, comId, logIndex, comIndex) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: DELETE_COMMENT_WORK_LOG_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: DELETE_COMMENT_WORK_LOG_ACTION.SUCCESS,
      payload: { logIndex, comIndex },
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

export const UPDATE_COMMENT_WORK_LOG_ACTION = actionCreator('UPDATE_COMMENT_WORK_LOG_ACTION');
export const updateCommentWorkLogAction = (id, logId, comId, payload, logIndex, comIndex, cb) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: UPDATE_COMMENT_WORK_LOG_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: UPDATE_COMMENT_WORK_LOG_ACTION.SUCCESS,
      payload: { logIndex, comIndex, data },
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
export const approvedWorkLogAction = (id, logId) => (dispatch, getState) => {
  const { workLog } = getState().orderDetail.data;
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
      payload: { data, index: workLogIndex, activives },
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
export const rejectedWorkLogAction = (id, logId, payload, index, cb) => (dispatch, getState) => {
  const { workLog } = getState().orderDetail.data;
  const workLogIndex = findIndex(workLog, (log) => log.id === logId);

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
      payload: { data: comment, index },
    });

    data.comments = [];

    dispatch({
      type: REJECTED_WORK_LOG_ACTION.SUCCESS,
      payload: { data, index: workLogIndex, activives },
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

export const GET_EMAIL_TEMPLATE_ACTION = actionCreator('GET_EMAIL_TEMPLATE_ACTION');
export const getEmailTemplateAction = (id, templateId, workLogIndex) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_EMAIL_TEMPLATE_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: GET_EMAIL_TEMPLATE_ACTION.SUCCESS,
      payload: { data, templateId, workLogIndex },
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

export const SENT_EMAIL_NOTIFY_ACTION = actionCreator('SENT_EMAIL_NOTIFY_ACTION');
export const sendEmailNotifyAction = (customerEmail = '') => (dispatch, getState) => {
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
export const getFBMessageTemplateAction = (id, templateId, workLogIndex) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_FB_MESSAGE_TEMPLATE_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: GET_FB_MESSAGE_TEMPLATE_ACTION.SUCCESS,
      payload: { data, templateId, workLogIndex },
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

export const SENT_FB_MESSAGES_NOTIFY_ACTION = actionCreator('SENT_FB_MESSAGES_NOTIFY_ACTION');
export const sendFBMessageNotifyAction = (psid) => (dispatch, getState) => {
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
        notificationChannel: 'FACEBOOK',
      },
    ];
    dispatch({
      type: SENT_FB_MESSAGES_NOTIFY_ACTION.SUCCESS,
      payload: {
        activives,
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
  const { fbTemplate, order } = data;
  const payload = {
    content: fbTemplate,
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
export const deleteFileDeliveryAction = (id, fileId, logIndex, fileIndex, cb) => (dispatch) => {
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
        payload: { logIndex, fileIndex },
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
