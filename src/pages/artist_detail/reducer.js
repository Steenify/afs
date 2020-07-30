import update from 'react-addons-update';
import { mapDataList, mapDataByIds, mapDataByDate, isMobile } from 'utils';

import { UPDATE_ARTIST_DETAIL_FILTER_ORDER, GET_ARTIST_DETAIL_ORDERS_ACTION, UPDATE_ARTIST_DETAIL_UPDATE_ORDER_ITEM_ACTION, UPDATE_ARTIST_DETAIL_SELECT_ALL_ORDER_ACTION } from './actions';
import { GET_ORDER_STATUS_ACTION } from 'pages/orders/actions';

const initialState = {
  ui: {
    loading: false,
  },
  filter: {
    page: 0,
    size: 100,
    sizeMobile: 100,
    sort: [{ id: 'number', desc: true }],
    text: '',
    assignee: '',
  },
  table: {
    list: [],
    ids: [],
    items: {},
    itemGroups: [],
    totalItems: 0,
    totalPage: 0,
    loading: false,
  },
  status: [],
  orderStatusCount: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ORDER_STATUS_ACTION.SUCCESS:
      return update(state, {
        status: {
          $set: payload,
        },
      });
    case UPDATE_ARTIST_DETAIL_FILTER_ORDER: {
      return update(state, {
        filter: {
          $merge: payload,
        },
      });
    }
    case GET_ARTIST_DETAIL_ORDERS_ACTION.PENDING: {
      return update(state, {
        table: {
          loading: { $set: true },
        },
      });
    }
    case GET_ARTIST_DETAIL_ORDERS_ACTION.SUCCESS: {
      const { ids, items } = mapDataByIds(mapDataList(payload.data, 'selected', false), 'id');

      const itemGroups = mapDataByDate(payload.data, 'paidAt');

      const totalItems = parseInt(payload.headers['x-total-count'], 10);
      const { size, sizeMobile } = state.filter;
      const currSize = isMobile() ? sizeMobile : size;
      const totalPage = Math.ceil(totalItems / currSize);

      return update(state, {
        table: {
          list: { $set: mapDataList(payload.data, 'selected', false) },
          ids: { $set: ids },
          items: { $set: items },
          itemGroups: { $set: itemGroups },
          totalItems: { $set: payload.headers['x-total-count'] },
          totalPage: { $set: totalPage },
          loading: { $set: false },
        },
      });
    }
    case GET_ARTIST_DETAIL_ORDERS_ACTION.ERROR: {
      return update(state, {
        table: {
          loading: { $set: false },
        },
      });
    }

    case UPDATE_ARTIST_DETAIL_UPDATE_ORDER_ITEM_ACTION:
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

    case UPDATE_ARTIST_DETAIL_SELECT_ALL_ORDER_ACTION:
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
    default:
      return state;
  }
};
export default reducer;
