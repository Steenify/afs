import update from 'react-addons-update';
import { GET_SYSTEM_PROPERTIES, GET_SYSTEM_PROPPERTY } from './actions';

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
    systemProperties: [],
  },
  detail: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SYSTEM_PROPERTIES.PENDING:
      return update(state, {
        ui: {
          list: {
            loading: { $set: true },
          },
        },
      });
    case GET_SYSTEM_PROPERTIES.SUCCESS:
      return update(state, {
        data: {
          systemProperties: { $set: payload.data },
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
    case GET_SYSTEM_PROPERTIES.ERROR:
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

    case GET_SYSTEM_PROPPERTY.PENDING:
      return update(state, {
        ui: {
          detail: { loading: { $set: true } },
        },
      });
    case GET_SYSTEM_PROPPERTY.SUCCESS:
      return update(state, {
        ui: {
          detail: { loading: { $set: false } },
        },
        detail: { $set: payload.data },
      });
    case GET_SYSTEM_PROPPERTY.ERROR:
      return update(state, {
        ui: {
          detail: { loading: { $set: false } },
        },
        error: {},
      });

    default:
      return state;
  }
};

export default reducer;
