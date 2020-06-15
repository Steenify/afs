import update from 'react-addons-update';
import {
  GET_AUTHORITIES,
  GET_AUTHORITY,
  UPDATE_AUTHORITY,
  GET_PERMISSIONS,
  CREATE_AUTHORITY,
  DELETE_AUTHORITY,
  GET_PERMISSION,
  // UPADTE_PERMISSION,
} from './actions';

const initialState = {
  ui: {
    list: {},
    edit: {},
    detail: {},
    create: {},
  },
  error: {
    list: {},
    create: {},
  },
  data: {
    authorities: [],
    permissions: [],
  },
  detail: {},
  permissionDetail: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_AUTHORITIES.PENDING:
      return update(state, {
        ui: {
          list: {
            loading: { $set: true },
          },
        },
      });
    case GET_AUTHORITIES.SUCCESS:
      return update(state, {
        data: {
          authorities: { $set: payload.data },
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
    case GET_AUTHORITIES.ERROR:
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

    case GET_AUTHORITY.PENDING:
      return update(state, {
        ui: {
          detail: { loading: { $set: true } },
        },
      });
    case GET_AUTHORITY.SUCCESS:
      return update(state, {
        ui: {
          detail: { loading: { $set: false } },
        },
        detail: { $set: payload.data },
      });
    case GET_AUTHORITY.ERROR:
      return update(state, {
        ui: {
          detail: { loading: { $set: false } },
        },
        error: {},
      });

    case GET_PERMISSIONS.PENDING:
      return update(state, {});
    case GET_PERMISSIONS.SUCCESS:
      return update(state, {
        data: {
          permissions: { $set: payload.data },
        },
      });
    case GET_PERMISSIONS.ERROR:
      return update(state, {
        ui: {},
        error: {},
      });

    case UPDATE_AUTHORITY.PENDING:
      return update(state, {});
    case UPDATE_AUTHORITY.SUCCESS:
      return update(state, {
        data: {},
      });
    case UPDATE_AUTHORITY.ERROR:
      return update(state, {
        ui: {},
        error: {},
      });

    case CREATE_AUTHORITY.PENDING:
      return update(state, {});
    case CREATE_AUTHORITY.SUCCESS:
      return update(state, {});
    case CREATE_AUTHORITY.ERROR:
      return update(state, {
        ui: {},
        error: {},
      });

    case DELETE_AUTHORITY.PENDING:
      return update(state, {});
    case DELETE_AUTHORITY.SUCCESS:
      return update(state, {});
    case DELETE_AUTHORITY.ERROR:
      return update(state, {
        ui: {},
        error: {},
      });

    case GET_PERMISSION.PENDING:
      return update(state, {});
    case GET_PERMISSION.SUCCESS:
      return update(state, {
        permissionDetail: { $set: payload.data },
      });
    case GET_PERMISSION.ERROR:
      return update(state, {});

    default:
      return state;
  }
};

export default reducer;
