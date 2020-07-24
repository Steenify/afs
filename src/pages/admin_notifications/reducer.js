import update from 'react-addons-update';
import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_COUNT, READ_ALL_NOTIFICATIONS } from './actions';

const initialState = {
  ui: {
    list: {},
    edit: {},
    detail: {},
    create: {},
    count: 0,
  },
  error: {
    list: {},
    create: {},
    detail: {},
  },
  data: {
    notifications: [],
    totalItems: 0,
  },
  detail: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTIFICATIONS.PENDING:
      return update(state, {
        ui: {
          list: {
            loading: { $set: true },
          },
        },
      });
    case GET_NOTIFICATIONS.SUCCESS:
      return update(state, {
        data: {
          notifications: { $set: payload },
        },
        ui: {
          list: {
            loading: { $set: false },
          },
        },
        error: {
          list: {
            message: { $set: '' },
          },
        },
      });
    case GET_NOTIFICATIONS.ERROR:
      return update(state, {
        ui: {
          list: {
            loading: { $set: false },
          },
        },
        error: {
          list: {
            message: { $set: (payload && payload.statusText) || '' },
          },
        },
      });
    case GET_NOTIFICATIONS_COUNT.SUCCESS:
      return update(state, {
        ui: {
          count: {
            $set: payload?.count || 0,
          },
        },
      });

    case READ_ALL_NOTIFICATIONS.SUCCESS:
      return update(state, {
        ui: {
          count: {
            $set: 0,
          },
        },
      });
    default:
      return state;
  }
};

export default reducer;
