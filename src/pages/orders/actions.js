import { actionCreator, actionTryCatchCreator, isMobile } from 'utils';
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
import { createPayoutService } from 'services/payout';

export const ORDER_ACTIONS = {
  UPDATE_SELECTED_STATUS_ACTION: 'UPDATE_SELECTED_STATUS_ACTION',
  UPDATE_ALL_SELECTED_ROW_ACTION: 'UPDATE_ALL_SELECTED_ROW_ACTION',
  UPDATE_ORDER_ITEMS_ACTION: 'UPDATE_ORDER_ITEMS_ACTION',
  UPDATE_ORDER_FILTER: 'UPDATE_ORDER_FILTER',
  UPDATE_ORDER_FILTER_BY_ARTIST: 'UPDATE_ORDER_FILTER_BY_ARTIST',
};

export const updateOrderItemsAcion = (payload) => (dispatch) => {
  dispatch({
    type: ORDER_ACTIONS.UPDATE_ORDER_ITEMS_ACTION,
    payload,
  });
};

export const updateOrderFiltersAcion = (payload) => (dispatch) => {
  dispatch({
    type: ORDER_ACTIONS.UPDATE_ORDER_FILTER,
    payload,
  });
};

export const updateOrderFilterByArtistAcion = (payload) => (dispatch) => {
  dispatch({
    type: ORDER_ACTIONS.UPDATE_ORDER_FILTER_BY_ARTIST,
    payload,
  });
};

export const updateAllOrderSelectedAction = (payload) => (dispatch) => {
  dispatch({
    type: ORDER_ACTIONS.UPDATE_ALL_SELECTED_ROW_ACTION,
    payload,
  });
};

export const GET_ORDER_ACTION = actionCreator('GET_ORDER_ACTION');
export const getOrdersAction = (params, byArtist) => (dispatch, getState) => {
  const state = getState();
  const { filter, filterByArtist } = state.order;
  const finalFilter = byArtist ? filterByArtist : filter;

  const currSize = isMobile() ? finalFilter.sizeMobile : finalFilter.size;

  const searchParams = buildSearchParam({
    ...finalFilter,
    ...params,
    status: finalFilter.selectedStatus,
    size: currSize,
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
    console.log('getOrdersAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: GET_ORDER_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
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
  if (input.assignee && input.assignee !== 'null') {
    params.append('assignee', input.assignee || '');
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

export const UPDATE_ORDER_BUDGET_ACTION = actionCreator('UPDATE_ORDER_BUDGET_ACTION');
export const updateOrdersBudgetAction = (payload, id, cb) => (dispatch) => {
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
    console.log('updateOrdersAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: UPDATE_ORDER_BUDGET_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: updateOrderBudgetService(payload, id),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_ARTISTS_ASSIGN_ACTION = actionCreator('GET_ARTISTS_ASSIGN_ACTION');
export const getArtistsAssignAction = (params = { size: 100 }) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_ARTISTS_ASSIGN_ACTION.PENDING,
    });
  };
  const onSuccess = (data, headers) => {
    dispatch({ type: GET_ARTISTS_ASSIGN_ACTION.SUCCESS, payload: data });
  };
  const onError = (error) => {
    console.log('GET_ARTISTS_ASSIGN_ACTION => onError -> error', JSON.stringify(error));
    dispatch({
      type: GET_ARTISTS_ASSIGN_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getAssignArtistsService(params),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_ORDER_ARTIST_ACTION = actionCreator('UPDATE_ORDER_ARTIST_ACTION');
export const assignOrdersArtistAction = (payload, cb) => (dispatch) => {
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
    console.log('assignOrdersArtistAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: UPDATE_ORDER_ARTIST_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: assignOrderService(payload),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_ORDER_STATUS_ACTION = actionCreator('GET_ORDER_STATUS_ACTION');
export const getOrderStatusAction = (payload) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_ORDER_STATUS_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({ type: GET_ORDER_STATUS_ACTION.SUCCESS, payload: data });
  };
  const onError = (error) => {
    console.log('getOrderStatusAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: GET_ORDER_STATUS_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getAllStatusService(payload),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_ORDER_PAYMENT_STATUS_ACTION = actionCreator('UPDATE_ORDER_PAYMENT_STATUS_ACTION');
export const updateOrderPaymentStatusAction = (payload, id) => (dispatch) => {
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
    console.log('updateOrderPaymentStatusAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: UPDATE_ORDER_PAYMENT_STATUS_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: updateOrderArtistPaymentService(id, payload),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_ORDER_STATUS_DONE_BULK_ACTION = actionCreator('UPDATE_ORDER_STATUS_DONE_BULK_ACTION');
export const updateOrderStatusDoneBulkAction = (payload, cb) => (dispatch) => {
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
    console.log('updateOrderStatusDoneBulkAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: UPDATE_ORDER_STATUS_DONE_BULK_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getOrderBulkMarkAsDoneService(payload),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_ORDER_COUNT_BY_STATUS_ACTION = actionCreator('GET_ORDER_COUNT_BY_STATUS_ACTION');
export const getOrderCountByStatusAction = () => (dispatch) => {
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
    console.log('getOrderCountByStatusAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: GET_ORDER_COUNT_BY_STATUS_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getOrderCountByStatusService(),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_ORDER_PAYMENT_STATUS_BULK_ACTION = actionCreator('UPDATE_ORDER_PAYMENT_STATUS_BULK_ACTION');
export const updateOrderPaymentStatusBulkAction = (status, payload, cb) => (dispatch) => {
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
    console.log('updateOrderPaymentStatusBulkAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: UPDATE_ORDER_PAYMENT_STATUS_BULK_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: updateOrderArtistPaymentBulkService(status, payload),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_ORDER_PAYOUTS_BULK_ACTION = actionCreator('UPDATE_ORDER_PAYOUTS_BULK_ACTION');
export const createOrderPayoutsBulkAction = (payload, cb) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: UPDATE_ORDER_PAYOUTS_BULK_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    cb && cb();
    dispatch({
      type: UPDATE_ORDER_PAYOUTS_BULK_ACTION.SUCCESS,
      payload: data,
    });
  };
  const onError = (error) => {
    console.log('createOrderPayoutsBulkAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: UPDATE_ORDER_PAYOUTS_BULK_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: createPayoutService(payload),
    onPending,
    onSuccess,
    onError,
  });
};
