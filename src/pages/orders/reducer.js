import update from 'react-addons-update';

const initialState = {
  ui: {
    list: {
      loading: false,
    },
  },
  filter: {
    page: 0,
    size: 100,
    sizeMobile: 100,
    sort: [{ id: 'number', desc: true }],
    text: '',
    assignee: '',
  },
  table: {
    orders: [],
    ids: [],
    items: {},
    itemGroups: [],
    totalItems: 0,
    totalPage: 0,
    loading: false,
  },
  artists: [],
  status: [],
  orderStatusCount: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export default reducer;
