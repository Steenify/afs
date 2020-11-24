import update from 'react-addons-update';

import { GET_CUSTOMER_DETAIL_ACTION, GET_CUSTOMER_ORDERS_ACTION, RESET_CUSTOMER_DETAIL_ACTION, UPDATE_CUSTOMER_DETAIL_ACTION } from './actions';
import { UPDATE_CUSTOMER_ITEM_TAG_ACTION, UPDATE_CUSTOMER_ITEM_ANNIVERSARIES_ACTION } from 'pages/customers/actions';
const initialState = {
  ui: {
    loading: false,
    loadingUser: false,
    loadingWorkLog: false,
    isShowEmail: false,
    loadingEmail: false,
  },
  data: {
    orders: [],
    customer: {},
  },
  filter: {
    page: 0,
    size: 100,
    sizeMobile: 100,
    text: '',
    assignee: '',
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_CUSTOMER_DETAIL_ACTION.PENDING:
    case GET_CUSTOMER_ORDERS_ACTION.PENDING:
    case GET_CUSTOMER_DETAIL_ACTION.PENDING: {
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      });
    }
    case GET_CUSTOMER_DETAIL_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          customer: { $set: payload },
        },
      });
    }
    case GET_CUSTOMER_ORDERS_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          orders: { $set: payload.data },
        },
      });
    }
    case UPDATE_CUSTOMER_DETAIL_ACTION.ERROR:
    case GET_CUSTOMER_ORDERS_ACTION.ERROR:
    case GET_CUSTOMER_DETAIL_ACTION.ERROR: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
      });
    }
    case RESET_CUSTOMER_DETAIL_ACTION: {
      return { ...initialState };
    }
    case UPDATE_CUSTOMER_DETAIL_ACTION.SUCCESS: {
      return update(state, {
        ui: { loading: { $set: false } },
        data: { customer: { $merge: payload } },
      });
    }
    case UPDATE_CUSTOMER_ITEM_TAG_ACTION: {
      if (!payload?.isDetail) {
        return state;
      }
      return update(state, {
        data: {
          customer: {
            customerExtension: {
              tags: {
                $set: payload.tags,
              },
            },
          },
        },
      });
    }
    case UPDATE_CUSTOMER_ITEM_ANNIVERSARIES_ACTION: {
      if (!payload?.isDetail) {
        return state;
      }
      return update(state, {
        data: {
          customer: {
            customerExtension: {
              anniversaries: {
                $set: payload.anniversaries,
              },
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
