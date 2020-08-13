import update from 'react-addons-update';
import {
  GET_USER_LIST_ACTION,
  UPDATE_USER_FILTER_ACTION,
  UPDATE_USER_ALL_SELECTED_ROW_ACTION,
  UPDATE_USER_ITEM_ACTION,
  //
  GET_USER_DETAIL,
  UPDATE_USER,
  CREATE_USER,
  GET_USERROLES,
} from './actions';
import { mapDataList, mapDataByIds, isMobile } from 'utils';

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
  detail: {},
  list: {
    users: [],
    ids: [],
    items: {},
    totalItems: 0,
    totalPage: 0,
  },
  userRoles: [],
  filter: {
    page: 0,
    size: 100,
    sizeMobile: 100,
    sort: [],
    name: '',
    role: null,
    from: null,
    to: null,
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload, message } = action;

  switch (type) {
    case UPDATE_USER_ITEM_ACTION: {
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
    case UPDATE_USER_ALL_SELECTED_ROW_ACTION: {
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
    case UPDATE_USER_FILTER_ACTION: {
      return update(state, {
        filter: {
          $merge: payload,
        },
      });
    }
    case GET_USER_LIST_ACTION.PENDING: {
      return update(state, {
        ui: {
          list: { loading: { $set: true } },
        },
      });
    }
    case GET_USER_LIST_ACTION.ERROR: {
      return update(state, {
        ui: {
          list: { loading: { $set: false } },
        },
      });
    }
    case GET_USER_LIST_ACTION.SUCCESS:
      const { ids, items } = mapDataByIds(mapDataList(payload.data, 'selected', false), 'id');
      const totalItems = parseInt(payload.headers['x-total-count'], 10);
      const { size, sizeMobile } = state.filter;
      const currSize = isMobile() ? sizeMobile : size;
      const totalPage = Math.ceil(totalItems / currSize);

      return update(state, {
        ui: {
          list: { loading: { $set: false } },
        },
        list: {
          users: { $set: payload.data },
          ids: { $set: ids },
          items: { $set: items },
          totalItems: { $set: payload.headers['x-total-count'] },
          totalPage: { $set: totalPage },
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
      return update(state, {
        ui: {
          edit: { loading: { $set: false } },
        },
        list: {
          items: {
            [payload.data.id]: { $set: payload.data },
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
        userRoles: { $set: payload.data },
      });
    case GET_USERROLES.ERROR:
      return update(state, {
        ui: {
          roles: { loading: { $set: false } },
        },
      });
    default:
      return state;
  }
};

export default reducer;
