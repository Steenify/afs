import { actionCreator, actionTryCatchCreator } from 'utils';
import { getCustomerDetailService, updateCustomerService } from 'services/customers';
import { getAllOrdersService } from 'services/order';

export const GET_CUSTOMER_DETAIL_ACTION = actionCreator('GET_CUSTOMER_DETAIL_ACTION');
export const getCustomerDetailAction = (login, onSuccess, onError) => async (dispatch) => {
  actionTryCatchCreator({
    service: getCustomerDetailService(login),
    onPending: () =>
      dispatch({
        type: GET_CUSTOMER_DETAIL_ACTION.PENDING,
      }),
    onSuccess: (data) => {
      dispatch({
        type: GET_CUSTOMER_DETAIL_ACTION.SUCCESS,
        payload: data,
      });
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      dispatch({
        type: GET_CUSTOMER_DETAIL_ACTION.ERROR,
        payload: error.response,
      });
      if (onError) onError(error.response);
    },
  });
};

export const GET_CUSTOMER_ORDERS_ACTION = actionCreator('GET_CUSTOMER_ORDERS_ACTION');
export const getCustomerOrdersAction = (login, onSuccess, onError) => async (dispatch) => {
  var params = new URLSearchParams();
  params.append('customer', login || '');
  actionTryCatchCreator({
    service: getAllOrdersService(params),
    onPending: () =>
      dispatch({
        type: GET_CUSTOMER_ORDERS_ACTION.PENDING,
      }),
    onSuccess: (data, headers) => {
      dispatch({
        type: GET_CUSTOMER_ORDERS_ACTION.SUCCESS,
        payload: { data, headers },
      });
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      dispatch({
        type: GET_CUSTOMER_ORDERS_ACTION.ERROR,
        payload: error.response,
      });
      if (onError) onError(error.response);
    },
  });
};

export const RESET_CUSTOMER_DETAIL_ACTION = 'RESET_CUSTOMER_DETAIL_ACTION';
export const resetCustomerDetailAction = () => async (dispatch) => {
  dispatch({
    type: RESET_CUSTOMER_DETAIL_ACTION,
  });
};

export const UPDATE_CUSTOMER_DETAIL_ACTION = actionCreator('UPDATE_CUSTOMER_DETAIL_ACTION');
export const updateCustomerDetailAction = (payload, onSuccess, onError) => (dispatch) => {
  actionTryCatchCreator({
    service: updateCustomerService(payload),
    onPending: () => dispatch({ type: UPDATE_CUSTOMER_DETAIL_ACTION.PENDING }),
    onSuccess: (data) => {
      dispatch({
        type: UPDATE_CUSTOMER_DETAIL_ACTION.SUCCESS,
        payload: data,
      });
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      dispatch({
        type: UPDATE_CUSTOMER_DETAIL_ACTION.ERROR,
        payload: error.response,
      });
      if (onError) onError(error.response);
    },
  });
};
