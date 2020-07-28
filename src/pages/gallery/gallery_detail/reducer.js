import update from 'immutability-helper';

import { GET_ARTWORK_DETAIL } from './action';

const initialState = {
  ui: {
    isLoading: false,
  },
  data: {
    gallery: null,
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ARTWORK_DETAIL.SUCCESS: {
      return update(state, {
        ui: { isLoading: { $set: false } },
        data: { gallery: { $set: payload } },
      });
    }
    default:
      return state;
  }
};

export default reducer;
