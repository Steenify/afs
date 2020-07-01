import update from 'react-addons-update';
import {
  ARTISTS_ACTIONS,
  GET_ARTISTS_LIST_ACTION,
  GET_ARTISTS_ACTION,
  UPDATE_ARTISTS_API_ACTION,
} from './actions';

const initialState = {
  ui: { loading: false, loadingDetail: false },
  data: {
    artists: [],
    totalItems: 0,
  },
  error: {
    detail: {},
  },
  artist: {},
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

    // Detail Reducer
    case GET_ARTISTS_ACTION.PENDING:
    case UPDATE_ARTISTS_API_ACTION.PENDING:
      return update(state, {
        ui: {
          loadingDetail: { $set: true },
        },
      });
    case GET_ARTISTS_ACTION.ERROR:
    case UPDATE_ARTISTS_API_ACTION.ERROR:
      return update(state, {
        ui: {
          loadingDetail: { $set: false },
        },
      });
    case GET_ARTISTS_ACTION.SUCCESS:
    case UPDATE_ARTISTS_API_ACTION.SUCCESS:
      return update(state, {
        ui: {
          loadingDetail: { $set: false },
        },
        artist: { $set: payload.data },
      });
    case ARTISTS_ACTIONS.UPDATE_ARTIST_DETAIL:
      return update(state, {
        artist: { $merge: payload },
      });
    default:
      return state;
  }
};

export default reducer;
