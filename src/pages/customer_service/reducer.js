import update from 'react-addons-update';
import { ARTISTS_ACTIONS, GET_ARTISTS_LIST_ACTION } from './actions';

const initialState = {
  ui: { loading: false },
  data: {
    artists: [],
    totalItems: 0,
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ARTISTS_LIST_ACTION.PENDING:
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      });
    case GET_ARTISTS_LIST_ACTION.ERROR:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
      });
    case GET_ARTISTS_LIST_ACTION.SUCCESS:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          artists: { $set: payload.data },
          totalItems: { $set: payload.headers['x-total-count'] },
        },
      });
    default:
      return state;
  }
};

export default reducer;
