import { actionCreator } from 'utils';

import {
  getAllCustomerGroups,
  getCustomerGroup,
  createCustomerGroup,
  getCustomers,
  getCustomer,
  updateCustomer,
  createCustomer,
  updateCustomerGroup,
  deleteCustomerGroup,
} from 'services/customer.service';

export const GET_CUSTOMERGROUPS = actionCreator('GET_CUSTOMERGROUPS');
export const actGetCustomerGroups = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CUSTOMERGROUPS.PENDING,
    });

    const res = await getAllCustomerGroups();
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

    const res = await getCustomerGroup(id);
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

    const res = await updateCustomerGroup(data);
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

    const res = await deleteCustomerGroup(data);
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

    const res = await createCustomerGroup(data);
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

export const GET_CUSTOMERS = actionCreator('GET_CUSTOMERS');
export const actGetCustomers = (params) => async (dispatch, getState) => {
  const state = getState();
  const { form = {} } = state;
  const { customerSearchBox = {} } = form;
  const { values } = customerSearchBox;
  try {
    dispatch({
      type: GET_CUSTOMERS.PENDING,
    });

    const searchParams = buildSearchParam({
      ...values,
      ...params,
    });
    const res = await getCustomers(searchParams);
    dispatch({
      type: GET_CUSTOMERS.SUCCESS,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: GET_CUSTOMERS.ERROR,
      payload: e.response,
    });
  }
};

const buildSearchParam = (input = {}) => {
  var params = new URLSearchParams();
  params.append('name', input.name || '');
  params.append('customerGroups', input.customerGroups || '');
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

export const GET_CUSTOMER_DETAIL = actionCreator('GET_CUSTOMER_DETAIL');
export const actGetCustomer = (login) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CUSTOMER_DETAIL.PENDING,
    });
    const res = await getCustomer(login);
    dispatch({
      type: GET_CUSTOMER_DETAIL.SUCCESS,
      payload: res,
    });
    return res;
  } catch (e) {
    dispatch({
      type: GET_CUSTOMER_DETAIL.ERROR,
    });
    return e.response;
  }
};

export const UPDATE_CUSTOMER = actionCreator('UPDATE_CUSTOMER');
export const actUpdateCustomer = (params) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_CUSTOMER.PENDING,
    });

    const res = await updateCustomer(params);
    console.log('actUpdateCustomer -> params', params);
    dispatch({
      type: UPDATE_CUSTOMER.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: UPDATE_CUSTOMER.ERROR,
      payload: e.response,
    });

    return e.response;
  }
};

export const CREATE_CUSTOMER = actionCreator('CREATE_CUSTOMER');
export const actCreateCustomer = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_CUSTOMER.PENDING,
    });

    const res = await createCustomer(params);
    dispatch({
      type: CREATE_CUSTOMER.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: CREATE_CUSTOMER.ERROR,
      payload: e.response,
    });
    return e.response;
  }
};

export const UPDATE_SORT_CUSTOMER = actionCreator('UPDATE_SORT_CUSTOMER');
export const actUpdateSortCustomer = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_SORT_CUSTOMER.SUCCESS,
    payload,
  });
};
