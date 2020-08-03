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
  VIEW_CUSTOMER_GENERAL_INFO: 'VIEW_CUSTOMER_GENERAL_INFO',
  VIEW_ARTIST_LIST: 'VIEW_ARTIST_LIST',
  MODIFY_DELIVERY: 'MODIFY_DELIVERY',
  UPDATE_ARTIST: 'UPDATE_ARTIST',
  VIEW_PAYOUT_LIST: 'VIEW_PAYOUT_LIST',
  VIEW_PAYOUT_DETAIL: 'VIEW_PAYOUT_DETAIL',
  CREATE_PAYOUT: 'CREATE_PAYOUT',
};

export const listStatus = ['NEW_ORDER', 'SKETCH', 'SKETCH_REVIEW', 'SKETCH_EDIT', 'COLOR', 'COLOR_REVIEW', 'COLOR_EDIT', 'EXPORT_FILE', 'SEND_FILE', 'DONE'];

export const mapStatusCanNotUpload = ['SKETCH_REVIEW', 'COLOR_REVIEW', 'SEND_FILE'];

export const mapStatusOpen = {
  SKETCH: ['SKETCH', 'CUSTOMER_REVIEW_SKETCH', 'SKETCH_REVIEW', 'SKETCH_EDIT'],
  COLOR: ['COLOR', 'CUSTOMER_REVIEW_COLOR', 'COLOR_REVIEW', 'COLOR_EDIT'],
  EXPORT_FILE: ['EXPORT_FILE', 'SEND_FILE'],
  NEW_ORDER: ['NEW_ORDER'],
  DONE: ['DONE'],
};

export const mapStatusNotiy = ['CUSTOMER_REVIEW_COLOR', 'CUSTOMER_REVIEW_SKETCH', 'SEND_FILE', 'SKETCH_REVIEW', 'COLOR_REVIEW'];

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
