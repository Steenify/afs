import update from 'react-addons-update';
import { mapDataList, mapDataByIds, isMobile } from 'utils';

import {
  ORDER_ACTIONS,
  GET_ORDER_ACTION,
  GET_ARTISTS_ASSIGN_ACTION,
  GET_ORDER_STATUS_ACTION,
  UPDATE_ORDER_PAYMENT_STATUS_ACTION,
  UPDATE_ORDER_PAYMENT_STATUS_BULK_ACTION,
  GET_ORDER_COUNT_BY_STATUS_ACTION,
} from './actions';

const initialState = {
  ui: {
    list: {
      loading: false,
    },
  },
  filter: {
    page: 0,
    size: 100,
    sizeMobile: 50,
    sort: [{ id: 'number', desc: true }],
    text: '',
    assignee: '',
    selectedStatus: '',
  },
  list: {
    orders: [],
    ids: [],
    items: {},
    totalItems: 0,
    totalPage: 0,
  },
  artists: [],
  status: [],
  orderStatusCount: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ORDER_ACTION.PENDING:
    case UPDATE_ORDER_PAYMENT_STATUS_ACTION.PENDING:
      // case UPDATE_ORDER_PAYMENT_STATUS_BULK_ACTION.PENDING:
      return update(state, {
        ui: {
          list: {
            loading: { $set: true },
          },
        },
      });
    case GET_ORDER_ACTION.SUCCESS: {
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
          list: {
            loading: { $set: false },
          },
        },
        list: {
          orders: { $set: mapDataList(payload.data, 'selected', false) },
          ids: { $set: ids },
          items: { $set: items },
          totalItems: { $set: payload.headers['x-total-count'] },
          totalPage: { $set: totalPage },
        },
      });
    }

    case GET_ORDER_ACTION.ERROR:
    case UPDATE_ORDER_PAYMENT_STATUS_ACTION.ERROR:
    case UPDATE_ORDER_PAYMENT_STATUS_ACTION.SUCCESS:
    case UPDATE_ORDER_PAYMENT_STATUS_BULK_ACTION.ERROR:
    case UPDATE_ORDER_PAYMENT_STATUS_BULK_ACTION.SUCCESS:
      return update(state, {
        ui: {
          list: {
            loading: { $set: false },
          },
        },
      });

    case ORDER_ACTIONS.UPDATE_ORDER_ITEMS_ACTION:
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

    case ORDER_ACTIONS.UPDATE_ORDER_FILTER:
      return update(state, {
        filter: {
          $merge: payload,
        },
      });

    case GET_ARTISTS_ASSIGN_ACTION.SUCCESS:
      return update(state, {
        artists: {
          $set: payload,
        },
      });

    case GET_ORDER_STATUS_ACTION.SUCCESS:
      return update(state, {
        status: {
          $set: payload,
        },
      });
    case GET_ORDER_COUNT_BY_STATUS_ACTION.SUCCESS:
      return update(state, {
        orderStatusCount: {
          $set: payload,
        },
      });

    case ORDER_ACTIONS.UPDATE_ALL_SELECTED_ROW_ACTION:
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
    default:
      return state;
  }
};

export default reducer;
