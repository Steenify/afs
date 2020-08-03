import { isMobile, actionCreator } from 'utils';

//TODO: change it to 100
export const desktopSize = 100;
export const mobileSize = 100;

export const initialState = {
  ui: {
    loading: false,
    generatingTemplate: false,
  },
  filterData: {
    page: 0,
    size: isMobile() ? mobileSize : desktopSize,
  },
  data: {
    emailTemplate: {
      title: '',
      content: '',
    },
    sentEmail: {
      title: '',
      content: '',
      customerEmail: '',
    },
    messageTemplate: {
      content: '',
    },
    currentItem: null,
    previewOrderItems: null,
    currentPreview: null,
    notifications: [],
    ids: [],
    items: {},
    totalArtworks: 0,
    totalPage: 0,
  },
};

export const ACTIONS = {
  UPDATE_FILTER_ACTION: 'LATE_NOTIFICATION_UPDATE_FILTER_ACTION',
  UPDATE_ITEM_ACTION: 'UPDATE_LATE_NOTIFICATION_ITEM_ACTION',

  SET_CURRENT_ITEM_ACTION: 'SET_LATE_NOTIFICATION_CURRENT_ITEM_ACTION',
  SET_PREVIEW_ORDERS_ACTION: 'SET_LATE_NOTIFICATION_PREVIEW_ORDERS_ACTION',

  UPDATE_PREVIEW_ORDERS_ACTION: 'UPDATE_LATE_NOTIFICATION_PREVIEW_ORDERS_ACTION',
  UPDATE_CURRENT_ITEM_ORDER_SELECTION_ACTION: 'UPDATE_LATE_NOTIFICATION_CURRENT_ITEM_ORDER_SELECTION_ACTION',
  UPDATE_ALL_SELECTION: 'LATE_NOTIFICATION_UPDATE_ALL_SELECTION',

  UPDATE_PREVIEW_ITEMS_ACTION: 'UPDATE_LATE_NOTIFICATION_PREVIEW_ITEMS_ACTION',
  UPDATE_CURRENT_ITEM_ACTION: 'UPDATE_LATE_NOTIFICATION_CURRENT_ITEM_ACTION',
};

export const GET_LIST = actionCreator('GET_LATE_NOTIFICATIONS');
export const GET_EMAIL_TEMPLATE = actionCreator('GET_LATE_NOTIFICATIONS_EMAIL_TEMPLATE');
export const GET_MESSAGE_TEMPLATE = actionCreator('GET_LATE_NOTIFICATIONS_MESSAGE_TEMPLATE');
export const GENERATE_TEMPLATE = actionCreator('LATE_NOTIFICATIONS_GENERATE_TEMPLATE');
export const SEND_EMAIL = actionCreator('LATE_NOTIFICATIONS_SEND_EMAIL');
export const VIEW_SENT_CONTENT = actionCreator('LATE_NOTIFICATIONS_VIEW_SENT_CONTENT');
