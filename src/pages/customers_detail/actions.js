import { actionCreator, actionTryCatchCreator } from 'utils';
import { getCustomerDetailService } from 'services/customers';
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
