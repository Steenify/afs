import { UPLOAD_COMMENT_WORK_LOG_ACTION } from 'pages/orders_detail/actions';

export const newCommentWorkLogAction = (payload) => (dispatch, getState) => {
  const { code, orderNumber, id, content, attachments } = payload;
  const { order, workLog } = getState().orderDetail.data;

  if (order.number === orderNumber && order.code === code) {
    dispatch({
      type: UPLOAD_COMMENT_WORK_LOG_ACTION.SUCCESS,
      payload: {
        data: {
          id,
          content,
          attachments,
        },
        index: workLog.length - 1,
      },
    });
  }
};
