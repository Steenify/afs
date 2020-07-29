import { isMobile, actionCreator } from 'utils';

export const desktopSize = 5;
export const mobileSize = 100;

export const initialState = {
  ui: {
    loading: false,
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
    messageTemplate: {
      content: `
      Hi Customer,

      First of all, I am sorry for the delay of sketch delivery. My first estimation was wrong.

      There were too much work on the half-way orders than I expected.

      Now, I put your order on the highest priority. I need more time to work on your sketch to keep the highest quality for you.

      The new estimation of the sketch delivery is about on SATURDAY 01/08/2020.

      I'm really sorry about this. If you need the art for the birthday or anniversary next week, please let me know.

      For faster communication, you can DM me via Instagram: @turnedninja or my fanpage Turned Ninja

      Best regards,

      Administrator`,
      attachments: [
        {
          id: 2421,
          fileId: '1595514543651480',
          fileName: '9568b70b-a27c-4011-bd1f-6803a22dea67-1381_8c49bd12-a6ac-4dae-970f-cf0f61a11bd0-1381_FULL_(3).jpg',
          fileType: 'image/jpeg',
          url: 'https://cdn2.steenify.com/1590/9568b70b-a27c-4011-bd1f-6803a22dea67-1381_8c49bd12-a6ac-4dae-970f-cf0f61a11bd0-1381_FULL_(3).jpg',
          thumbnailLink: 'https://cdn2.steenify.com/thumbnails/29b195d2-59b8-4f44-8e49-773a263bc1da-thumbnail_1381_8c49bd12-a6ac-4dae-970f-cf0f61a11bd0-1381 FULL (3).jpg',
          blobName: '1590/9568b70b-a27c-4011-bd1f-6803a22dea67-1381_8c49bd12-a6ac-4dae-970f-cf0f61a11bd0-1381_FULL_(3).jpg',
          blobGeneration: 1595514543651480,
          external: false,
        },
      ],
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
  UPDATE_CURRENT_ITEM_ACTION: 'UPDATE_LATE_NOTIFICATION_CURRENT_ITEM_ACTION',
  UPDATE_PREVIEW_ORDERS_ACTION: 'UPDATE_LATE_NOTIFICATION_PREVIEW_ORDERS_ACTION',
  SET_PREVIEW_ORDERS_ACTION: 'SET_LATE_NOTIFICATION_PREVIEW_ORDERS_ACTION',
  UPDATE_EMAIL_TEMPLATE_ACTION: 'UPDATE_LATE_NOTIFICATION_EMAIL_TEMPLATE_ACTION',
  UPDATE_PREVIEW_EMAIL_TEMPLATE_ACTION: 'UPDATE_LATE_NOTIFICATION_PREVIEW_EMAIL_TEMPLATE_ACTION',
  UPDATE_MESSAGE_TEMPLATE_ACTION: 'UPDATE_LATE_NOTIFICATION_MESSAGE_TEMPLATE_ACTION',
  UPDATE_CURRENT_ITEM_ORDER_SELECTION_ACTION: 'UPDATE_LATE_NOTIFICATION_CURRENT_ITEM_ORDER_SELECTION_ACTION',
  UPDATE_ALL_SELECTION: 'LATE_NOTIFICATION_UPDATE_ALL_SELECTION',
};

export const GET_LIST = actionCreator('GET_LATE_NOTIFICATIONS');
export const GET_TEMPLATE = actionCreator('GET_LATE_NOTIFICATIONS_TEMPLATE');
