import update from 'react-addons-update';

import { GET_CUSTOMER_DETAIL_ACTION } from './actions';

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
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
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
