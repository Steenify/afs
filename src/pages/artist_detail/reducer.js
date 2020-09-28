import update from 'react-addons-update';

import { GET_ARTIST_DETAIL_ACTION, UPDATE_ARTIST_DETAIL_ACTION } from './actions';

const initialState = {
  ui: {
    loading: false,
  },
  data: {
    artist: {},
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_ARTIST_DETAIL_ACTION.PENDING:
    case GET_ARTIST_DETAIL_ACTION.PENDING: {
      return update(state, {
        ui: { loading: { $set: true } },
      });
    }
    case UPDATE_ARTIST_DETAIL_ACTION.ERROR:
    case GET_ARTIST_DETAIL_ACTION.ERROR: {
      return update(state, {
        ui: { loading: { $set: false } },
      });
    }
    case GET_ARTIST_DETAIL_ACTION.SUCCESS: {
      return update(state, {
        ui: { loading: { $set: false } },
        data: { artist: { $set: payload } },
      });
    }
    case UPDATE_ARTIST_DETAIL_ACTION.SUCCESS: {
      return update(state, {
        ui: { loading: { $set: false } },
        data: { artist: { $merge: payload } },
      });
    }

    default:
      return state;
  }
};

export default reducer;
