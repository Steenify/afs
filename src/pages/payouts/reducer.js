import update from 'react-addons-update';
import { mapDataList, mapDataByIds, isMobile } from 'utils';

import {
  GET_PAYOUTS_LIST_ACTION,
  PAYOUTS_ACTIONS,
  GET_PAYOUTS_SUMMARY_ACTION,
  GET_PAYOUTS_DETAIL_ACTION,
} from './actions';

const initialState = {
  ui: { loading: false, loadingDetail: false },
  list: {
    payouts: [],
    ids: [],
    items: {},
    itemGroups: [],
    totalItems: 0,
    totalPage: 0,
  },
  summary: {
    bookingUnPaid: 0,
    totalBudget: 0,
    bookingPaid: 0,
    extraPaid: 0,
  },
  filter: {
    page: 0,
    size: 100,
    sizeMobile: 100,
    sort: [{ id: 'id', desc: true }],
    text: '',
    assignee: '',
  },
  detail: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PAYOUTS_ACTIONS.UPDATE_PAYOUTS_ITEMS_ACTION:
      return update(state, {
        list: {
          items: {
            [payload.id]: {
              [payload.field]: {
                $set: payload.value,
              },
            },
          },
        },
      });

    case PAYOUTS_ACTIONS.UPDATE_PAYOUT_ALL_SELECTED_ROW_ACTION:
      return update(state, {
        list: {
          items: {
            $apply: (items) => {
              const res = mapDataList(items, 'selected', payload);
              return res;
            },
          },
        },
      });
    case PAYOUTS_ACTIONS.UPDATE_PAYOUT_FILTERS_ACTION:
      return update(state, {
        filter: {
          $merge: payload,
        },
      });

    case GET_PAYOUTS_SUMMARY_ACTION.SUCCESS:
      return update(state, {
        summary: {
          $set: payload.data,
        },
      });

    case GET_PAYOUTS_LIST_ACTION.PENDING:
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      });
    case GET_PAYOUTS_LIST_ACTION.ERROR:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
      });
    case GET_PAYOUTS_LIST_ACTION.SUCCESS: {
      const { ids, items } = mapDataByIds(
        mapDataList(payload.data, 'selected', false),
        'id',
      );
      const totalItems = parseInt(payload.headers['x-total-count'], 10);
      const { size, sizeMobile } = state.filter;
      const currSize = isMobile() ? sizeMobile : size;
      const totalPage = Math.ceil(totalItems / currSize);

      return update(state, {
        ui: {
          loading: { $set: false },
        },
        list: {
          payouts: { $set: mapDataList(payload.data, 'selected', false) },
          ids: { $set: ids },
          items: { $set: items },
          totalItems: { $set: payload.headers['x-total-count'] },
          totalPage: { $set: totalPage },
        },
      });
    }

    case GET_PAYOUTS_DETAIL_ACTION.PENDING:
      return update(state, {
        ui: {
          loadingDetail: { $set: true },
        },
      });
    case GET_PAYOUTS_DETAIL_ACTION.ERROR:
      return update(state, {
        ui: {
          loadingDetail: { $set: false },
        },
      });
    case GET_PAYOUTS_DETAIL_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        detail: {
          $set: payload.data,
        },
      });
    }
    default:
      return state;
  }
};

export default reducer;
