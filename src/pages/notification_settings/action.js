import { getNotificationActionsService, getNotificationActionService, updateNotificationActionService, getRecipientsService } from 'services/notification-settings.service';
import { actionCreator, actionTryCatchCreator } from 'utils';

export const GET_NOTIFICATION_ACTIONS = actionCreator('GET_NOTIFICATION_ACTIONS');
export const getNotificationActionsAction = (params, cb) => async (dispatch) => {
  const { PENDING, SUCCESS, ERROR } = GET_NOTIFICATION_ACTIONS;

  const onPending = () => {
    dispatch({ type: PENDING });
  };

  const onSuccess = (data) => {
    dispatch({ type: SUCCESS, payload: data });

    if (cb) cb(null, data);
  };

  const onError = (error) => {
    dispatch({ type: ERROR, payload: error.response });

    if (cb) cb(error, null);
  };

  actionTryCatchCreator({
    service: getNotificationActionsService(params),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_NOTIFICATION_ACTION = actionCreator('GET_NOTIFICATION_ACTION');
export const getNotificationActionAction = (id, cb) => async (dispatch) => {
  const { PENDING, SUCCESS, ERROR } = GET_NOTIFICATION_ACTION;

  const onPending = () => {
    dispatch({ type: PENDING });
  };

  const onSuccess = (data) => {
    dispatch({ type: SUCCESS, payload: data });

    if (cb) cb(null, data);
  };

  const onError = (error) => {
    dispatch({ type: ERROR, payload: error.response });

    if (cb) cb(error, null);
  };

  actionTryCatchCreator({
    service: getNotificationActionService(id),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_NOTIFICATION_ACTION = actionCreator('UPDATE_NOTIFICATION_ACTION');
export const updateNotificationActionAction = (actionId, data, cb) => async (dispatch) => {
  const { PENDING, SUCCESS, ERROR } = UPDATE_NOTIFICATION_ACTION;

  const onPending = () => {
    dispatch({ type: PENDING });
  };

  const onSuccess = (data) => {
    dispatch({ type: SUCCESS, payload: data });

    if (cb) cb(null, data);
  };

  const onError = (error) => {
    dispatch({ type: ERROR, payload: error.response });

    if (cb) cb(error, null);
  };

  actionTryCatchCreator({
    service: updateNotificationActionService(actionId, data),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_RECIPIENTS = actionCreator('GET_RECIPIENTS');
export const getRecipientsAction = (s, cb) => async (dispatch) => {
  const { PENDING, SUCCESS, ERROR } = GET_RECIPIENTS;

  const onPending = () => {
    dispatch({ type: PENDING });
  };

  const onSuccess = (data) => {
    dispatch({ type: SUCCESS, payload: data });

    if (cb) cb(null, data);
  };

  const onError = (error) => {
    dispatch({ type: ERROR, payload: error.response });

    if (cb) cb(error, null);
  };

  actionTryCatchCreator({
    service: getRecipientsService(s),
    onPending,
    onSuccess,
    onError,
  });
};
