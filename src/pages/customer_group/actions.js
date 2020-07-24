import { actionCreator } from 'utils';

import { getAllCustomerGroupsService, getCustomerGroupService, createCustomerGroupService, updateCustomerGroupService, deleteCustomerGroupService } from 'services/customer-groups';

export const GET_CUSTOMERGROUPS = actionCreator('GET_CUSTOMERGROUPS');
export const actGetCustomerGroups = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CUSTOMERGROUPS.PENDING,
    });

    const res = await getAllCustomerGroupsService();
    dispatch({
      type: GET_CUSTOMERGROUPS.SUCCESS,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: GET_CUSTOMERGROUPS.ERROR,
      payload: e.response,
    });
  }
};

export const GET_CUSTOMERGROUP = actionCreator('GET_CUSTOMERGROUP');
export const actGetCustomerGroup = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CUSTOMERGROUP.PENDING,
    });

    const res = await getCustomerGroupService(id);
    dispatch({
      type: GET_CUSTOMERGROUP.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: GET_CUSTOMERGROUP.ERROR,
      payload: e.response,
    });

    return e.response;
  }
};

export const UPDATE_CUSTOMERGROUP = actionCreator('UPDATE_CUSTOMERGROUP');
export const actUpdateCustomerGroup = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_CUSTOMERGROUP.PENDING,
    });

    const res = await updateCustomerGroupService(data);
    dispatch({
      type: UPDATE_CUSTOMERGROUP.SUCCESS,
      payload: res,
      data,
    });

    return res;
  } catch (e) {
    dispatch({
      type: UPDATE_CUSTOMERGROUP.ERROR,
      payload: e.response,
    });

    return e.response;
  }
};

export const DELETE_CUSTOMERGROUP = actionCreator('DELETE_CUSTOMERGROUP');
export const actDeleteCustomerGroup = (data) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CUSTOMERGROUP.PENDING,
    });

    const res = await deleteCustomerGroupService(data);
    dispatch({
      type: DELETE_CUSTOMERGROUP.SUCCESS,
      payload: res,
      data,
    });

    return res;
  } catch (e) {
    dispatch({
      type: DELETE_CUSTOMERGROUP.ERROR,
      payload: e.response,
    });

    return e.response;
  }
};

export const CREATE_CUSTOMERGROUP = actionCreator('CREATE_CUSTOMERGROUP');
export const actCreateCustomerGroup = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_CUSTOMERGROUP.PENDING,
    });

    const res = await createCustomerGroupService(data);
    dispatch({
      type: CREATE_CUSTOMERGROUP.SUCCESS,
      payload: res,
      data,
    });

    return res;
  } catch (e) {
    dispatch({
      type: CREATE_CUSTOMERGROUP.ERROR,
      payload: e.response,
    });

    return e.response;
  }
};
