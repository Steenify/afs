import update from 'react-addons-update';
import { getTotalPage, isMobile } from 'utils';
import { GET_ARTWORK, GET_TAGS, ACTIONS } from './action';
const { UPDATE_FILTER_ACTION } = ACTIONS;

const desktopSize = 100;
const mobileSize = 50;

export const initialState = {
  ui: {
    loading: false,
  },
  filterData: {
    page: 0,
    size: isMobile ? mobileSize : desktopSize,
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
      const { data, headers } = payload;
      const totalPage = getTotalPage(headers, desktopSize, mobileSize);
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          artworks: { $set: data },
          totalPage: { $set: totalPage },
        },
      });
    default:
      return state;
  }
};

export default reducer;
