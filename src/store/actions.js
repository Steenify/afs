import { actionCreator } from 'utils';
import { authenticateTokenService } from 'services';

export const GLOBAL_ACTIONS = {
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  UPDATE_APP_LOADING: 'UPDATE_APP_LOADING',
  CHANGE_LANG: 'CHANGE_LANG',
  TOGGLE_MENU: 'TOGGLE_MENU',
};

export const updateAppLoading = (payload) => (dispatch) => {
  dispatch({
    type: GLOBAL_ACTIONS.UPDATE_APP_LOADING,
    payload,
  });
};

export const updateUserInfo = (payload) => (dispatch) => {
  dispatch({
    type: GLOBAL_ACTIONS.UPDATE_USER_INFO,
    payload,
  });
};

export const AUTHENTICATE_TOKEN = actionCreator('AUTHENTICATE_TOKEN');
export const authenticateTokenAction = (token) => async (dispatch) => {
  try {
    dispatch({
      type: AUTHENTICATE_TOKEN.PENDING,
    });
    const { status, data } = await authenticateTokenService(token);
    if (status === 200) {
      dispatch({
        type: AUTHENTICATE_TOKEN.SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: AUTHENTICATE_TOKEN.ERROR,
      });
    }
  } catch (error) {
    dispatch({
      type: AUTHENTICATE_TOKEN.ERROR,
      payload: error,
    });
    console.log(error);
  }
};

export const changeLanguage = (payload) => (dispatch) => {
  dispatch({
    type: GLOBAL_ACTIONS.CHANGE_LANG,
    payload,
  });
};

export const toggleMenu = (payload) => (dispatch) => {
  dispatch({
    type: GLOBAL_ACTIONS.TOGGLE_MENU,
    payload,
  });
};
