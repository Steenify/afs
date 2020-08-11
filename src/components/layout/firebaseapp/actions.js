import { UPLOAD_COMMENT_WORK_LOG_ACTION, UPDATE_COMMENT_WORK_LOG_ACTION } from 'pages/orders_detail/actions';

const getAttachmentsFromString = (image) => {
  const text = image.replace(/^\[|\]$/g, '');
  if (text) {
    return text.split(',').map((i) => ({ url: i, thumbnailLink: i }));
  }
  return [];
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
  const comIndex = workLog[logIndex].comments.findIndex((c) => c.id === Number(id));

  if (order.number === orderNumber && order.code === code) {
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
