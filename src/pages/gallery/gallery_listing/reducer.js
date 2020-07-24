import { GET_ARTWORK, GET_TAGS } from './action';

const initialState = {
  ui: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export default reducer;
