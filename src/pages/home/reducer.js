import update from 'react-addons-update';

const initialState = {
  ui: {},
  error: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};

export default reducer;
