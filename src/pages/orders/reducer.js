import update from 'react-addons-update';
import { mapDataList, mapDataByIds } from 'utils';

import {
  ORDER_ACTIONS,
  GET_ORDER_ACTION,
  GET_ARTISTS_ACTION,
  GET_ORDER_STATUS_ACTION,
  UPDATE_ORDER_PAYMENT_STATUS_ACTION,
  UPDATE_ORDER_PAYMENT_STATUS_BULK_ACTION,
  GET_ORDER_COUNT_BY_STATUS_ACTION,
} from './actions';

const initialState = {
  ui: {
    list: {
      loading: false,
      selectedStatus: '',
    },
  },
  list: {
    orders: [],
    ids: [],
    items: {},
    totalItems: 0,
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
    case UPDATE_ORDER_PAYMENT_STATUS_BULK_ACTION.PENDING:
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
    case ORDER_ACTIONS.UPDATE_SELECTED_STATUS_ACTION:
      return update(state, {
        ui: {
          list: {
            selectedStatus: {
              $set: payload,
            },
          },
        },
      });
    case GET_ARTISTS_ACTION.SUCCESS:
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
              return mapDataList(items, 'selected', payload);
            },
          },
        },
      });
    default:
      return state;
  }
};

export default reducer;
