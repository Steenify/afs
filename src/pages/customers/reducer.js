import update from 'react-addons-update';
import { mapDataList, mapDataByIds, isMobile } from 'utils';
import {
  GET_CUSTOMER_LIST_ACTION,
  GET_CUSTOMER_DETAIL_ACTION,
  CREATE_CUSTOMER_ACTION,
  UPDATE_CUSTOMER_ACTION,
  UPDATE_CUSTOMER_FILTER_ACTION,
  UPDATE_CUSTOMER_ITEM_ACTION,
  UPDATE_CUSTOMERS_ALL_SELECTED_ROW_ACTION,
} from './actions';

const initialState = {
  ui: { loading: false, loadingDetail: false },
  list: {
    customers: [],
    ids: [],
    items: {},
    itemGroups: [],
    totalItems: 0,
    totalPage: 0,
  },
  filter: {
    page: 0,
    size: 10,
    sizeMobile: 10,
    sort: [],
    name: '',
    customerGroups: '',
    assignee: '',
    from: null,
    to: null,
  },
  detail: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CUSTOMER_DETAIL_ACTION.PENDING:
    case UPDATE_CUSTOMER_ACTION.PENDING:
    case GET_CUSTOMER_LIST_ACTION.PENDING: {
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      });
    }

    case GET_CUSTOMER_DETAIL_ACTION.ERROR:
    case UPDATE_CUSTOMER_ACTION.ERROR:
    case GET_CUSTOMER_LIST_ACTION.ERROR: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
      });
    }

    case GET_CUSTOMER_LIST_ACTION.SUCCESS:
      const { ids, items } = mapDataByIds(mapDataList(payload.data, 'selected', false), 'id');
      const totalItems = parseInt(payload.headers['x-total-count'], 10);
      const { size, sizeMobile } = state.filter;
      const currSize = isMobile() ? sizeMobile : size;
      const totalPage = Math.ceil(totalItems / currSize);

      return update(state, {
        ui: {
          loading: { $set: false },
        },
        list: {
          customers: { $set: mapDataList(payload.data, 'selected', false) },
          ids: { $set: ids },
          items: { $set: items },
          totalItems: { $set: payload.headers['x-total-count'] },
          totalPage: { $set: totalPage },
        },
      });

    case GET_CUSTOMER_DETAIL_ACTION.SUCCESS:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        detail: { $set: payload },
      });

    case UPDATE_CUSTOMER_ACTION.SUCCESS:
      const newCustomers = [...state.list.customers];
      const index = newCustomers.findIndex((item) => item?.login === payload.login);
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        list: {
          customers: {
            $splice: [[index, 1, payload]],
          },
        },
      });

    case UPDATE_CUSTOMER_FILTER_ACTION: {
      return update(state, {
        filter: {
          $merge: payload,
        },
      });
    }
    case UPDATE_CUSTOMER_ITEM_ACTION: {
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
    }
    case UPDATE_CUSTOMERS_ALL_SELECTED_ROW_ACTION: {
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
    }
    default:
      return state;
  }
};

export default reducer;
