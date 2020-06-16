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
} from 'services/order';

export const ORDER_DETAIL_ACTIONS = {
  UPDATE_ORDER_ITEM_SUMARIZE: 'UPDATE_ORDER_ITEM_SUMARIZE',
  UPDATE_SHOW_EMAIL_NOTIFY: 'UPDATE_SHOW_EMAIL_NOTIFY',
  UPDATE_EMAIL_NOTIFY: 'UPDATE_EMAIL_NOTIFY',
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
export const updateEmailNotifyAction = (payload) => (dispatch) => {
  dispatch({
    type: ORDER_DETAIL_ACTIONS.UPDATE_EMAIL_NOTIFY,
    payload,
  });
};

export const GET_ORDER_DETAIL_ACTION = actionCreator('GET_ORDER_DETAIL_ACTION');
export const getOrderDetailAction = (id) => async (dispatch) => {
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
    console.log('getOrderDetailAction -> error', error);
    dispatch({
      type: GET_ORDER_DETAIL_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: getOrderService(id),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_ORDER_ITEM_SUMARIZE_ACTION = actionCreator(
  'UPDATE_ORDER_ITEM_SUMARIZE_ACTION',
);
export const updateOrderItemSumarizeAPIAction = (
  id,
  itemId,
  data,
  cb,
) => async (dispatch) => {
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
    console.log('updateOrderItemSumarizeAPIAction -> error', error);
    dispatch({
      type: UPDATE_ORDER_ITEM_SUMARIZE_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: updateOrderItemSumarizeService({ id, itemId, data }),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_ORDER_ITEM_FILES_ACTION = actionCreator(
  'UPDATE_ORDER_ITEM_FILES_ACTION',
);
export const updateOrderItemFilesAction = (
  id,
  itemId,
  index,
  data,
  files,
  cb,
) => async (dispatch) => {
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
    console.log('updateOrderItemSumarizeAPIAction -> error', error);
    dispatch({
      type: UPDATE_ORDER_ITEM_FILES_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: updateOrderItemFileService({ id, itemId, data }),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_ORDER_CUSTOMER_ACTION = actionCreator(
  'GET_ORDER_CUSTOMER_ACTION',
);
export const getOrderCustomerAction = (id) => async (dispatch) => {
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
    console.log('getOrderCustomerAction -> error', error);
    dispatch({
      type: GET_ORDER_CUSTOMER_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: getOrderCustomerService(id),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_ORDER_STATUS_ACTION = actionCreator(
  'UPDATE_ORDER_STATUS_ACTION',
);
export const updateOrderStatusAction = (id, to) => async (
  dispatch,
  getState,
) => {
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
    console.log('updateOrderStatusAction -> error', error);
    dispatch({
      type: UPDATE_ORDER_STATUS_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: changeOrderStatusService({ id, to }),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_ORDER_WORK_LOG_ACTION = actionCreator(
  'GET_ORDER_WORK_LOG_ACTION',
);
export const getOrderWorkLogAction = (id) => async (dispatch) => {
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
    console.log('updateOrderWorkLoadAction -> error', error);
    dispatch({
      type: GET_ORDER_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: getOrderWorkLogService({ id }),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPLOAD_FILE_WORK_LOG_ACTION = actionCreator(
  'UPLOAD_FILE_WORK_LOG_ACTION',
);
export const uploadFileWorkLogAction = (
  id,
  logId,
  payload,
  index,
  files,
  cb,
) => async (dispatch) => {
  const onPending = () => {
    dispatch({
      type: UPLOAD_FILE_WORK_LOG_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    if (data) {
      cb && cb();
      dispatch({
        type: UPLOAD_FILE_WORK_LOG_ACTION.SUCCESS,
        payload: { data: files, index },
      });
    } else {
      toast.error('Can not saved file, Please try again later!');
    }
  };
  const onError = (error) => {
    console.log('uploadFileWorkLogAction', error);
    dispatch({
      type: UPLOAD_FILE_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: uploadOrderWorkLogService({ id, logId, data: payload }),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPLOAD_COMMENT_WORK_LOG_ACTION = actionCreator(
  'UPLOAD_COMMENT_WORK_LOG_ACTION',
);
export const uploadCommentWorkLogAction = (
  id,
  logId,
  payload,
  index,
  cb,
) => async (dispatch) => {
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
    console.log('uploadCommentWorkLogAction', error);
    dispatch({
      type: UPLOAD_COMMENT_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: uploadOrderWorkLogCommentService({ id, logId, data: payload }),
    onPending,
    onSuccess,
    onError,
  });
};

export const DELETE_COMMENT_WORK_LOG_ACTION = actionCreator(
  'DELETE_COMMENT_WORK_LOG_ACTION',
);
export const deleteCommentWorkLogAction = (
  id,
  logId,
  comId,
  logIndex,
  comIndex,
) => async (dispatch) => {
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
    console.log('deleteCommentWorkLogAction', error);
    dispatch({
      type: DELETE_COMMENT_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: deleteOrderWorkLogCommentService({ id, logId, comId }),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_COMMENT_WORK_LOG_ACTION = actionCreator(
  'UPDATE_COMMENT_WORK_LOG_ACTION',
);
export const updateCommentWorkLogAction = (
  id,
  logId,
  comId,
  payload,
  logIndex,
  comIndex,
  cb,
) => async (dispatch) => {
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
    console.log('deleteCommentWorkLogAction', error);
    dispatch({
      type: UPDATE_COMMENT_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
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

export const APPROVED_WORK_LOG_ACTION = actionCreator(
  'APPROVED_WORK_LOG_ACTION',
);
export const approvedWorkLogAction = (id, logId) => async (
  dispatch,
  getState,
) => {
  const { workLog } = getState().orderDetail.data;
  const workLogIndex = findIndex(workLog, (log) => log.id === logId);

  const onPending = () => {
    dispatch({
      type: APPROVED_WORK_LOG_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: APPROVED_WORK_LOG_ACTION.SUCCESS,
      payload: { data, index: workLogIndex },
    });
  };
  const onError = (error) => {
    console.log('uploadCommentWorkLogAction', error);
    dispatch({
      type: APPROVED_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: approvedOrderWorkLogService({ id, logId }),
    onPending,
    onSuccess,
    onError,
  });
};

export const REJECTED_WORK_LOG_ACTION = actionCreator(
  'REJECTED_WORK_LOG_ACTION',
);
export const rejectedWorkLogAction = (id, logId, cb) => async (
  dispatch,
  getState,
) => {
  const { workLog } = getState().orderDetail.data;
  const workLogIndex = findIndex(workLog, (log) => log.id === logId);

  const onPending = () => {
    dispatch({
      type: REJECTED_WORK_LOG_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    cb && cb();
    dispatch({
      type: REJECTED_WORK_LOG_ACTION.SUCCESS,
      payload: { data, index: workLogIndex },
    });
  };
  const onError = (error) => {
    console.log('uploadCommentWorkLogAction', error);
    dispatch({
      type: REJECTED_WORK_LOG_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: rejectedOrderWorkLogService({ id, logId }),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_EMAIL_TEMPLATE_ACTION = actionCreator(
  'GET_EMAIL_TEMPLATE_ACTION',
);
export const getEmailTemplateAction = (id, templateId) => async (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_EMAIL_TEMPLATE_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: GET_EMAIL_TEMPLATE_ACTION.SUCCESS,
      payload: { data: data.content, templateId },
    });
  };
  const onError = (error) => {
    console.log('getEmailTemplateAction', error);
    dispatch({
      type: GET_EMAIL_TEMPLATE_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: getOrderEmailService({ id, templateId }),
    onPending,
    onSuccess,
    onError,
  });
};

export const SENT_EMAIL_NOTIFY_ACTION = actionCreator(
  'SENT_EMAIL_NOTIFY_ACTION',
);
export const sendEmailNotifyAction = () => async (dispatch, getState) => {
  const onPending = () => {
    dispatch({
      type: SENT_EMAIL_NOTIFY_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: SENT_EMAIL_NOTIFY_ACTION.SUCCESS,
    });
    toast.success('Notified Customer!');
  };
  const onError = (error) => {
    console.log('sendEmailNotifyAction', error);
    dispatch({
      type: SENT_EMAIL_NOTIFY_ACTION.ERROR,
      payload: error.response,
    });
  };

  const { data } = getState().orderDetail;
  const { email, order } = data;
  const payload = {
    content: email,
  };
  await actionTryCatchCreator({
    service: sentOrderEmailNotifyService({ id: order.id, data: payload }),
    onPending,
    onSuccess,
    onError,
  });
};
