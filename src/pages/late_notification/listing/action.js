import { actionTryCatchCreator, mapDataByIds } from 'utils';

import {
  getLateNotificationService,
  getLateNotificationEmailTemplateService,
  getLateNotificationMessageTemplateService,
  sendLateNotificationEmailService,
  generateEmailTemplateService,
  viewLateNotificationSentContentService,
} from 'services/late-notification';

import { initialState, ACTIONS, GET_LIST, GET_EMAIL_TEMPLATE, GENERATE_TEMPLATE, GET_MESSAGE_TEMPLATE, SEND_EMAIL, VIEW_SENT_CONTENT } from './const';
import { toast } from 'react-toastify';
const {
  UPDATE_FILTER_ACTION,
  UPDATE_ITEM_ACTION,
  UPDATE_ALL_SELECTION,
  SET_CURRENT_ITEM_ACTION,
  UPDATE_CURRENT_ITEM_ORDER_SELECTION_ACTION,
  SET_PREVIEW_ORDERS_ACTION,
  UPDATE_PREVIEW_ORDERS_ACTION,
  UPDATE_CURRENT_ITEM_ACTION,
  UPDATE_PREVIEW_ITEMS_ACTION,
} = ACTIONS;

export const updateFilterAction = (payload = initialState.filterData) => (dispatch) => {
  dispatch({ type: UPDATE_FILTER_ACTION, payload });
};

export const setPreviewOrdersAction = (payload = null) => (dispatch) => {
  dispatch({ type: SET_PREVIEW_ORDERS_ACTION, payload });
};

export const updateCurrentItemAction = (payload = {}) => (dispatch) => {
  dispatch({ type: UPDATE_CURRENT_ITEM_ACTION, payload });
};

export const updatePreviewItemsAction = (payload = {}) => (dispatch) => {
  dispatch({ type: UPDATE_PREVIEW_ITEMS_ACTION, payload });
};

export const updateItemAction = (payload = { id: 0, field: 'string', value: null }) => (dispatch) => {
  dispatch({ type: UPDATE_ITEM_ACTION, payload });
};

export const setCurrentPreviewIdAction = (payload = null) => (dispatch) => {
  dispatch({ type: UPDATE_PREVIEW_ORDERS_ACTION, payload });
};

export const updateCurrentItemOrderSelectionAction = (payload = { id: 0, value: false }) => (dispatch) => {
  dispatch({ type: UPDATE_CURRENT_ITEM_ORDER_SELECTION_ACTION, payload });
};

export const updateAllSelectionAction = (payload = false) => (dispatch) => {
  dispatch({ type: UPDATE_ALL_SELECTION, payload });
};
export const setCurrentItemAction = (item = null) => (dispatch, getState) => {
  const payload = item === null ? item : { ...item, emailTemplate: getState().lateNotification.listing.data.emailTemplate, messageTemplate: getState().lateNotification.listing.data.messageTemplate };
  dispatch({ type: SET_CURRENT_ITEM_ACTION, payload });
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
    dispatch({ type: GET_EMAIL_TEMPLATE.PENDING });
  };
  const onSuccess = (payload) => {
    dispatch({ type: GET_EMAIL_TEMPLATE.SUCCESS, payload });
  };
  const onError = (error) => {
    dispatch({ type: GET_EMAIL_TEMPLATE.ERROR, payload: error.response });
  };
  actionTryCatchCreator({
    service: getLateNotificationEmailTemplateService(),
    onPending,
    onSuccess,
    onError,
  });

  const onMessagePending = () => {
    dispatch({ type: GET_MESSAGE_TEMPLATE.PENDING });
  };
  const onMessageSuccess = (payload) => {
    dispatch({ type: GET_MESSAGE_TEMPLATE.SUCCESS, payload });
  };
  const onMessageError = (error) => {
    dispatch({ type: GET_MESSAGE_TEMPLATE.ERROR, payload: error.response });
  };
  actionTryCatchCreator({
    service: getLateNotificationMessageTemplateService(),
    onPending: onMessagePending,
    onSuccess: onMessageSuccess,
    onError: onMessageError,
  });
};

export const generateTemplateAction = (orders = []) => (dispatch, getState) => {
  const { id, lateBookings = {}, emailTemplate } = getState()?.lateNotification?.listing?.data?.currentItem || {};
  const onPending = () => {
    dispatch({ type: GENERATE_TEMPLATE.PENDING });
  };
  const onSuccess = (data) => {
    const { messageTemplate = {} } = getState()?.lateNotification?.listing?.data?.currentItem || {};
    const newOrders = data.map((b, index) => {
      const { booking, title, content } = b;
      const mappedEmail = {
        title,
        content,
        email: booking?.customer?.email || '',
      };
      const mappedMessage = { ...messageTemplate };
      const { number, code } = booking;
      return { ...b, messageTemplate: mappedMessage, emailTemplate: mappedEmail, number, code };
    });
    dispatch(setCurrentPreviewIdAction(newOrders[0]?.id || null));
    dispatch(setPreviewOrdersAction(mapDataByIds(newOrders, 'id').items));

    dispatch({ type: GENERATE_TEMPLATE.SUCCESS });
  };
  const onError = (error) => {
    dispatch({ type: GENERATE_TEMPLATE.ERROR, payload: error.response });
  };
  actionTryCatchCreator({
    service: generateEmailTemplateService({
      ...emailTemplate,
      lateNotificationId: id,
      bookingIds: Object.values(lateBookings)
        ?.filter((item) => item.selected)
        ?.map((item) => item.id),
    }),
    onPending,
    onSuccess,
    onError,
  });
};

export const sendEmailAction = () => (dispatch, getState) => {
  const { currentItem = {}, previewOrderItems = {} } = getState()?.lateNotification?.listing?.data || {};

  const request = Object.values(previewOrderItems).map(({ booking, emailTemplate }) => ({
    title: JSON.stringify(emailTemplate?.title || ''),
    content: JSON.stringify(emailTemplate?.content || ''),
    bookingId: booking?.id,
  }));
  const lateBookingId = currentItem?.id || 0;

  const onPending = () => {
    dispatch({ type: SEND_EMAIL.PENDING });
  };
  const onSuccess = (data) => {
    dispatch({ type: SEND_EMAIL.SUCCESS, payload: data });
    toast.dark('Email have been sent.');
  };
  const onError = (error) => {
    dispatch({ type: SEND_EMAIL.ERROR, payload: error.response });
  };
  actionTryCatchCreator({
    service: sendLateNotificationEmailService(lateBookingId, request),
    onPending,
    onSuccess,
    onError,
  });
};

export const viewSentContentAction = () => (dispatch, getState) => {
  const { currentItem = {} } = getState()?.lateNotification?.listing?.data || {};
  const id = currentItem?.id || 0;
  const bookingId = currentItem?.currentViewId || 0;

  const onPending = () => {
    dispatch({ type: VIEW_SENT_CONTENT.PENDING });
  };
  const onSuccess = (data) => {
    dispatch({ type: VIEW_SENT_CONTENT.SUCCESS, payload: data });
  };
  const onError = (error) => {
    dispatch({ type: VIEW_SENT_CONTENT.ERROR, payload: error.response });
  };
  actionTryCatchCreator({
    service: viewLateNotificationSentContentService(id, bookingId),
    onPending,
    onSuccess,
    onError,
  });
};
