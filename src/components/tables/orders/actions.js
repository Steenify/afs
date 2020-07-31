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

export const ORDER_TABLE_GET_STATUS_ACTION = actionCreator('ORDER_TABLE_GET_STATUS_ACTION');
export const getOrderTableStatusAction = ({ payload, reducer }) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: ORDER_TABLE_GET_STATUS_ACTION.PENDING,
      reducer,
    });
  };
  const onSuccess = (data) => {
    dispatch({ type: ORDER_TABLE_GET_STATUS_ACTION.SUCCESS, payload: data, reducer });
  };
  const onError = (error) => {
    console.log('getOrderTableStatusAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: ORDER_TABLE_GET_STATUS_ACTION.ERROR,
      payload: error.response,
      reducer,
    });
  };

  actionTryCatchCreator({
    service: getAllStatusService(payload),
    onPending,
    onSuccess,
    onError,
  });
};

export const ORDER_TABLE_GET_LIST_ACTION = actionCreator('ORDER_TABLE_GET_LIST_ACTION');
export const getListAction = ({ payload, reducer = 'orders' }) => (dispatch, getState) => {
  const state = getState();
  const { filter } = state.orderTable[reducer] || {};

  const currSize = isMobile() ? filter?.sizeMobile : filter?.size;

  const searchParams = buildSearchParam({
    ...filter,
    ...payload,
    status: filter?.selectedStatus,
    size: currSize,
  });

  const onPending = () => {
    dispatch({
      type: ORDER_TABLE_GET_LIST_ACTION.PENDING,
      reducer,
    });
  };
  const onSuccess = (data, headers) => {
    dispatch({ type: ORDER_TABLE_GET_LIST_ACTION.SUCCESS, payload: { data, headers }, reducer });
  };
  const onError = (error) => {
    console.log('getListAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: ORDER_TABLE_GET_LIST_ACTION.ERROR,
      payload: error.response,
      reducer,
    });
  };

  actionTryCatchCreator({
    service: getAllOrdersService(searchParams),
    onPending,
    onSuccess,
    onError,
  });
};

export const ORDER_TABLE_UPDATE_FILTER_ACTION = 'ORDER_TABLE_UPDATE_FILTER_ACTION';
export const updateOrderTableFilterAction = ({ payload, reducer }) => (dispatch) => {
  dispatch({
    type: ORDER_TABLE_UPDATE_FILTER_ACTION,
    payload,
    reducer,
  });
  dispatch(getListAction({ reducer }));
};

export const ORDER_TABLE_UPDATE_ITEM_ACTION = 'ORDER_TABLE_UPDATE_ITEM_ACTION';
export const updateOrderTableItemsAction = ({ payload, reducer }) => (dispatch) => {
  dispatch({
    type: ORDER_TABLE_UPDATE_ITEM_ACTION,
    payload,
    reducer,
  });
};

export const ORDER_TABLE_ALL_SELECTED_ACTION = 'ORDER_TABLE_ALL_SELECTED_ACTION';
export const updateOrderTableSelectAllAction = ({ payload, reducer }) => (dispatch) => {
  dispatch({
    type: ORDER_TABLE_ALL_SELECTED_ACTION,
    payload,
    reducer,
  });
};

export const ORDER_TABLE_UPDATE_ARTIST_ACTION = actionCreator('ORDER_TABLE_UPDATE_ARTIST_ACTION');
export const updateOrderTableAssignArtistAction = ({ payload, reducer, onSuccess }) => (dispatch) => {
  actionTryCatchCreator({
    service: assignOrderService(payload),
    onPending: () => {
      dispatch({
        type: ORDER_TABLE_UPDATE_ARTIST_ACTION.PENDING,
        reducer,
      });
    },
    onSuccess: (data) => {
      dispatch({ type: ORDER_TABLE_UPDATE_ARTIST_ACTION.SUCCESS, payload: data, reducer });
      onSuccess && onSuccess();
    },
    onError: (error) => {
      console.log('updateOrderTableAssignArtistAction => onError -> error', JSON.stringify(error));
      dispatch({
        type: ORDER_TABLE_UPDATE_ARTIST_ACTION.ERROR,
        payload: error.response,
        reducer,
      });
    },
  });
};

export const ORDER_TABLE_UPDATE_BUDGET_ACTION = actionCreator('ORDER_TABLE_UPDATE_BUDGET_ACTION');
export const updateOrderTableBudgetAction = ({ payload, id, onSuccess, reducer }) => (dispatch) => {
  actionTryCatchCreator({
    service: updateOrderBudgetService(payload, id),
    onPending: () => dispatch({ type: ORDER_TABLE_UPDATE_BUDGET_ACTION.PENDING, reducer }),
    onSuccess: () => {
      dispatch({ type: ORDER_TABLE_UPDATE_BUDGET_ACTION.SUCCESS, payload, reducer });
      onSuccess && onSuccess();
    },
    onError: (error) => {
      console.log('updateOrderTableBudgetAction => onError -> error', JSON.stringify(error));
      dispatch({
        type: ORDER_TABLE_UPDATE_BUDGET_ACTION.ERROR,
        payload: error.response,
        reducer,
      });
    },
  });
};

export const ORDER_TABLE_GET_COUNT_BY_STATUS_ACTION = actionCreator('ORDER_TABLE_GET_COUNT_BY_STATUS_ACTION');
export const getOrderTableCountByStatusAction = ({ payload, reducer }) => (dispatch) => {
  actionTryCatchCreator({
    service: getOrderCountByStatusService(payload),
    onPending: () => dispatch({ type: ORDER_TABLE_GET_COUNT_BY_STATUS_ACTION.PENDING, reducer }),
    onSuccess: (data) => {
      dispatch({
        type: ORDER_TABLE_GET_COUNT_BY_STATUS_ACTION.SUCCESS,
        payload: data,
        reducer,
      });
    },
    onError: (error) => {
      console.log('getOrderTableCountByStatusAction => onError -> error', JSON.stringify(error));
      dispatch({
        type: ORDER_TABLE_GET_COUNT_BY_STATUS_ACTION.ERROR,
        payload: error.response,
        reducer,
      });
    },
  });
};

export const ORDER_TABLE_CREATE_PAYOUTS_BULK_ACTION = actionCreator('ORDER_TABLE_CREATE_PAYOUTS_BULK_ACTION');
export const createOrderTablePayoutsBulkAction = ({ payload, reducer, onSuccess }) => (dispatch) => {
  actionTryCatchCreator({
    service: createPayoutService(payload),
    onPending: () => dispatch({ type: ORDER_TABLE_CREATE_PAYOUTS_BULK_ACTION.PENDING, reducer }),
    onSuccess: (data) => {
      dispatch({
        type: ORDER_TABLE_CREATE_PAYOUTS_BULK_ACTION.SUCCESS,
        payload: data,
        reducer,
      });
      onSuccess && onSuccess();
    },
    onError: (error) => {
      console.log('createOrderTablePayoutsBulkAction => onError -> error', JSON.stringify(error));
      dispatch({
        type: ORDER_TABLE_CREATE_PAYOUTS_BULK_ACTION.ERROR,
        payload: error.response,
        reducer,
      });
    },
  });
};

export const ORDER_TABLE_UPDATE_STATUS_DONE_BULK_ACTION = actionCreator('ORDER_TABLE_UPDATE_STATUS_DONE_BULK_ACTION');
export const updateOrderTableStatusDoneBulkAction = ({ payload, reducer, onSuccess }) => (dispatch) => {
  actionTryCatchCreator({
    service: getOrderBulkMarkAsDoneService(payload),
    onPending: () => dispatch({ type: ORDER_TABLE_UPDATE_STATUS_DONE_BULK_ACTION.PENDING, reducer }),
    onSuccess: (data) => {
      if (data) {
        dispatch({
          type: ORDER_TABLE_UPDATE_STATUS_DONE_BULK_ACTION.SUCCESS,
          payload: data,
          reducer,
        });
        onSuccess && onSuccess();
      }
    },
    onError: (error) => {
      console.log('updateOrderTableStatusDoneBulkAction => onError -> error', JSON.stringify(error));
      dispatch({
        type: ORDER_TABLE_UPDATE_STATUS_DONE_BULK_ACTION.ERROR,
        payload: error.response,
        reducer,
      });
    },
  });
};
