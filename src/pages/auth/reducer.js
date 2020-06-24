import update from 'react-addons-update';
import { storeData } from 'utils';

import {
  SIGNIN,
  GET_ACCOUNT,
  SIGNOUT,
  CHANGE_PASSWORD,
  LOGOUT_ACTION,
} from './actions';

const initialState = {
  ui: {
    changePassword: {},
  },
  error: {
    changePassword: {},
  },
  data: {
    idToken: '',
    isAuthUser: !!localStorage.getItem('token'),
    accountInfo: {},
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload, message } = action;

  switch (type) {
    case SIGNIN.PENDING:
      return update(state, {
        ui: {
          loading: { $set: true },
        },
        error: {
          message: { $set: '' },
        },
      });
    case SIGNIN.SUCCESS:
      storeData('token', payload.data.id_token);
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        error: {
          message: { $set: '' },
        },
        data: {
          idToken: { $set: payload.data.id_token },
          isAuthUser: { $set: true },
        },
      });
    case SIGNIN.ERROR:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        error: {
          message: { $set: message },
        },
      });

    case GET_ACCOUNT.PENDING:
      return update(state, {
        ui: {
          loading: { $set: true },
        },
        error: {
          message: { $set: '' },
        },
      });
    case GET_ACCOUNT.SUCCESS:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        error: {
          message: { $set: '' },
        },
        data: {
          accountInfo: {
            $set: payload.data,
          },
        },
      });
    case GET_ACCOUNT.ERROR:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        error: {
          message: { $set: message },
        },
      });

    case LOGOUT_ACTION.SUCCESS:
    case SIGNOUT.SUCCESS:
      storeData('token', '');
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        error: {
          message: { $set: message },
        },
        data: {
          idToken: { $set: '' },
          isAuthUser: { $set: false },
          accountInfo: { $set: {} },
        },
      });

    case CHANGE_PASSWORD.PENDING:
      return update(state, {
        ui: {
          changePassword: {
            loading: { $set: true },
          },
        },
        error: {
          changePassword: {
            message: { $set: '' },
          },
        },
      });
    case CHANGE_PASSWORD.SUCCESS:
      return update(state, {
        ui: {
          changePassword: {
            loading: { $set: false },
          },
        },
        error: {
          changePassword: { message: { $set: '' } },
        },
      });
    case CHANGE_PASSWORD.ERROR:
      return update(state, {
        ui: {
          changePassword: {
            loading: { $set: false },
          },
        },
        error: {
          changePassword: {
            message: { $set: message },
          },
        },
      });
    default:
      return state;
  }
};

export default reducer;
