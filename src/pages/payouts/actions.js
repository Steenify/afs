import { actionCreator, actionTryCatchCreator, isMobile } from 'utils';

import { getPayoutsService } from 'services/payout';

export const PAYOUTS_ACTIONS = {
  UPDATE_PAYOUTS_ITEMS_ACTION: 'UPDATE_PAYOUTS_ITEMS_ACTION',
  UPDATE_PAYOUT_ALL_SELECTED_ROW_ACTION:
    'UPDATE_PAYOUT_ALL_SELECTED_ROW_ACTION',
  UPDATE_PAYOUT_FILTERS_ACTION: 'UPDATE_PAYOUT_FILTERS_ACTION',
};

export const GET_PAYOUTS_LIST_ACTION = actionCreator('GET_PAYOUTS_LIST_ACTION');
export const getPayoutListAction = (params = {}) => async (
  dispatch,
  getState,
) => {
  const state = getState();
  const { filter } = state.payouts;

  const currSize = isMobile() ? filter.sizeMobile : filter.size;

  const searchParams = buildSearchParamPayouts({
    ...filter,
    ...params,
    size: currSize,
  });

  const onPending = () => {
    dispatch({
      type: GET_PAYOUTS_LIST_ACTION.PENDING,
    });
  };
  const onSuccess = (data, headers) => {
    dispatch({
      type: GET_PAYOUTS_LIST_ACTION.SUCCESS,
      payload: { data, headers },
    });
  };
  const onError = (error) => {
    console.log(
      'getPayoutListAction => onError -> error',
      JSON.stringify(error),
    );
    dispatch({
      type: GET_PAYOUTS_LIST_ACTION.ERROR,
    });
  };

  actionTryCatchCreator({
    service: getPayoutsService(searchParams),
    onPending,
    onSuccess,
    onError,
  });
};

const buildSearchParamPayouts = (input = {}) => {
  var params = new URLSearchParams();

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

export const updatePayoutsItemsAction = (payload) => (dispatch) => {
  dispatch({
    type: PAYOUTS_ACTIONS.UPDATE_PAYOUTS_ITEMS_ACTION,
    payload,
  });
};

export const updateAllPayoutsSelectedAction = (payload) => (dispatch) => {
  dispatch({
    type: PAYOUTS_ACTIONS.UPDATE_PAYOUT_ALL_SELECTED_ROW_ACTION,
    payload,
  });
};
export const updatePayoutFilterAction = (payload) => (dispatch) => {
  dispatch({
    type: PAYOUTS_ACTIONS.UPDATE_PAYOUT_FILTERS_ACTION,
    payload,
  });
};
