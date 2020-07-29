import { isMobile, actionCreator } from 'utils';

export const desktopSize = 100;
export const mobileSize = 100;

export const initialState = {
  ui: {
    loading: false,
  },
  filterData: {
    page: 0,
    size: isMobile() ? mobileSize : desktopSize,
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

export const ACTIONS = {
  UPDATE_FILTER_ACTION: 'GALLERY_UPDATE_FILTER_ACTION',
};
export const GET_TAGS = actionCreator('GALLERY_GET_TAG');
export const GET_ARTWORK = actionCreator('GALLERY_GET_ARTWORK');
