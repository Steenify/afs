import update from 'react-addons-update';
import { mapDataList, mapDataByIds, mapDataByDate, isMobile } from 'utils';

import {
  ORDER_TABLE_GET_LIST_ACTION,
  ORDER_TABLE_UPDATE_ITEM_ACTION,
  ORDER_TABLE_ALL_SELECTED_ACTION,
  ORDER_TABLE_UPDATE_FILTER_ACTION,
  ORDER_TABLE_GET_STATUS_ACTION,
  ORDER_TABLE_GET_COUNT_BY_STATUS_ACTION,
  GET_TAGS,
} from './actions';

const templateState = {
  filter: {
    page: 0,
    size: 100,
    sizeMobile: 100,
    sort: [{ id: 'number', desc: true }],
    tags: [],
    text: '',
    assignee: '',
    alert: '',
    hasPoster: false,
    cs: '',
  },
  table: {
    orders: [],
    ids: [],
    items: {},
    itemGroups: [],
    totalItems: 0,
    totalPage: 0,
    loading: false,
  },
  status: [],
  tags: [],
  orderStatusCount: {},
};

const initialState = {
  orders: { ...templateState },
};

const templateReducer = (state = templateState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_TABLE_GET_COUNT_BY_STATUS_ACTION.SUCCESS: {
      return update(state, {
        orderStatusCount: {
          $set: payload,
        },
      });
    }
    case ORDER_TABLE_GET_STATUS_ACTION.SUCCESS: {
      return update(state, {
        status: {
          $set: payload,
        },
      });
    }
    case ORDER_TABLE_GET_LIST_ACTION.PENDING: {
      return update(state, {
        table: {
          loading: { $set: true },
        },
      });
    }
    case ORDER_TABLE_GET_LIST_ACTION.SUCCESS: {
      const { ids, items } = mapDataByIds(mapDataList(payload.data, 'selected', false), 'id');

      const itemGroups = mapDataByDate(payload.data, 'paidAt');

      const totalItems = parseInt(payload.headers['x-total-count'], 10);
      const { size, sizeMobile } = state.filter;
      const currSize = isMobile() ? sizeMobile : size;
      const totalPage = Math.ceil(totalItems / currSize);

      return update(state, {
        table: {
          orders: { $set: mapDataList(payload.data, 'selected', false) },
          ids: { $set: ids },
          items: { $set: items },
          itemGroups: { $set: itemGroups },
          totalItems: { $set: payload.headers['x-total-count'] },
          totalPage: { $set: totalPage },
          loading: { $set: false },
        },
      });
    }
    case ORDER_TABLE_GET_LIST_ACTION.ERROR: {
      return update(state, {
        table: {
          loading: { $set: true },
        },
      });
    }
    case ORDER_TABLE_UPDATE_FILTER_ACTION: {
      return update(state, {
        filter: {
          $merge: payload,
        },
      });
    }
    case ORDER_TABLE_UPDATE_ITEM_ACTION: {
      return update(state, {
        table: {
          items: {
            [payload.id]: {
              [payload.field]: {
                $set: payload.value,
              },
            },
          },
        },
      });
    }

    case ORDER_TABLE_ALL_SELECTED_ACTION: {
      return update(state, {
        table: {
          items: {
            $apply: (items) => {
              const res = mapDataList(items, 'selected', payload);
              return res;
            },
          },
        },
      });
    }

    case GET_TAGS.SUCCESS:
      return update(state, {
        tags: { $set: payload },
      });
    default:
      return state;
  }
};

const reducer = (state = initialState, action) => {
  const { type, reducer = 'orders' } = action;
  if (type.includes('ORDER_TABLE_')) {
    return {
      ...state,
      [reducer]: templateReducer(state[reducer], action),
    };
  } else {
    return state;
  }
};
export default reducer;
