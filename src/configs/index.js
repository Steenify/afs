// export const HostAPI = 'http://3.0.40.66:8080';

export const HostAPI = process.env.REACT_APP_HOST || 'https://ots.steenify.com';

export const grantType = process.env.REACT_APP_GRANTTYPE || 'Bearer';
export const buildType = process.env.REACT_APP_BUILD || 'DEV';

export const defautToken = '';

export const GOOGLE_CONFIG = {
  GOOGLE_MAP_KEY: 'AIzaSyBerkRSY_8JrdijfYF5wFcGUm3d-TUpibQ',
  ADDRESS_DEFAULT: [1.351519, 103.863218],
};

export const PERMITTIONS_CONFIG = {
  VIEW_BOOKING: 'VIEW_BOOKING',
  MODIFY_BOOKING: 'MODIFY_BOOKING',
  UPDATE_STATUS_BOOKING: 'UPDATE_STATUS_BOOKING',
  ASSIGN_BOOKING: 'ASSIGN_BOOKING',
  VIEW_BOOKING_LIST: 'VIEW_BOOKING_LIST',
  MODIFY_BUDGET: 'MODIFY_BUDGET',
  MODIFY_SUMMARY: 'MODIFY_SUMMARY',
  VIEW_CUSTOMER_INFO: 'VIEW_CUSTOMER_INFO',
  VIEW_ORDER_SUBTOTAL: 'VIEW_ORDER_SUBTOTAL',
  NOTIFY_BOOKING_TO_CUSTOMER: 'NOTIFY_BOOKING_TO_CUSTOMER',
  REJECT_WORK_LOG: 'REJECT_WORK_LOG',
  APPROVE_WORK_LOG: 'APPROVE_WORK_LOG',
  COMMENT: 'COMMENT',
  ACCESS_SETTING: 'ACCESS_SETTING',
  ACCESS_ARTIST: 'ACCESS_ARTIST',
  UPDATE_PAYMENT_STATUS: 'UPDATE_PAYMENT_STATUS',
  VIEW_CUSTOMER_CONTACT_INFO: 'VIEW_CUSTOMER_CONTACT_INFO',
  UPDATE_BOOKING_CUSTOMER: 'UPDATE_BOOKING_CUSTOMER',
  VIEW_ARTIST_LIST: 'VIEW_ARTIST_LIST',
  MODIFY_DELIVERY: 'MODIFY_DELIVERY',
  UPDATE_ARTIST: 'UPDATE_ARTIST',
  VIEW_PAYOUT_LIST: 'VIEW_PAYOUT_LIST',
  VIEW_PAYOUT_DETAIL: 'VIEW_PAYOUT_DETAIL',
  CREATE_PAYOUT: 'CREATE_PAYOUT',
  SHOW_POSTER: 'SHOW_POSTER',
  CREATE_ARTWORK: 'CREATE_ARTWORK',
  NOTIFY_LATE_BOOKING_TO_CUSTOMER: 'NOTIFY_LATE_BOOKING_TO_CUSTOMER',
  VIEW_LATE_BOOKING_SENT_CONTENT: 'VIEW_LATE_BOOKING_SENT_CONTENT',
  DELETE_ARTWORK: 'DELETE_ARTWORK',
  CREATE_WORK_LOG_FOR_CANVAS: 'CREATE_WORK_LOG_FOR_CANVAS',
  VIEW_CUSTOMER_FEEDBACK: 'VIEW_CUSTOMER_FEEDBACK',
  UPDATE_ARTWORK: 'UPDATE_ARTWORK',
  VIEW_CUSTOMER_GENERAL_INFO: 'VIEW_CUSTOMER_GENERAL_INFO',
  CANCELED_STEP_BOOKING: 'CANCELED_STEP_BOOKING',
  ADD_PRODUCT_INTO_ORDER: 'ADD_PRODUCT_INTO_ORDER',
};

export const listStatus = ['NEW_ORDER', 'SKETCH', 'SKETCH_REVIEW', 'SKETCH_EDIT', 'COLOR', 'COLOR_REVIEW', 'COLOR_EDIT', 'EXPORT_FILE', 'SEND_FILE', 'DONE'];

export const mapStatusCanNotUpload = ['SKETCH_REVIEW', 'COLOR_REVIEW', 'SEND_FILE', 'PRINT_TRACKING', 'PRINT_RECEIVED'];

export const mapStatusOpen = {
  SKETCH: ['SKETCH', 'CUSTOMER_REVIEW_SKETCH', 'SKETCH_REVIEW', 'SKETCH_EDIT'],
  COLOR: ['COLOR', 'CUSTOMER_REVIEW_COLOR', 'COLOR_REVIEW', 'COLOR_EDIT'],
  EXPORT_FILE: ['EXPORT_FILE', 'SEND_FILE'],
  NEW_ORDER: ['NEW_ORDER'],
  DONE: ['DONE'],
  PRINT_PREVIEW: ['PRINT_PREVIEW'],
  PRINT_TRACKING: ['PRINT_TRACKING'],
  PRINT_RECEIVED: ['PRINT_RECEIVED'],
};

export const mapStatusNotiy = ['CUSTOMER_REVIEW_COLOR', 'CUSTOMER_REVIEW_SKETCH', 'SEND_FILE', 'SKETCH_REVIEW', 'COLOR_REVIEW', 'PRINT_PREVIEW', 'PRINT_TRACKING', 'PRINT_RECEIVED'];
export const mapStatusRemind = ['CUSTOMER_REVIEW_COLOR', 'CUSTOMER_REVIEW_SKETCH', 'SEND_FILE', 'SKETCH_REVIEW', 'COLOR_REVIEW', 'PRINT_PREVIEW', 'PRINT_TRACKING'];
export const mapRoles = {
  ROLE_CUSTOMER_SERVICE: 'ROLE_CUSTOMER_SERVICE',
  ROLE_ARTIST: 'ROLE_ARTIST',
};

export const mapStatusVerifyFile = ['SKETCH', 'SKETCH_EDIT', 'COLOR', 'COLOR_EDIT', 'EXPORT_FILE'];

export const mapStatusPayment = {
  PAID: 'Paid',
  UNPAID: 'Unpaid',
};
export const statusPayments = ['PAID', 'UNPAID'];

export const PSDFileType = ['image/vnd.adobe.photoshop', 'application/x-photoshop', 'application/photoshop', 'application/psd', 'image/psd'];

export const notifyChannels = [
  {
    id: 'email',
    title: 'Email',
  },
  // {
  //   id: 'facebook',
  //   title: 'Facebook',
  // },
];

export const tinymceInitValues = {
  apiKey: '8yd4ibfq5z8v9bj8ddn2hezmxgm68ijow36krpjasr0ucty8',
  height: 500,
  menubar: false,
  plugins: ['advlist autolink lists link', 'visualblocks code paste'],
  toolbar: `undo redo | formatselect | link | bold italic |
alignleft aligncenter alignright | code | \
bullist numlist outdent indent`,
};

export const FACEBOOK_APP_ID = 1171193606568391;

export const filterOrderItems = ['Tip', 'Faster Processing', 'Enhanced Matte Paper Poster', 'Enhanced Matte Paper Poster '];
export const filterOrderItemsAdmin = ['Tip', 'Faster Processing'];

export { default as WEB_ROUTES } from './web-routes';
