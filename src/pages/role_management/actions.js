import { actionCreator } from 'utils';
import {
  getAuthorities,
  getAuthority,
  updateAuthority,
  getAllPermissions,
  createAuthority,
  deleteAuthority,
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
} from 'services/role.service';

export const GET_AUTHORITIES = actionCreator('GET_AUTHORITIES');
export const actGetAuthorities = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_AUTHORITIES.PENDING,
    });

    const res = await getAuthorities();
    dispatch({
      type: GET_AUTHORITIES.SUCCESS,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: GET_AUTHORITIES.ERROR,
    });
    console.log(e);
  }
};

export const GET_AUTHORITY = actionCreator('GET_AUTHORITY');
export const actGetAuthority = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_AUTHORITY.PENDING,
    });

    const res = await getAuthority(id);
    dispatch({
      type: GET_AUTHORITY.SUCCESS,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: GET_AUTHORITY.ERROR,
    });
    console.log(e);
  }
};

export const UPDATE_AUTHORITY = actionCreator('UPDATE_AUTHORITY');
export const actUpdateAuthority = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_AUTHORITY.PENDING,
    });

    const res = await updateAuthority(data);
    dispatch({
      type: UPDATE_AUTHORITY.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: UPDATE_AUTHORITY.ERROR,
      payload: e.response,
    });

    return e.response;
  }
};

export const CREATE_AUTHORITY = actionCreator('CREATE_AUTHORITY');
export const actCreateAuthority = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_AUTHORITY.PENDING,
    });

    const res = await createAuthority(data);
    dispatch({
      type: CREATE_AUTHORITY.SUCCESS,
      payload: res,
    });
    return res;
  } catch (e) {
    dispatch({
      type: CREATE_AUTHORITY.ERROR,
    });
    console.log(e);
    return e.response;
  }
};

export const DELETE_AUTHORITY = actionCreator('DELETE_AUTHORITY');
export const actDeleteAuthority = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_AUTHORITY.PENDING,
    });

    const res = await deleteAuthority(id);
    dispatch({
      type: DELETE_AUTHORITY.SUCCESS,
      payload: res,
    });
    return res;
  } catch (e) {
    dispatch({
      type: DELETE_AUTHORITY.ERROR,
    });
    console.log(e);
    return e.response;
  }
};

export const GET_PERMISSIONS = actionCreator('GET_PERMISSIONS');
export const actGetAllPermissions = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PERMISSIONS.PENDING,
    });

    const res = await getAllPermissions();
    dispatch({
      type: GET_PERMISSIONS.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: GET_PERMISSIONS.ERROR,
    });
    console.log(e);
  }
};

export const GET_PERMISSION = actionCreator('GET_PERMISSION');
export const actGetPermission = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PERMISSION.PENDING,
    });

    const res = await getPermission(id);
    dispatch({
      type: GET_PERMISSION.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: GET_PERMISSION.ERROR,
    });
    console.log(e);
  }
};

export const UPADTE_PERMISSION = actionCreator('UPADTE_PERMISSION');
export const actUpdatePermission = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPADTE_PERMISSION.PENDING,
    });

    const res = await updatePermission(data);
    dispatch({
      type: UPADTE_PERMISSION.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: UPADTE_PERMISSION.ERROR,
      payload: e.response,
    });
    return e.response;
  }
};

export const CREATE_PERMISSION = actionCreator('CREATE_PERMISSION');
export const actCreatePermission = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_PERMISSION.PENDING,
    });

    const res = await createPermission(data);
    dispatch({
      type: CREATE_PERMISSION.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: CREATE_PERMISSION.ERROR,
    });
    console.log(e);
  }
};

export const DELETE_PERMISSION = actionCreator('DELETE_PERMISSION');
export const actDeletePermission = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PERMISSION.PENDING,
    });

    const res = await deletePermission(id);
    dispatch({
      type: DELETE_PERMISSION.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: DELETE_PERMISSION.ERROR,
    });
    console.log(e);
  }
};
