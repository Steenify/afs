import update from 'react-addons-update';
import { mapDataList, mapDataByIds } from 'utils';
import { UPDATE_CUSTOMER_CARE_FILTER_ACTION, GET_REMINDER_LIST_ACTION, UPDATE_REMINDER_ITEM_ACTION, SELECTED_ALL_REMINDER_ACTION, MARK_AS_REMINDED_ACTION } from './actions';
import { REMINDER_STATUS } from './const';
const initialState = {
  ui: { loading: false },
  list: {
    reminders: [],
    ids: [],
    items: {},
    totalItems: 0,
    totalPage: 10,
  },
  filter: {
    type: '',
    status: '',
    page: 0,
    size: 100,
    sort: [],
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_CUSTOMER_CARE_FILTER_ACTION: {
      return update(state, {
        filter: {
          $merge: payload,
        },
      });
    }
    case GET_REMINDER_LIST_ACTION.PENDING: {
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      });
    }
    case GET_REMINDER_LIST_ACTION.ERROR: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
      });
    }
    case GET_REMINDER_LIST_ACTION.SUCCESS: {
      const { ids, items } = mapDataByIds(mapDataList(payload.data, 'selected', false), 'id');
      const totalItems = parseInt(payload.headers['x-total-count'], 10);
      const totalPage = Math.ceil(totalItems / state.filter.size);
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        list: {
          reminders: { $set: payload.data },
          ids: { $set: ids },
          items: { $set: items },
          totalItems: { $set: totalItems },
          totalPage: { $set: totalPage },
        },
      });
    }
    case UPDATE_REMINDER_ITEM_ACTION: {
      return update(state, {
        list: {
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
    case SELECTED_ALL_REMINDER_ACTION: {
      return update(state, {
        list: {
          items: {
            $apply: (items) => {
              const res = mapDataList(items, 'selected', payload);
              return res;
            },
          },
        },
      });
    }
    case MARK_AS_REMINDED_ACTION.SUCCESS: {
      if (!payload?.length) return state;
      const updateObj = payload.reduce((acc, curr) => {
        let temp = acc;
        acc[curr] = { status: { $set: REMINDER_STATUS.REMINDED }, selected: { $set: false } };
        return temp;
      }, {});
      return update(state, {
        list: {
          items: updateObj,
        },
      });
    }
    default:
      return state;
  }
};

export default reducer;
