import { actionCreator, actionTryCatchCreator, isMobile } from 'utils';
import { getCustomersService, getCustomerDetailService, updateCustomerService, createCustomerService } from 'services/customers';

export const UPDATE_CUSTOMER_ITEM_ACTION = 'UPDATE_CUSTOMER_ITEM_ACTION';
export const updateCustomersItemsAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_CUSTOMER_ITEM_ACTION,
    payload,
  });
};

export const UPDATE_CUSTOMERS_ALL_SELECTED_ROW_ACTION = 'UPDATE_CUSTOMERS_ALL_SELECTED_ROW_ACTION';
export const updateAllCustomersSelectedAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_CUSTOMERS_ALL_SELECTED_ROW_ACTION,
    payload,
  });
};

export const UPDATE_CUSTOMER_FILTER_ACTION = 'UPDATE_CUSTOMER_FILTER_ACTION';
export const updateCustomerFilterAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_CUSTOMER_FILTER_ACTION,
    payload,
  });
  dispatch(getCustomerListAction());
};

export const GET_CUSTOMER_LIST_ACTION = actionCreator('GET_CUSTOMER_LIST_ACTION');
export const getCustomerListAction = (params = {}) => async (dispatch, getState) => {
  const { filter } = getState().customers;

  const currSize = isMobile() ? filter.sizeMobile : filter.size;

  const searchParams = buildSearchParam({
    ...filter,
    ...params,
    size: currSize,
  });
  actionTryCatchCreator({
    service: getCustomersService(searchParams),
    onPending: () => dispatch({ type: GET_CUSTOMER_LIST_ACTION.PENDING }),
    onSuccess: (data, headers) => dispatch({ type: GET_CUSTOMER_LIST_ACTION.SUCCESS, payload: { data, headers } }),
    onError: () => dispatch({ type: GET_CUSTOMER_LIST_ACTION.ERROR }),
  });
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

export const CREATE_CUSTOMER_ACTION = actionCreator('CREATE_CUSTOMER_ACTION');
export const createCustomerAction = (params) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_CUSTOMER_ACTION.PENDING,
    });

    const res = await createCustomerService(params);
    dispatch({
      type: CREATE_CUSTOMER_ACTION.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: CREATE_CUSTOMER_ACTION.ERROR,
      payload: e.response,
    });
    return e.response;
  }
};

export const UPDATE_CUSTOMER_ACTION = actionCreator('UPDATE_CUSTOMER_ACTION');
export const updateCustomerAction = (params, onSuccess, onError) => async (dispatch) => {
  actionTryCatchCreator({
    service: updateCustomerService(params),
    onPending: () => dispatch({ type: UPDATE_CUSTOMER_ACTION.PENDING }),
    onSuccess: (data) => {
      dispatch({
        type: UPDATE_CUSTOMER_ACTION.SUCCESS,
        payload: data,
      });
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      dispatch({
        type: UPDATE_CUSTOMER_ACTION.ERROR,
        payload: error.response,
      });
      if (onError) onError(error.response);
    },
  });
};
