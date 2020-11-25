import update from 'react-addons-update';

import { mapDataList, mapDataByIds, isMobile } from 'utils';

import { GET_PRODUCTS_ACTION, UPDATE_ALL_PRODUCT_ITEMS_ACTION, UPDATE_PRODUCT_FILTERS_ACTION, UPDATE_PRODUCT_ITEMS_ACTION } from './actions';

const initialState = {
  ui: { loading: false },
  data: {
    products: [],
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
    case UPDATE_PRODUCT_FILTERS_ACTION: {
      return update(state, {
        filter: { $merge: payload },
      });
    }
    case GET_PRODUCTS_ACTION.PENDING:
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      });
    case GET_PRODUCTS_ACTION.ERROR:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
      });
    case GET_PRODUCTS_ACTION.SUCCESS: {
      const content = payload.data.content;
      const { ids, items } = mapDataByIds(mapDataList(content, 'selected', false), 'id');
      const totalItems = parseInt(payload.headers['x-total-count'], 10);
      const { size, sizeMobile } = state.filter;
      const currSize = isMobile() ? sizeMobile : size;
      const totalPage = Math.ceil(totalItems / currSize);

      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          products: { $set: content },
          ids: { $set: ids },
          items: { $set: items },
          totalItems: { $set: payload.headers['x-total-count'] },
          totalPage: { $set: totalPage },
        },
      });
    }
    case UPDATE_PRODUCT_ITEMS_ACTION: {
      return update(state, {
        data: {
          items: {
            [payload.id]: {
              [payload.field]: {
                $set: payload.value,
              },
            },
          },
        },
      });
    }
    case UPDATE_ALL_PRODUCT_ITEMS_ACTION: {
      return update(state, {
        data: {
          items: {
            $apply: (items) => {
              const res = mapDataList(items, 'selected', payload);
              return res;
            },
          },
        },
      });
    }
    default:
      return state;
  }
};

export default reducer;
