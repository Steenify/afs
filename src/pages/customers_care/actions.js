import { actionCreator, actionTryCatchCreator } from 'utils';
import { getRemindersService, markAsRemindedService } from 'services/customers-care';

export const UPDATE_CUSTOMER_CARE_FILTER_ACTION = 'UPDATE_CUSTOMER_CARE_FILTER_ACTION';
export const updateReminderFilterAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_CUSTOMER_CARE_FILTER_ACTION,
    payload,
  });
  dispatch(getRemindersAction());
};

export const GET_REMINDER_LIST_ACTION = actionCreator('CUSTOMER_CARE_GET_REMINDER_LIST_ACTION');
export const getRemindersAction = () => async (dispatch, getState) => {
  const { filter } = getState().customersCare;
  actionTryCatchCreator({
    service: getRemindersService(filter),
    onPending: () => dispatch({ type: GET_REMINDER_LIST_ACTION.PENDING }),
    onSuccess: (data, headers) => dispatch({ type: GET_REMINDER_LIST_ACTION.SUCCESS, payload: { data, headers } }),
    onError: () => dispatch({ type: GET_REMINDER_LIST_ACTION.ERROR }),
  });
};

export const UPDATE_REMINDER_ITEM_ACTION = 'CUSTOMER_CARE_UPDATE_REMINDER_ITEM_ACTION';
export const updateReminderItemsAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_REMINDER_ITEM_ACTION,
    payload,
  });
};

export const SELECTED_ALL_REMINDER_ACTION = 'CUSTOMER_CARE_SELECTED_ALL_REMINDER_ACTION';
export const selectAllReminderAction = (payload) => (dispatch) => {
  dispatch({
    type: SELECTED_ALL_REMINDER_ACTION,
    payload,
  });
};

export const MARK_AS_REMINDED_ACTION = actionCreator('CUSTOMER_CARE_MARK_AS_REMINDED_ACTION_ACTION');
export const markAsRemindedAction = (reminderIds = [], cb) => async (dispatch, getState) => {
  actionTryCatchCreator({
    service: markAsRemindedService({ reminderIds }),
    onPending: () => dispatch({ type: MARK_AS_REMINDED_ACTION.PENDING }),
    onSuccess: () => {
      cb && cb();
      dispatch({ type: MARK_AS_REMINDED_ACTION.SUCCESS, payload: reminderIds });
    },
    onError: () => dispatch({ type: MARK_AS_REMINDED_ACTION.ERROR }),
  });
};
