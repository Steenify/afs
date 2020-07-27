import update from 'react-addons-update';
import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_COUNT, READ_ALL_NOTIFICATIONS, UPDATE_NOTIFICATIONS_FILTER_ACTION } from './actions';
import { isMobile } from 'utils';

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
    totalPage: 0,
  },
  filter: {
    page: 0,
    size: 100,
    sizeMobile: 100,
    sort: [],
    text: '',
    from: null,
    to: null,
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
      const totalItems = parseInt(payload.headers['x-total-count'], 10);
      const { size, sizeMobile } = state.filter;
      const currSize = isMobile() ? sizeMobile : size;
      const totalPage = Math.ceil(totalItems / currSize);
      return update(state, {
        data: {
          notifications: { $set: payload.data },
          totalItems: { $set: totalItems },
          totalPage: { $set: totalPage },
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
    case UPDATE_NOTIFICATIONS_FILTER_ACTION: {
      return update(state, {
        filter: {
          $merge: payload,
        },
      });
    }
    default:
      return state;
  }
};

export default reducer;
