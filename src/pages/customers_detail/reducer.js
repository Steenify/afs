import update from 'react-addons-update';

// import { mapDataList, mapDataByIds, mapDataByDate, isMobile } from 'utils';

import { GET_CUSTOMER_DETAIL_ACTION, GET_CUSTOMER_ORDERS_ACTION } from './actions';

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
    case GET_CUSTOMER_ORDERS_ACTION.ERROR:
    case GET_CUSTOMER_DETAIL_ACTION.ERROR: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
      });
    }
    default:
      return state;
  }
};

export default reducer;
