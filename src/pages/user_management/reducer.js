import update from 'react-addons-update';
import {
  GET_USERS,
  GET_USER_DETAIL,
  UPDATE_USER,
  CREATE_USER,
  GET_USERROLES,
  UPDATE_SORT_USER,
} from './actions';

const initialState = {
  ui: {
    list: {},
    create: {},
    edit: {},
    detail: {},
    roles: {},
  },
  error: {
    create: {},
  },
  data: {
    users: [],
    userRoles: [],
    totalItems: 0,
    sortColumns: [],
  },
  detail: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload, message } = action;

  switch (type) {
    case GET_USERS.PENDING:
      return update(state, {
        ui: {
          list: { loading: { $set: true } },
        },
      });
    case GET_USERS.SUCCESS:
      return update(state, {
        ui: {
          list: { loading: { $set: false } },
        },
        data: {
          users: { $set: payload.data },
          totalItems: { $set: payload.headers['x-total-count'] },
        },
      });
    case GET_USERS.ERROR:
      return update(state, {
        ui: {
          list: { loading: { $set: false } },
        },
        error: {
          message: { $set: 'Something went wrong.' },
        },
      });

    case GET_USER_DETAIL.PENDING:
      return update(state, {
        ui: {
          detail: { loading: { $set: true } },
        },
      });
    case GET_USER_DETAIL.SUCCESS:
      return update(state, {
        ui: {
          detail: { loading: { $set: false } },
        },
        detail: { $set: payload.data },
      });
    case GET_USER_DETAIL.ERROR:
      return update(state, {
        ui: {
          detail: { loading: { $set: false } },
        },
        error: {},
      });

    case UPDATE_USER.PENDING:
      return update(state, {
        ui: {
          edit: { loading: { $set: true } },
        },
      });
    case UPDATE_USER.SUCCESS:
      const newUsers = [...state.data.users];
      const index = newUsers.findIndex(
        (item) => item.login === payload.data.login,
      );
      return update(state, {
        ui: {
          edit: { loading: { $set: false } },
        },
        data: {
          users: {
            $splice: [[index, 1, payload.data]],
          },
        },
      });
    case UPDATE_USER.ERROR:
      return update(state, {
        ui: {
          edit: { loading: { $set: false } },
        },
        error: {
          message: { $set: message },
        },
      });

    case CREATE_USER.PENDING:
      return update(state, {
        ui: {
          create: { loading: { $set: true } },
        },
      });
    case CREATE_USER.SUCCESS:
      return update(state, {
        ui: {
          create: { loading: { $set: false } },
        },
      });
    case CREATE_USER.ERROR:
      return update(state, {
        ui: {
          create: { loading: { $set: false } },
        },
        error: {
          create: {
            message: { $set: payload.statusText || '' },
          },
        },
      });

    case GET_USERROLES.PENDING:
      return update(state, {
        ui: {
          roles: { loading: { $set: true } },
        },
      });
    case GET_USERROLES.SUCCESS:
      return update(state, {
        ui: {
          roles: { loading: { $set: false } },
        },
        data: {
          userRoles: { $set: payload.data },
        },
      });
    case GET_USERROLES.ERROR:
      return update(state, {
        ui: {
          roles: { loading: { $set: false } },
        },
      });

    case UPDATE_SORT_USER.SUCCESS:
      return update(state, {
        data: {
          sortColumns: { $set: payload },
        },
      });
    default:
      return state;
  }
};

export default reducer;
