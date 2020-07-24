import { actionCreator, actionTryCatchCreator } from 'utils';
import { getCustomerDetailService } from 'services/customers';

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
