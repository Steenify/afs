import { actionCreator, actionTryCatchCreator } from 'utils';
import {
  getAllOrdersService,
  updateOrderBudgetService,
  assignOrderService,
  updateOrderArtistPaymentService,
  updateOrderArtistPaymentBulkService,
  getOrderCountByStatusService,
  getOrderBulkMarkAsDoneService,
} from 'services/order';
import { getAssignArtistsService } from 'services/artist';
import { getAllStatusService } from 'services/status';

export const ORDER_ACTIONS = {
  UPDATE_SELECTED_STATUS_ACTION: 'UPDATE_SELECTED_STATUS_ACTION',
  UPDATE_ALL_SELECTED_ROW_ACTION: 'UPDATE_ALL_SELECTED_ROW_ACTION',
  UPDATE_ORDER_ITEMS_ACTION: 'UPDATE_ORDER_ITEMS_ACTION',
};

export const updateOrderItemsAcion = (payload) => (dispatch) => {
  dispatch({
    type: ORDER_ACTIONS.UPDATE_ORDER_ITEMS_ACTION,
    payload,
  });
};

export const updateAllOrderSelectedAction = (payload) => (dispatch) => {
  dispatch({
    type: ORDER_ACTIONS.UPDATE_ALL_SELECTED_ROW_ACTION,
    payload,
  });
};
export const updateSelectedStatusAction = (payload) => (dispatch, getState) => {
  dispatch({
    type: ORDER_ACTIONS.UPDATE_SELECTED_STATUS_ACTION,
    payload,
  });

  getOrdersAction({ sort: [{ id: 'number', desc: true }] })(dispatch, getState);
};

export const GET_ORDER_ACTION = actionCreator('GET_ORDER_ACTION');
export const getOrdersAction = (params) => async (dispatch, getState) => {
  const state = getState();
  const { form = {}, order } = state;
  const { ordersFilter = {} } = form;
  const { values } = ordersFilter;

  const searchParams = buildSearchParam({
    ...values,
    ...params,
    status: order.ui.list.selectedStatus,
  });

  const onPending = () => {
    dispatch({
      type: GET_ORDER_ACTION.PENDING,
    });
  };
  const onSuccess = (data, headers) => {
    dispatch({ type: GET_ORDER_ACTION.SUCCESS, payload: { data, headers } });
  };
  const onError = (error) => {
    console.log('getOrdersAction -> error', error);
    dispatch({
      type: GET_ORDER_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: getAllOrdersService(searchParams),
    onPending,
    onSuccess,
    onError,
  });
};

const buildSearchParam = (input = {}) => {
  var params = new URLSearchParams();
  if (input.status) {
    params.append('status', input.status || '');
  }
  params.append('text', input.text || '');
  params.append('page', input.page || 0);
  params.append('size', (input.size && parseInt(input.size)) || 100);

  if (input.sort && input.sort.length) {
    input.sort.forEach((item) => {
      const textSort = item.id + ',' + (item.desc ? 'desc' : 'asc');
      params.append('sort', textSort);
    });
  }

  return params;
};

export const UPDATE_ORDER_BUDGET_ACTION = actionCreator(
  'UPDATE_ORDER_BUDGET_ACTION',
);
export const updateOrdersBudgetAction = (payload, id, cb) => async (
  dispatch,
) => {
  const onPending = () => {
    dispatch({
      type: UPDATE_ORDER_BUDGET_ACTION.PENDING,
    });
  };
  const onSuccess = (data, headers) => {
    dispatch({ type: UPDATE_ORDER_BUDGET_ACTION.SUCCESS, payload: payload });
    cb && cb();
  };
  const onError = (error) => {
    console.log('updateOrdersAction', error);
    dispatch({
      type: UPDATE_ORDER_BUDGET_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: updateOrderBudgetService(payload, id),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_ARTISTS_ACTION = actionCreator('GET_ARTISTS_ACTION');
export const getArtistsAction = (params = {}) => async (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_ARTISTS_ACTION.PENDING,
    });
  };
  const onSuccess = (data, headers) => {
    dispatch({ type: GET_ARTISTS_ACTION.SUCCESS, payload: data });
  };
  const onError = (error) => {
    console.log('GET_ARTISTS_ACTION -> error', error);
    dispatch({
      type: GET_ARTISTS_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: getAssignArtistsService(params),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_ORDER_ARTIST_ACTION = actionCreator(
  'UPDATE_ORDER_ARTIST_ACTION',
);
export const assignOrdersArtistAction = (payload, cb) => async (dispatch) => {
  const onPending = () => {
    dispatch({
      type: UPDATE_ORDER_ARTIST_ACTION.PENDING,
    });
  };
  const onSuccess = (data, headers) => {
    dispatch({ type: UPDATE_ORDER_ARTIST_ACTION.SUCCESS, payload: data });
    cb && cb();
  };
  const onError = (error) => {
    console.log('assignOrdersArtistAction', error);
    dispatch({
      type: UPDATE_ORDER_ARTIST_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: assignOrderService(payload),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_ORDER_STATUS_ACTION = actionCreator('GET_ORDER_STATUS_ACTION');
export const getOrderStatusAction = (payload) => async (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_ORDER_STATUS_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({ type: GET_ORDER_STATUS_ACTION.SUCCESS, payload: data });
  };
  const onError = (error) => {
    console.log('getOrderStatusAction', error);
    dispatch({
      type: GET_ORDER_STATUS_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: getAllStatusService(payload),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_ORDER_PAYMENT_STATUS_ACTION = actionCreator(
  'UPDATE_ORDER_PAYMENT_STATUS_ACTION',
);
export const updateOrderPaymentStatusAction = (payload, id) => async (
  dispatch,
) => {
  const onPending = () => {
    dispatch({
      type: UPDATE_ORDER_PAYMENT_STATUS_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: UPDATE_ORDER_PAYMENT_STATUS_ACTION.SUCCESS,
      payload: data,
    });
  };
  const onError = (error) => {
    console.log('getOrderStatusAction', error);
    dispatch({
      type: UPDATE_ORDER_PAYMENT_STATUS_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: updateOrderArtistPaymentService(id, payload),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_ORDER_PAYMENT_STATUS_BULK_ACTION = actionCreator(
  'UPDATE_ORDER_PAYMENT_STATUS_BULK_ACTION',
);
export const updateOrderPaymentStatusBulkAction = (
  status,
  payload,
  cb,
) => async (dispatch) => {
  const onPending = () => {
    dispatch({
      type: UPDATE_ORDER_PAYMENT_STATUS_BULK_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    if (data) {
      dispatch({
        type: UPDATE_ORDER_PAYMENT_STATUS_BULK_ACTION.SUCCESS,
        payload: data,
      });
      cb && cb();
    }
  };
  const onError = (error) => {
    console.log('updateOrderPaymentStatusBulkAction', error);
    dispatch({
      type: UPDATE_ORDER_PAYMENT_STATUS_BULK_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: updateOrderArtistPaymentBulkService(status, payload),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_ORDER_STATUS_DONE_BULK_ACTION = actionCreator(
  'UPDATE_ORDER_STATUS_DONE_BULK_ACTION',
);
export const updateOrderStatusDoneBulkAction = (payload, cb) => async (
  dispatch,
) => {
  const onPending = () => {
    dispatch({
      type: UPDATE_ORDER_STATUS_DONE_BULK_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    if (data) {
      dispatch({
        type: UPDATE_ORDER_STATUS_DONE_BULK_ACTION.SUCCESS,
        payload: data,
      });
      cb && cb();
    }
  };
  const onError = (error) => {
    console.log('updateOrderStatusDoneBulkAction', error);
    dispatch({
      type: UPDATE_ORDER_STATUS_DONE_BULK_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: getOrderBulkMarkAsDoneService(payload),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_ORDER_COUNT_BY_STATUS_ACTION = actionCreator(
  'GET_ORDER_COUNT_BY_STATUS_ACTION',
);
export const getOrderCountByStatusAction = () => async (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_ORDER_COUNT_BY_STATUS_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: GET_ORDER_COUNT_BY_STATUS_ACTION.SUCCESS,
      payload: data,
    });
  };
  const onError = (error) => {
    console.log('getOrderStatusAction', error);
    dispatch({
      type: GET_ORDER_COUNT_BY_STATUS_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: getOrderCountByStatusService(),
    onPending,
    onSuccess,
    onError,
  });
};
