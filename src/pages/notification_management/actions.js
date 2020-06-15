import { actionCreator } from 'utils';
import {
  getAllNotifications,
  createNotification,
  deleteNotification,
  publishNotification,
} from 'services/notification.service';

export const GET_NOTIFICATIONS = actionCreator('GET_NOTIFICATIONS');
export const actGetNotifications = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GET_NOTIFICATIONS.PENDING,
    });

    const params = {
      page: (data && data.page) || 0,
      sort: (data && data.sort) || 'asc',
    };

    const res = await getAllNotifications(params);
    dispatch({
      type: GET_NOTIFICATIONS.SUCCESS,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: GET_NOTIFICATIONS.ERROR,
      payload: e.response,
    });
  }
};

export const CREATE_NOTIFICATION = actionCreator('CREATE_NOTIFICATION');
export const actCreateNotification = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_NOTIFICATION.PENDING,
    });

    const res = await createNotification(data);
    dispatch({
      type: CREATE_NOTIFICATION.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: CREATE_NOTIFICATION.ERROR,
      payload: e.response,
    });

    return e.response;
  }
};

export const DELETE_NOTIFICATION = actionCreator('DELETE_NOTIFICATION');
export const actDeleteNotification = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_NOTIFICATION.PENDING,
    });

    const res = await deleteNotification(id);
    dispatch({
      type: DELETE_NOTIFICATION.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: DELETE_NOTIFICATION.ERROR,
      payload: e.response,
    });

    return e.response;
  }
};

export const PUBLISH_NOTIFICATION = actionCreator('PUBLISH_NOTIFICATION');
export const actPublishNotification = (data) => async (dispatch) => {
  try {
    dispatch({
      type: PUBLISH_NOTIFICATION.PENDING,
    });

    const res = await publishNotification(data);
    dispatch({
      type: PUBLISH_NOTIFICATION.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: PUBLISH_NOTIFICATION.ERROR,
      payload: e.response,
    });

    return e.response;
  }
};
