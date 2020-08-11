const WEB_ROUTES = {
  SIGN_IN: {
    path: '/signin',
    title: 'Sign in',
    permission: '',
  },
  USER_LIST: {
    path: '/user',
    title: 'Users',
    permission: 'VIEW_USER_LIST',
  },
  USER_DETAIL: {
    path: '/user/detail/:login',
    title: 'User Detail',
    permission: 'VIEW_USER_DETAIL',
  },
  USER_ROLE: {
    path: '/user/role',
    title: 'baseApp.sidebar.role',
    permission: 'VIEW_ROLE_LIST',
  },
  USER_PERMISSION: {
    path: '/user/permission',
    title: 'baseApp.sidebar.permission',
    permission: 'VIEW_ROLE_LIST',
  },
  CUSTOMER_LIST: {
    path: '/customer',
    title: 'baseApp.customerManagement.home.title',
    permission: 'VIEW_CUSTOMER_LIST',
  },
  CUSTOMER_DETAIL: {
    path: '/customer/detail/:login',
    title: 'baseApp.customerManagement.detail.title',
    permission: 'VIEW_CUSTOMER_DETAIL',
  },
  CUSTOMER_DETAIL_EDIT: {
    path: '/customer/detail/:login/edit',
    title: 'baseApp.customerManagement.detail.title',
    permission: 'EDIT_CUSTOMER',
  },
  CUSTOMER_GROUP_LIST: {
    path: '/customer-group',
    title: 'baseApp.sidebar.customerGroup',
    permission: 'VIEW_CUSTOMER_GROUP_LIST',
  },
  CUSTOMER_GROUP_DETAIL: {
    path: '/customer-group/detail/:id',
    title: 'Customer Group Detail',
    permission: 'VIEW_CUSTOMER_GROUP_DETAIL',
  },
  NOTIFICATION_LIST: {
    path: '/notifications',
    title: 'baseApp.sidebar.notification',
    permission: '',
  },
  ADMIN_NOTIFICATION_LIST: {
    path: '/admin-notifications',
    title: 'baseApp.sidebar.notification',
    permission: '',
  },
  SYSTEM_PROPERTY_LIST: {
    path: '/system-property',
    title: 'baseApp.sidebar.systemProperty',
    permission: '',
  },
  SYSTEM_PROPERTY_DETAIL: {
    path: '/system-property/detail/:id',
    title: 'System Property Detail',
    permission: 'baseApp.sidebar.systemProperty',
  },
  HOME: {
    path: '/',
    title: 'Home',
    permission: '',
  },
  ORDERS: {
    path: '/',
    title: 'Orders',
    permission: 'ACCESS_ORDER',
  },
  ORDERS_DETAIL: {
    path: '/order/:id',
    title: 'Orders Detail',
    permission: 'ACCESS_ORDER',
  },
  ARTISTS: {
    path: '/artists',
    title: 'Artists',
    permission: 'ACCESS_ARTIST',
  },
  ARTISTS_DETAIL: {
    path: '/artists/:login',
    title: 'Artists Detail',
    permission: 'ACCESS_ARTIST',
  },
  ARTISTS_DETAIL_FORM: {
    path: '/artists/:login/edit',
    title: 'Artists Detail',
    permission: 'ACCESS_ARTIST',
  },
  CS: {
    path: '/cs',
    title: 'Customer Service',
    permission: 'ACCESS_CS',
  },
  CS_DETAIL: {
    path: '/cs/:login',
    title: 'Customer Service Detail',
    permission: 'ACCESS_CS',
  },

  SETTINGS: {
    path: '/settings',
    title: 'Settings',
    permission: 'ACCESS_SETTING',
  },

  POLICY: {
    path: '/privacy-policy',
    title: 'privacy-policy',
    permission: '',
  },
  TERMS: {
    path: '/terms-conditions',
    title: 'Terms & Conditions',
    permission: '',
  },

  PAYOUTS: {
    path: '/payouts',
    title: 'Payouts',
    permission: 'VIEW_PAYOUT_LIST',
  },
  PAYOUTS_DETAIL: {
    path: '/payout/:id',
    title: 'Transaction details',
    permission: 'VIEW_PAYOUT_DETAIL',
  },

  GALLERY_LISTING: {
    path: '/gallery',
    title: 'Gallery', // 'baseApp.sidebar.galleryListing',
    permission: 'VIEW_ARTWORK_LIST',
  },
  GALLERY_DETAIL: {
    path: '/gallery/:id',
    title: 'Gallery Detail', // 'baseApp.sidebar.galleryListing',
    permission: 'VIEW_ARTWORK',
  },
  LATE_NOTIFICATION: {
    path: '/late-notification',
    title: 'Late Notification', // 'baseApp.sidebar.galleryListing',
    permission: 'VIEW_LATE_NOTIFICATION_LIST',
  },
};

export default WEB_ROUTES;
