import { actionCreator, actionTryCatchCreator } from 'utils';
import {
  signin,
  getAccount,
  changePassword,
  logoutService,
} from 'services/auth.service';

export const SIGNIN = actionCreator('SIGNIN');
export const actSignin = (params) => async (dispatch) => {
  try {
    dispatch({
      type: SIGNIN.PENDING,
    });

    const res = await signin(params);
    dispatch({
      type: SIGNIN.SUCCESS,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: SIGNIN.ERROR,
      message: e.message || '',
    });
    console.log(e);
  }
};

export const GET_ACCOUNT = actionCreator('GET_ACCOUNT');
export const actGetAccount = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ACCOUNT.PENDING,
    });

    const res = await getAccount();
    dispatch({
      type: GET_ACCOUNT.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: GET_ACCOUNT.ERROR,
      payload: e.response,
    });

    return e.response;
  }
};

export const CHANGE_PASSWORD = actionCreator('CHANGE_PASSWORD');
export const actChangePassword = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_PASSWORD.PENDING,
    });

    const res = await changePassword(data);
    dispatch({
      type: CHANGE_PASSWORD.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: CHANGE_PASSWORD.ERROR,
      payload: e.response,
    });

    return e.response;
  }
};

export const SIGNOUT = actionCreator('SIGNOUT');
export const actSignout = () => async (dispatch) => {
  dispatch({
    type: SIGNOUT.SUCCESS,
  });
};

export const LOGOUT_ACTION = actionCreator('LOGOUT_ACTION');
export const logOutAction = (payload, cb) => async (dispatch) => {
  const onPending = () => {
    dispatch({
      type: LOGOUT_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    cb && cb();
    dispatch({
      type: LOGOUT_ACTION.SUCCESS,
      payload: data,
    });
  };
  const onError = (error) => {
    console.log('logOutAction', error);
    dispatch({
      type: LOGOUT_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: logoutService(payload),
    onPending,
    onSuccess,
    onError,
  });
};
