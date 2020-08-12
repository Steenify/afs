import { UPLOAD_COMMENT_WORK_LOG_ACTION, UPDATE_COMMENT_WORK_LOG_ACTION, ORDER_DETAIL_ACTIONS, UPLOAD_FILE_WORK_LOG_ACTION } from 'pages/orders_detail/actions';

const getAttachmentsFromString = (image) => {
  const text = image.replace(/^\[|\]$/g, '');
  if (text) {
    return text.split(',').map((i) => ({ url: i, thumbnailLink: i }));
  }
  return [];
};

export const updateBookingItemSummaryAction = (payload) => (dispatch, getState) => {
  const { order } = getState().orderDetail.data;
  const { summarize, id } = payload;
  const index = order?.items?.findIndex((item) => item.id === Number(id));
  if (index > -1) {
    dispatch({
      type: ORDER_DETAIL_ACTIONS.UPDATE_ORDER_ITEM_SUMARIZE,
      payload: {
        value: summarize,
        index,
      },
    });
  }
};

export const uploadFileWorkLogAction = (payload) => (dispatch, getState) => {
  const { image, id, orderNumber, code } = payload;
  const { order, workLog } = getState().orderDetail.data;
  const files = getAttachmentsFromString(image);
  const index = workLog.findIndex((w) => w.id === Number(id));
  if (order.number === orderNumber && order.code === code && index > -1) {
    dispatch({
      type: UPLOAD_FILE_WORK_LOG_ACTION.SUCCESS,
      payload: {
        data: files,
        index,
        activives: [], // * Missing in FCM payload
      },
    });
  }
};

export const rejectWorkLogAction = (payload) => (dispatch, getState) => {
  // const { image, id, orderNumber, code } = payload;
  // const { order, workLog } = getState().orderDetail.data;
  // const files = getAttachmentsFromString(image);
  // const index = workLog.findIndex((w) => w.id === Number(id));
  // if (order.number === orderNumber && order.code === code && index > -1) {
  //   dispatch({
  //     type: UPLOAD_FILE_WORK_LOG_ACTION.SUCCESS,
  //     payload: {
  //       data: files,
  //       index,
  //       activives: [], // * Missing in FCM payload
  //     },
  //   });
  // }
};

export const newCommentWorkLogAction = (payload) => (dispatch, getState) => {
  const { code, orderNumber, id, content, image, sender } = payload;
  const { order, workLog } = getState().orderDetail.data;
  const attachments = getAttachmentsFromString(image);

  if (order.number === orderNumber && order.code === code) {
    dispatch({
      type: UPLOAD_COMMENT_WORK_LOG_ACTION.SUCCESS,
      payload: {
        data: {
          id,
          content,
          attachments,
          user: {
            fullName: sender,
          },
        },
        index: workLog.length - 1,
      },
    });
  }
};

export const editCommentWorkLogAction = (payload) => (dispatch, getState) => {
  const { code, orderNumber, id, content, image, bookingWorkLog } = payload;
  const { order, workLog } = getState().orderDetail.data;
  const attachments = getAttachmentsFromString(image);

  const logIndex = workLog.findIndex((w) => w.id === Number(bookingWorkLog));
  const comIndex = workLog[logIndex]?.comments?.findIndex((c) => c.id === Number(id));

  if (order.number === orderNumber && order.code === code && logIndex > -1 && comIndex > -1) {
    dispatch({
      type: UPDATE_COMMENT_WORK_LOG_ACTION.SUCCESS,
      payload: {
        data: {
          id: Number(id),
          content,
          attachments,
        },
        logIndex,
        comIndex,
      },
    });
  }
};
