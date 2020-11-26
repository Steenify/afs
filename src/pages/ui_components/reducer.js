import update from 'immutability-helper';

import { UPDATE_COMPONENT_FILTERS_ACTION } from './actions';

const initialState = {
  ui: { loading: false },
  data: {
    components: [],
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
    sort: [],
    text: '',
    selectedCollection: '',
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_COMPONENT_FILTERS_ACTION: {
      return update(state, {
        filter: { $merge: payload },
      });
    }
    default:
      return state;
  }
};

export default reducer;
