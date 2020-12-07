import update from 'immutability-helper';
import { mapDataList, mapDataByIds, isMobile } from 'utils';

import { UPDATE_COMPONENT_FILTERS_ACTION, GET_COMPONENTS_ACTION, CREATE_COMPONENT_ACTION, UPDATE_COMPONENT_ACTION, DELETE_COMPONENT_ACTION } from './actions';

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
    case DELETE_COMPONENT_ACTION.PENDING:
    case UPDATE_COMPONENT_ACTION.PENDING:
    case CREATE_COMPONENT_ACTION.PENDING:
    case GET_COMPONENTS_ACTION.PENDING:
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      });
    case CREATE_COMPONENT_ACTION.SUCCESS:
    case DELETE_COMPONENT_ACTION.ERROR:
    case DELETE_COMPONENT_ACTION.PENDING:
    case UPDATE_COMPONENT_ACTION.SUCCESS:
    case UPDATE_COMPONENT_ACTION.ERROR:
    case CREATE_COMPONENT_ACTION.ERROR:
    case GET_COMPONENTS_ACTION.ERROR:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
      });
    case GET_COMPONENTS_ACTION.SUCCESS: {
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
          components: { $set: payload.data },
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
