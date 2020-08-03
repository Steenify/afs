import update from 'react-addons-update';
import { getTotalPage, mapDataByIds, mapDataList } from 'utils';

import { initialState, GET_MESSAGE_TEMPLATE, ACTIONS, GET_LIST, GET_EMAIL_TEMPLATE, desktopSize, mobileSize, GENERATE_TEMPLATE, SEND_EMAIL, VIEW_SENT_CONTENT } from './const';

const {
  UPDATE_FILTER_ACTION,
  UPDATE_ITEM_ACTION,
  UPDATE_ALL_SELECTION,
  SET_CURRENT_ITEM_ACTION,
  UPDATE_CURRENT_ITEM_ORDER_SELECTION_ACTION,
  UPDATE_PREVIEW_ORDERS_ACTION,
  SET_PREVIEW_ORDERS_ACTION,

  UPDATE_CURRENT_ITEM_ACTION,
  UPDATE_PREVIEW_ITEMS_ACTION,
} = ACTIONS;

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_FILTER_ACTION: {
      return update(state, { filterData: { $merge: payload || {} } });
    }
    case SEND_EMAIL.PENDING:
    case VIEW_SENT_CONTENT.PENDING:
    case GENERATE_TEMPLATE.PENDING: {
      return update(state, {
        ui: {
          generatingTemplate: { $set: true },
        },
      });
    }
    case SEND_EMAIL.ERROR:
    case VIEW_SENT_CONTENT.ERROR:
    case GENERATE_TEMPLATE.SUCCESS:
    case GENERATE_TEMPLATE.ERROR: {
      return update(state, {
        ui: {
          generatingTemplate: { $set: false },
        },
      });
    }
    case GET_EMAIL_TEMPLATE.PENDING:
    case GET_MESSAGE_TEMPLATE.PENDING:
    case GET_LIST.PENDING: {
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      });
    }

    case GET_EMAIL_TEMPLATE.ERROR:
    case GET_MESSAGE_TEMPLATE.ERROR:
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

    case GET_EMAIL_TEMPLATE.SUCCESS: {
      return update(state, {
        data: {
          emailTemplate: { $set: payload },
        },
      });
    }

    case GET_MESSAGE_TEMPLATE.SUCCESS: {
      return update(state, {
        data: {
          messageTemplate: { $set: payload },
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
    case SET_CURRENT_ITEM_ACTION: {
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

    case UPDATE_CURRENT_ITEM_ACTION: {
      return update(state, {
        data: {
          currentItem: state?.data?.currentItem
            ? {
                $merge: payload || {},
              }
            : { $set: null },
        },
      });
    }

    case UPDATE_PREVIEW_ITEMS_ACTION: {
      return update(state, {
        data: {
          previewOrderItems: state?.data?.previewOrderItems
            ? {
                $merge: payload || {},
              }
            : { $set: null },
        },
      });
    }

    case SEND_EMAIL.SUCCESS: {
      const current = state?.data?.currentItem || {};
      const sentDate = payload?.[0];
      return update(state, {
        ui: {
          generatingTemplate: { $set: false },
        },
        data: {
          items: {
            [current?.id || 0]: {
              sentDate: { $set: sentDate },
            },
          },
          currentItem: { $set: null },
          previewOrderItems: { $set: null },
          currentPreview: { $set: null },
        },
      });
    }
    case VIEW_SENT_CONTENT.SUCCESS: {
      return update(state, {
        ui: {
          generatingTemplate: { $set: false },
        },
        data: {
          sentEmail: { $set: payload },
        },
      });
    }
    default:
      return state;
  }
};

export default reducer;
