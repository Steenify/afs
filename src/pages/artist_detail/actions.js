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

export const UPDATE_ARTIST_DETAIL_FILTER_ORDER = 'UPDATE_ARTIST_DETAIL_FILTER_ORDER';
export const updateArtistDetailFilterOrderAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_ARTIST_DETAIL_FILTER_ORDER,
    payload,
  });
};

export const GET_ARTIST_DETAIL_ORDERS_ACTION = actionCreator('GET_ARTIST_DETAIL_ORDERS_ACTION');
export const getArtistDetailOrdersAction = (params) => (dispatch, getState) => {
  const state = getState();
  const { filter } = state.artistDetail;

  const currSize = isMobile() ? filter.sizeMobile : filter.size;

  const searchParams = buildSearchParam({
    ...filter,
    ...params,
    status: filter.selectedStatus,
    size: currSize,
  });

  const onPending = () => {
    dispatch({
      type: GET_ARTIST_DETAIL_ORDERS_ACTION.PENDING,
    });
  };
  const onSuccess = (data, headers) => {
    dispatch({ type: GET_ARTIST_DETAIL_ORDERS_ACTION.SUCCESS, payload: { data, headers } });
  };
  const onError = (error) => {
    console.log('getArtistDetailOrdersAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: GET_ARTIST_DETAIL_ORDERS_ACTION.ERROR,
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

export const UPDATE_ARTIST_DETAIL_UPDATE_ORDER_ITEM_ACTION = 'UPDATE_ARTIST_DETAIL_UPDATE_ORDER_ITEM_ACTION';
export const updateOrderItemsAcion = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_ARTIST_DETAIL_UPDATE_ORDER_ITEM_ACTION,
    payload,
  });
};

export const UPDATE_ARTIST_DETAIL_ORDER_BUDGET_ACTION = actionCreator('UPDATE_ARTIST_DETAIL_ORDER_BUDGET_ACTION');
export const updateOrdersBudgetAction = (payload, id, cb) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: UPDATE_ARTIST_DETAIL_ORDER_BUDGET_ACTION.PENDING,
    });
  };
  const onSuccess = (data, headers) => {
    dispatch({ type: UPDATE_ARTIST_DETAIL_ORDER_BUDGET_ACTION.SUCCESS, payload: payload });
    cb && cb();
  };
  const onError = (error) => {
    console.log('updateOrdersBudgetAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: UPDATE_ARTIST_DETAIL_ORDER_BUDGET_ACTION.ERROR,
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

export const UPDATE_ARTIST_DETAIL_SELECT_ALL_ORDER_ACTION = 'UPDATE_ARTIST_DETAIL_SELECT_ALL_ORDER_ACTION';
export const updateAllOrderSelectedAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_ARTIST_DETAIL_SELECT_ALL_ORDER_ACTION,
    payload,
  });
};

export const UPDATE_ARTIST_DETAIL_ORDER_ARTIST_ACTION = actionCreator('UPDATE_ARTIST_DETAIL_ORDER_ARTIST_ACTION');
export const assignOrdersArtistAction = (payload, cb) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: UPDATE_ARTIST_DETAIL_ORDER_ARTIST_ACTION.PENDING,
    });
  };
  const onSuccess = (data, headers) => {
    dispatch({ type: UPDATE_ARTIST_DETAIL_ORDER_ARTIST_ACTION.SUCCESS, payload: data });
    cb && cb();
  };
  const onError = (error) => {
    console.log('assignOrdersArtistAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: UPDATE_ARTIST_DETAIL_ORDER_ARTIST_ACTION.ERROR,
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
