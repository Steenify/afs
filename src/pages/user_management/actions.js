import { actionCreator, actionTryCatchCreator, isMobile } from 'utils';
import { getUsers, getUser, updateUser, createUser, getUserRoles } from 'services/user.service';

const buildSearchParam = (input = {}) => {
  var params = new URLSearchParams();
  params.append('name', input.name || '');
  params.append('role', input.role || '');
  params.append('page', input.page || 0);
  params.append('size', (input.size && parseInt(input.size)) || 20);

  if (input.sort && input.sort.length) {
    input.sort.forEach((item) => {
      const textSort = item.id + ',' + (item.desc ? 'desc' : 'asc');
      params.append('sort', textSort);
    });
  }

  return params;
};

export const GET_USER_LIST_ACTION = actionCreator('GET_USER_LIST_ACTION');
export const getUserListAction = (params = {}) => async (dispatch, getState) => {
  const { filter } = getState().user;

  const currSize = isMobile() ? filter.sizeMobile : filter.size;

  const searchParams = buildSearchParam({
    ...filter,
    ...params,
    size: currSize,
  });
  actionTryCatchCreator({
    service: getUsers(searchParams),
    onPending: () => dispatch({ type: GET_USER_LIST_ACTION.PENDING }),
    onSuccess: (data, headers) => dispatch({ type: GET_USER_LIST_ACTION.SUCCESS, payload: { data, headers } }),
    onError: () => dispatch({ type: GET_USER_LIST_ACTION.ERROR }),
  });
};

export const UPDATE_USER_FILTER_ACTION = 'UPDATE_USER_FILTER_ACTION';
export const updateUserFilterAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_USER_FILTER_ACTION,
    payload,
  });
  dispatch(getUserListAction());
};

export const UPDATE_USER_ITEM_ACTION = 'UPDATE_USER_ITEM_ACTION';
export const updateUserItemsAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_USER_ITEM_ACTION,
    payload,
  });
};

export const UPDATE_USER_ALL_SELECTED_ROW_ACTION = 'UPDATE_USER_ALL_SELECTED_ROW_ACTION';
export const updateAllUserSelectedAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_USER_ALL_SELECTED_ROW_ACTION,
    payload,
  });
};

export const GET_USERS = actionCreator('GET_USERS');
export const actGetUsers = (params) => async (dispatch, getState) => {
  const state = getState();
  const { form = {} } = state;
  const { userSearchBox = {} } = form;
  const { values } = userSearchBox;
  try {
    const searchParams = buildSearchParam({
      ...values,
      ...params,
    });

    dispatch({
      type: GET_USERS.PENDING,
    });

    const res = await getUsers(searchParams);

    dispatch({
      type: GET_USERS.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: GET_USERS.ERROR,
      payload: e.response,
    });

    return e.response;
  }
};

export const GET_USER_DETAIL = actionCreator('GET_USER_DETAIL');
export const actGetUser = (login) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_DETAIL.PENDING,
    });
    const res = await getUser(login);
    dispatch({
      type: GET_USER_DETAIL.SUCCESS,
      payload: res,
    });
    return res;
  } catch (e) {
    dispatch({
      type: GET_USER_DETAIL.ERROR,
    });
    console.log(e);
    return e.response;
  }
};

export const UPDATE_USER = actionCreator('UPDATE_USER');
export const actUpdateUser = (params) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_USER.PENDING,
    });

    const res = await updateUser(params);
    dispatch({
      type: UPDATE_USER.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: UPDATE_USER.ERROR,
      payload: e.response,
    });

    return e.response;
  }
};

export const CREATE_USER = actionCreator('CREATE_USER');
export const actCreateUser = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_USER.PENDING,
    });

    const res = await createUser(params);
    dispatch({
      type: CREATE_USER.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: CREATE_USER.ERROR,
      payload: e.response,
    });
    return e.response;
  }
};

export const GET_USERROLES = actionCreator('GET_USERROLES');
export const actGetUserRoles = (params) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USERROLES.PENDING,
    });

    const res = await getUserRoles();
    dispatch({
      type: GET_USERROLES.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: GET_USERROLES.ERROR,
      payload: e.response,
    });

    return e.response;
  }
};

export const UPDATE_SORT_USER = actionCreator('UPDATE_SORT_USER');
export const actUpdateSortUser = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_SORT_USER.SUCCESS,
    payload,
  });
};
