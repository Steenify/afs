import update from 'immutability-helper';
import {
  UPDATE_NOTIFICATION_ACTION,
  // GET_NOTIFICATION_ACTIONS, GET_NOTIFICATION_ACTION, GET_RECIPIENTS
} from './action';

const initialState = {
  ui: {
    isLoading: false,
  },
  data: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_NOTIFICATION_ACTION.PENDING: {
      return update(state, {
        ui: { isLoading: { $set: true } },
      });
    }
    case UPDATE_NOTIFICATION_ACTION.SUCCESS:
    case UPDATE_NOTIFICATION_ACTION.ERROR: {
      return update(state, {
        ui: { isLoading: { $set: false } },
      });
    }
    default:
      return state;
  }
};
