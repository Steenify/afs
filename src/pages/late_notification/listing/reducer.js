import update from 'react-addons-update';
import { getTotalPage, mapDataByIds, mapDataList } from 'utils';

import { initialState, ACTIONS, GET_LIST, GET_TEMPLATE, desktopSize, mobileSize } from './const';

const {
  UPDATE_FILTER_ACTION,
  UPDATE_ITEM_ACTION,
  UPDATE_ALL_SELECTION,
  UPDATE_CURRENT_ITEM_ACTION,
  UPDATE_CURRENT_ITEM_ORDER_SELECTION_ACTION,
  UPDATE_EMAIL_TEMPLATE_ACTION,
  UPDATE_MESSAGE_TEMPLATE_ACTION,
  UPDATE_PREVIEW_ORDERS_ACTION,
  SET_PREVIEW_ORDERS_ACTION,
  UPDATE_PREVIEW_EMAIL_TEMPLATE_ACTION,
} = ACTIONS;

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_FILTER_ACTION: {
      return update(state, { filterData: { $merge: payload } });
    }
    case GET_LIST.PENDING: {
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      });
    }
    case GET_TEMPLATE.PENDING:
    case GET_TEMPLATE.ERROR:
    case GET_LIST.ERROR: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
      });
    }
    case GET_LIST.SUCCESS: {
      const { data, headers } = payload;
      const { ids, items } = mapDataByIds(mapDataList(data, 'selected', false), 'id');
      const totalPage = getTotalPage(headers, desktopSize, mobileSize);
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          notifications: { $set: data },
          ids: { $set: ids },
          items: { $set: items },
          totalPage: { $set: totalPage },
        },
      });
    }

    case GET_TEMPLATE.SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          emailTemplate: { $set: payload },
        },
      });
    }

    case UPDATE_ITEM_ACTION: {
      const { id, field, value } = payload;
      return update(state, {
        data: {
          items: {
            [id]: {
              [field]: {
                $set: value,
              },
            },
          },
        },
      });
    }

    case UPDATE_CURRENT_ITEM_ORDER_SELECTION_ACTION: {
      const { id, value } = payload;
      return update(state, {
        data: {
          currentItem: {
            lateBookings: {
              [id]: {
                selected: {
                  $set: value,
                },
              },
            },
          },
        },
      });
    }

    case UPDATE_PREVIEW_EMAIL_TEMPLATE_ACTION: {
      const { id, field, value } = payload;
      return update(state, {
        data: {
          previewOrderItems: {
            [id]: {
              emailTemplate: {
                [field]: {
                  $set: value,
                },
              },
            },
          },
        },
      });
    }

    case UPDATE_EMAIL_TEMPLATE_ACTION: {
      const { field, value } = payload;
      return update(state, {
        data: {
          currentItem: {
            emailTemplate: {
              [field]: {
                $set: value,
              },
            },
          },
        },
      });
    }

    case UPDATE_MESSAGE_TEMPLATE_ACTION: {
      const { field, value } = payload;
      return update(state, {
        data: {
          currentItem: {
            messageTemplate: {
              [field]: {
                $set: value,
              },
            },
          },
        },
      });
    }

    case SET_PREVIEW_ORDERS_ACTION: {
      return update(state, {
        data: {
          previewOrderItems: {
            $set: payload,
          },
        },
      });
    }

    case UPDATE_PREVIEW_ORDERS_ACTION: {
      // const { id, field, value } = payload;
      return update(state, {
        data: {
          currentPreview: {
            $set: payload,
          },
        },
      });
    }

    case UPDATE_ALL_SELECTION: {
      return update(state, {
        data: {
          items: {
            $apply: (items) => {
              const newItems = mapDataList(items, 'selected', payload);
              return newItems;
            },
          },
        },
      });
    }
    case UPDATE_CURRENT_ITEM_ACTION: {
      const newItem =
        payload === null
          ? payload
          : {
              ...payload,
              lateBookings: mapDataByIds(mapDataList(payload?.lateBookings || [], 'selected', true), 'id').items,
            };
      return update(state, {
        data: {
          currentItem: {
            $set: newItem,
          },
        },
      });
    }
    default:
      return state;
  }
};

export default reducer;
