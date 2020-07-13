import update from 'react-addons-update';

import { mapDataList, mapDataByIds, isMobile } from 'utils';

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
    ids: [],
    items: {},
    itemGroups: [],
    totalItems: 0,
    totalPage: 0,
  },
  filter: {
    page: 0,
    size: 100,
    sizeMobile: 100,
    sort: [{ id: 'id', desc: true }],
    text: '',
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
    case GET_ARTISTS_LIST_ACTION.SUCCESS: {
      const { ids, items } = mapDataByIds(
        mapDataList(payload.data, 'selected', false),
        'id',
      );
      const totalItems = parseInt(payload.headers['x-total-count'], 10);
      const { size, sizeMobile } = state.filter;
      const currSize = isMobile() ? sizeMobile : size;
      const totalPage = Math.ceil(totalItems / currSize);

      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          artists: { $set: payload.data },
          ids: { $set: ids },
          items: { $set: items },
          totalItems: { $set: payload.headers['x-total-count'] },
          totalPage: { $set: totalPage },
        },
      });
    }

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
    case ARTISTS_ACTIONS.UPDATE_ARTIST_FILTERS_ACTION:
      return update(state, {
        filter: { $merge: payload },
      });
    default:
      return state;
  }
};

export default reducer;
