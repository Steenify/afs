import { actionTryCatchCreator } from 'utils';

import { getLateNotificationService, getLateNotificationTemplateService } from 'services/late-notification';

import { initialState, ACTIONS, GET_LIST, GET_TEMPLATE } from './const';
const {
  UPDATE_FILTER_ACTION,
  UPDATE_ITEM_ACTION,
  UPDATE_ALL_SELECTION,
  UPDATE_CURRENT_ITEM_ACTION,
  UPDATE_CURRENT_ITEM_ORDER_SELECTION_ACTION,
  UPDATE_EMAIL_TEMPLATE_ACTION,
  UPDATE_MESSAGE_TEMPLATE_ACTION,
  SET_PREVIEW_ORDERS_ACTION,
  UPDATE_PREVIEW_ORDERS_ACTION,
  UPDATE_PREVIEW_EMAIL_TEMPLATE_ACTION,
} = ACTIONS;

export const updateFilterAction = (payload = initialState.filterData) => (dispatch) => {
  dispatch({ type: UPDATE_FILTER_ACTION, payload });
};

export const setPreviewOrdersAction = (payload = null) => (dispatch) => {
  dispatch({ type: SET_PREVIEW_ORDERS_ACTION, payload });
};

export const updateItemAction = (payload = { id: 0, field: 'string', value: null }) => (dispatch) => {
  dispatch({ type: UPDATE_ITEM_ACTION, payload });
};

export const updatePreviewEmailTemplateAction = (payload = { id: 0, field: 'string', value: null }) => (dispatch) => {
  dispatch({ type: UPDATE_PREVIEW_EMAIL_TEMPLATE_ACTION, payload });
};

export const updatePreviewOrdersAction = (payload = null) => (dispatch) => {
  dispatch({ type: UPDATE_PREVIEW_ORDERS_ACTION, payload });
};

export const updateEmailTemplateAction = (payload = { field: 'string', value: null }) => (dispatch) => {
  dispatch({ type: UPDATE_EMAIL_TEMPLATE_ACTION, payload });
};

export const updateMessageTemplateAction = (payload = { field: 'string', value: null }) => (dispatch) => {
  dispatch({ type: UPDATE_MESSAGE_TEMPLATE_ACTION, payload });
};

export const updateCurrentItemOrderSelectionAction = (payload = { id: 0, value: false }) => (dispatch) => {
  dispatch({ type: UPDATE_CURRENT_ITEM_ORDER_SELECTION_ACTION, payload });
};

export const updateAllSelectionAction = (payload = false) => (dispatch) => {
  dispatch({ type: UPDATE_ALL_SELECTION, payload });
};
export const updateCurrentItemAction = (item = null) => (dispatch, getState) => {
  const payload = item === null ? item : { ...item, emailTemplate: getState().lateNotification.listing.data.emailTemplate, messageTemplate: getState().lateNotification.listing.data.messageTemplate };
  dispatch({ type: UPDATE_CURRENT_ITEM_ACTION, payload });
};

export const getLateNotificationAction = (param) => (dispatch) => {
  const onPending = () => {
    dispatch({ type: GET_LIST.PENDING });
  };
  const onSuccess = (data, headers) => {
    const mapped =
      data?.map((item) => ({
        ...item,
        lateBookings:
          item?.lateBookings?.map(({ booking: { code = '', number = '', id = 0, customer = {} } }) => {
            return { id, code, number, customer };
          }) || [],
      })) || data;
    const mockData = [
      {
        id: 1,
        sendDate: null,
        lastModifiedDate: '2020-07-28T07:25:12.947Z',
        lateBookings: [
          { id: 1, number: 123, code: 123 },
          { id: 2, number: 12341, code: 1234 },
          { id: 3, number: 512341, code: 51234 },
          { id: 4, number: 12341, code: 1234321 },
          { id: 5, number: 12344121, code: 1234412 },
        ],
      },
      { id: 2, sendDate: '2020-07-27T07:25:12.947Z', lastModifiedDate: '2020-07-27T04:25:12.947Z', lateBookings: [] },
      { id: 3, sendDate: null, lastModifiedDate: '2020-07-22T07:25:12.947Z', lateBookings: [] },
      { id: 4, sendDate: '2020-07-21T09:25:12.947Z', lastModifiedDate: '2020-07-21T00:25:12.947Z', lateBookings: [] },
      { id: 5, sendDate: null, lastModifiedDate: '2020-07-18T03:44:12.947Z', lateBookings: [] },
    ];

    dispatch({ type: GET_LIST.SUCCESS, payload: { data: mapped, headers } });
  };
  const onError = (error) => {
    dispatch({ type: GET_LIST.ERROR, payload: error.response });
  };
  actionTryCatchCreator({
    service: getLateNotificationService(param),
    onPending,
    onSuccess,
    onError,
  });
};

export const getLateNotificationTemplateAction = () => (dispatch) => {
  const onPending = () => {
    dispatch({ type: GET_TEMPLATE.PENDING });
  };
  const onSuccess = (payload) => {
    dispatch({ type: GET_TEMPLATE.SUCCESS, payload });
  };
  const onError = (error) => {
    dispatch({ type: GET_TEMPLATE.ERROR, payload: error.response });
  };
  actionTryCatchCreator({
    service: getLateNotificationTemplateService(),
    onPending,
    onSuccess,
    onError,
  });
};
