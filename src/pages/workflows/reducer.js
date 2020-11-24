import update from 'react-addons-update';

import { mapDataList, mapDataByIds, isMobile } from 'utils';

import { GET_WORKFLOW_LIST_ACTION, UPDATE_WORKFLOW_FILTERS_ACTION, CREATE_WORKFLOW_ACTION } from './actions';

const initialState = {
  ui: { loading: false },
  data: {
    workflows: [],
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
  },
  error: {
    detail: {},
  },
  workflow: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_WORKFLOW_FILTERS_ACTION: {
      return update(state, {
        filter: { $merge: payload },
      });
    }
    case CREATE_WORKFLOW_ACTION.PENDING:
    case GET_WORKFLOW_LIST_ACTION.PENDING:
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      });
    case CREATE_WORKFLOW_ACTION.SUCCESS:
    case CREATE_WORKFLOW_ACTION.ERROR:
    case GET_WORKFLOW_LIST_ACTION.ERROR:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
      });
    case GET_WORKFLOW_LIST_ACTION.SUCCESS: {
      const { ids, items } = mapDataByIds(mapDataList(payload.data, 'selected', false), 'id');
      const totalItems = parseInt(payload.headers['x-total-count'], 10);
      const { size, sizeMobile } = state.filter;
      const currSize = isMobile() ? sizeMobile : size;
      const totalPage = Math.ceil(totalItems / currSize);

      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          workflows: { $set: payload.data },
          ids: { $set: ids },
          items: { $set: items },
          totalItems: { $set: payload.headers['x-total-count'] },
          totalPage: { $set: totalPage },
        },
      });
    }
    default:
      return state;
  }
};

export default reducer;
