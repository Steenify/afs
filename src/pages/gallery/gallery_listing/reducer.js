import update from 'react-addons-update';
import { isMobile } from 'utils';
import { GET_ARTWORK, GET_TAGS, ACTIONS } from './action';
const { UPDATE_FILTER_ACTION } = ACTIONS;

const desktopSize = 50;
const mobileSize = 10;

export const initialState = {
  ui: {
    loading: false,
  },
  filterData: {
    page: 0,
    size: 100,
    tag: null,
    text: '',
  },
  data: {
    tags: [],
    artworks: [],
    totalArtworks: 0,
    totalPage: 0,
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_FILTER_ACTION:
      return update(state, { filterData: { $merge: payload } });
    case GET_ARTWORK.PENDING:
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      });
    case GET_ARTWORK.ERROR:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
      });
    case GET_TAGS.SUCCESS:
      return update(state, {
        data: {
          tags: { $set: payload },
        },
      });
    case GET_ARTWORK.SUCCESS:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          artworks: { $set: payload.data },
        },
      });
    default:
      return state;
  }
};

export default reducer;
