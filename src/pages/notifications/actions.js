import { actionCreator, actionTryCatchCreator } from 'utils';
import {
  getAllNotifications,
  createNotification,
  deleteNotification,
  publishNotification,
  getNotificationsCount,
  readAllNotification,
} from 'services/notification.service';

export const GET_NOTIFICATIONS = actionCreator('GET_NOTIFICATIONS');
export const actGetNotifications = (data) => async (dispatch) => {
  const params = {
    page: (data && data.page) || 0,
    sort: (data && data.sort) || 'asc',
  };

  const onPending = () => {
    dispatch({
      type: GET_NOTIFICATIONS.PENDING,
    });
  };
  const onSuccess = (data) => {
    if (data) {
      dispatch({
        type: GET_NOTIFICATIONS.SUCCESS,
        payload: data,
      });
    }
  };
  const onError = (error) => {
    console.log(
      'actGetNotifications => onError -> error',
      JSON.stringify(error),
    );
    dispatch({
      type: GET_NOTIFICATIONS.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getAllNotifications(params),
    onPending,
    onSuccess,
    onError,
  });
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

export const GET_NOTIFICATIONS_COUNT = actionCreator('GET_NOTIFICATIONS_COUNT');
export const getNotificationsCountAction = (data) => async (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_NOTIFICATIONS_COUNT.PENDING,
    });
  };
  const onSuccess = (data) => {
    if (data) {
      dispatch({
        type: GET_NOTIFICATIONS_COUNT.SUCCESS,
        payload: data,
      });
    }
  };
  const onError = (error) => {
    console.log(
      'getNotificationsCountAction => onError -> error',
      JSON.stringify(error),
    );
    dispatch({
      type: GET_NOTIFICATIONS_COUNT.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getNotificationsCount(),
    onPending,
    onSuccess,
    onError,
  });
};

export const READ_ALL_NOTIFICATIONS = actionCreator('READ_ALL_NOTIFICATIONS');
export const readAllNotificationAction = () => async (dispatch) => {
  const onPending = () => {
    dispatch({
      type: READ_ALL_NOTIFICATIONS.PENDING,
    });
  };
  const onSuccess = (data) => {
    if (data) {
      dispatch({
        type: READ_ALL_NOTIFICATIONS.SUCCESS,
        payload: data,
      });
    }
  };
  const onError = (error) => {
    console.log(
      'getNotificationsCountAction => onError -> error',
      JSON.stringify(error),
    );
    dispatch({
      type: READ_ALL_NOTIFICATIONS.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: readAllNotification(),
    onPending,
    onSuccess,
    onError,
  });
};
