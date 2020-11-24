import update from 'react-addons-update';
import { mapDataList, mapDataByIds, isMobile } from 'utils';
import {
  GET_CUSTOMER_LIST_ACTION,
  UPDATE_CUSTOMER_ACTION,
  UPDATE_CUSTOMER_FILTER_ACTION,
  UPDATE_CUSTOMER_ITEM_ACTION,
  UPDATE_CUSTOMERS_ALL_SELECTED_ROW_ACTION,
  UPDATE_CUSTOMER_EDIT_TAG_ACTION,
  UPDATE_CUSTOMER_ITEM_TAG_ACTION,
  UPDATE_CUSTOMER_EDIT_ANNIVERSARIES_ACTION,
  UPDATE_CUSTOMER_ITEM_ANNIVERSARIES_ACTION,
  GET_ANNIVERSARY_TYPES_ACTION,
} from './actions';

const initialState = {
  ui: { loading: false, loadingDetail: false, showEditTag: false, userEditTag: '', showEditAnniversaries: false, userEditAnniversaries: '' },
  list: {
    anniversaryTypes: [],
    customers: [],
    ids: [],
    items: {},
    totalItems: 0,
    totalPage: 0,
  },
  filter: {
    page: 0,
    size: 100,
    sizeMobile: 100,
    sort: [],
    name: '',
    customerGroup: '',
    assignee: '',
    from: null,
    to: null,
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_CUSTOMER_ACTION.PENDING:
    case GET_CUSTOMER_LIST_ACTION.PENDING: {
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      });
    }
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
          customers: { $set: payload.data },
          ids: { $set: ids },
          items: { $set: items },
          totalItems: { $set: payload.headers['x-total-count'] },
          totalPage: { $set: totalPage },
        },
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
    case UPDATE_CUSTOMER_EDIT_ANNIVERSARIES_ACTION: {
      return update(state, {
        ui: {
          showEditAnniversaries: {
            $set: payload?.showEditAnniversaries,
          },
          userEditAnniversaries: {
            $set: payload?.userEditAnniversaries,
          },
        },
      });
    }

    case UPDATE_CUSTOMER_EDIT_TAG_ACTION: {
      return update(state, {
        ui: {
          showEditTag: {
            $set: payload?.showEditTag,
          },
          userEditTag: {
            $set: payload?.userEditTag,
          },
        },
      });
    }
    case UPDATE_CUSTOMER_ITEM_TAG_ACTION: {
      if (payload?.isDetail) {
        return state;
      }
      return update(state, {
        list: {
          items: {
            [payload.id]: {
              tags: {
                $set: payload.tags,
              },
            },
          },
        },
      });
    }

    case UPDATE_CUSTOMER_ITEM_ANNIVERSARIES_ACTION: {
      if (payload?.isDetail) {
        return state;
      }
      return update(state, {
        list: {
          items: {
            [payload.id]: {
              anniversaries: {
                $set: payload.anniversaries,
              },
            },
          },
        },
      });
    }
    case GET_ANNIVERSARY_TYPES_ACTION.ERROR: {
      return update(state, {
        list: {
          anniversaryTypes: { $set: [] },
        },
      });
    }
    case GET_ANNIVERSARY_TYPES_ACTION.SUCCESS: {
      return update(state, {
        list: {
          anniversaryTypes: { $set: payload || [] },
        },
      });
    }
    default:
      return state;
  }
};

export default reducer;
