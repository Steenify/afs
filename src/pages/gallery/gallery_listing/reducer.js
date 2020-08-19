import update from 'react-addons-update';
import { getTotalPage } from 'utils';
import { initialState, desktopSize, mobileSize, GET_ARTWORK, GET_TAGS, ACTIONS, ADD_ARTWORK } from './const';

const { UPDATE_FILTER_ACTION, RESET_ART_WORK_LISTING } = ACTIONS;

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case RESET_ART_WORK_LISTING:
      return initialState;
    case UPDATE_FILTER_ACTION:
      return update(state, {
        filterData: { $merge: payload },
        data: {
          artworks: { $set: [] },
          totalPage: { $set: 0 },
        },
      });
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
          tags: { $set: payload.map((item) => item?.name).filter((item) => item) },
          tagItems: { $set: payload },
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
    case ADD_ARTWORK.PENDING:
      return update(state, {
        ui: {
          isUploading: { $set: true },
        },
      });
    case ADD_ARTWORK.ERROR:
      return update(state, {
        ui: {
          isUploading: { $set: false },
        },
      });
    case ADD_ARTWORK.SUCCESS:
      return update(state, {
        ui: {
          isUploading: { $set: false },
        },
      });
    default:
      return state;
  }
};

export default reducer;
