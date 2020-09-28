import update from 'react-addons-update';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
// import home from 'pages/home/reducer';
import user from 'pages/user_management/reducer';
import auth from 'pages/auth/reducer';
import role from 'pages/role_management/reducer';
import customers from 'pages/customers/reducer';
import customerDetail from 'pages/customers_detail/reducer';
import notification from 'pages/notifications/reducer';
import systemProperty from 'pages/system_property_management/reducer';
import orderTable from 'components/tables/orders/reducer';
import order from 'pages/orders/reducer';
import orderDetail from 'pages/orders_detail/reducer';
import artists from 'pages/artists/reducer';
import artistDetail from 'pages/artist_detail/reducer';
import payouts from 'pages/payouts/reducer';
import gallery from 'pages/gallery/reducer';
import lateNotification from 'pages/late_notification/reducer';
import notificationSettings from 'pages/notification_settings/reducer';

import { GLOBAL_ACTIONS, AUTHENTICATE_TOKEN } from './actions';

const initialState = {
  ui: {
    loading: false,
    isAuthenticated: false,
    redirectLink: '',
    isMenuOpen: false,
  },
  data: {
    user: {},
    auth: {},
    role: {},
    customers: {},
    notification: {},
    systemProperty: {},
    lang: 'en',
  },
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_ACTIONS.UPDATE_APP_LOADING:
      return update(state, {
        ui: {
          loading: { $set: action.payload },
        },
      });
    case GLOBAL_ACTIONS.UPDATE_USER_INFO: {
      return update(state, {
        data: {
          user: { $set: action.payload },
        },
      });
    }
    case AUTHENTICATE_TOKEN.SUCCESS: {
      return update(state, {
        ui: {
          redirectLink: { $set: 'menu' },
        },
      });
    }
    case AUTHENTICATE_TOKEN.ERROR: {
      return update(state, {
        ui: {
          redirectLink: { $set: 'blocked' },
        },
      });
    }
    case GLOBAL_ACTIONS.CHANGE_LANG:
      return update(state, {
        data: {
          lang: { $set: action.payload },
        },
      });

    case GLOBAL_ACTIONS.TOGGLE_MENU:
      return update(state, {
        ui: {
          isMenuOpen: { $set: action.payload },
        },
      });
    default:
      return state;
  }
};

export default combineReducers({
  form,
  global,
  // home,
  user,
  auth,
  role,
  customers,
  customerDetail,
  notification,
  systemProperty,
  orderTable,
  order,
  orderDetail,
  artists,
  artistDetail,
  payouts,
  gallery,
  lateNotification,
  notificationSettings,
});
