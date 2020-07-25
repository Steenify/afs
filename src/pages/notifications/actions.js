import { actionCreator, actionTryCatchCreator, isMobile } from 'utils';
import { getAllNotificationsService, getNotificationsCountService, readAllNotificationService } from 'services/notification.service';

const buildSearchParam = (input = {}) => {
  var params = new URLSearchParams();
  params.append('text', input.text || '');
  params.append('page', input.page || 0);
  params.append('size', (input.size && parseInt(input.size)) || 20);

  if (input.sort && input.sort.length) {
    input.sort.forEach((item) => {
      const textSort = item.id + ',' + (item.desc ? 'desc' : 'asc');
      params.append('sort', textSort);
    });
  }

  return params;
};

export const GET_NOTIFICATIONS = actionCreator('GET_NOTIFICATIONS');
export const getAllNotificationsAction = (params = {}) => async (dispatch, getState) => {
  const { filter } = getState().customers;

  const currSize = isMobile() ? filter.sizeMobile : filter.size;

  const searchParams = buildSearchParam({
    ...filter,
    ...params,
    size: currSize,
  });

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
    console.log('getAllNotificationsAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: GET_NOTIFICATIONS.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getAllNotificationsService(searchParams),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_NOTIFICATIONS_DETAIL = actionCreator('GET_NOTIFICATIONS_DETAIL');
export const getAllNotificationDetailAction = (params) => async (dispatch, getState) => {
  const onPending = () => {
    dispatch({
      type: GET_NOTIFICATIONS_DETAIL.PENDING,
    });
  };
  const onSuccess = (data) => {
    if (data) {
      dispatch({
        type: GET_NOTIFICATIONS_DETAIL.SUCCESS,
        payload: data,
      });
    }
  };
  const onError = (error) => {
    console.log('getAllNotificationsAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: GET_NOTIFICATIONS_DETAIL.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getAllNotificationsService(params),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_NOTIFICATIONS_COUNT = actionCreator('GET_NOTIFICATIONS_COUNT');
export const getNotificationsCountAction = () => async (dispatch) => {
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
    console.log('getNotificationsCountAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: GET_NOTIFICATIONS_COUNT.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getNotificationsCountService(),
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
    console.log('getNotificationsCountAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: READ_ALL_NOTIFICATIONS.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: readAllNotificationService(),
    onPending,
    onSuccess,
    onError,
  });
};
