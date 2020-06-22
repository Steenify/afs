import update from 'react-addons-update';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import home from 'pages/home/reducer';
import user from 'pages/user_management/reducer';
import auth from 'pages/auth/reducer';
import role from 'pages/role_management/reducer';
import customer from 'pages/customer_management/reducer';
import notification from 'pages/notification_management/reducer';
import systemProperty from 'pages/system_property_management/reducer';
import order from 'pages/orders/reducer';
import orderDetail from 'pages/orders_detail/reducer';
import artists from 'pages/artists/reducer';
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
    customer: {},
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
  home,
  user,
  auth,
  role,
  customer,
  notification,
  systemProperty,
  order,
  orderDetail,
  artists,
});
