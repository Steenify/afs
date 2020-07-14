import update from 'react-addons-update';
import {
  GET_ORDER_DETAIL_ACTION,
  ORDER_DETAIL_ACTIONS,
  UPDATE_ORDER_ITEM_SUMARIZE_ACTION,
  UPDATE_ORDER_ITEM_FILES_ACTION,
  GET_ORDER_CUSTOMER_ACTION,
  UPDATE_ORDER_STATUS_ACTION,
  GET_ORDER_WORK_LOG_ACTION,
  UPLOAD_FILE_WORK_LOG_ACTION,
  APPROVED_WORK_LOG_ACTION,
  REJECTED_WORK_LOG_ACTION,
  GET_EMAIL_TEMPLATE_ACTION,
  SENT_EMAIL_NOTIFY_ACTION,
  UPLOAD_COMMENT_WORK_LOG_ACTION,
  DELETE_COMMENT_WORK_LOG_ACTION,
  UPDATE_COMMENT_WORK_LOG_ACTION,
  DELETE_FILE_DELIVERY_ACTION,
  DELETE_FILE_SUMMARY_ACTION,
} from './actions';

import {
  UPDATE_ORDER_BUDGET_ACTION,
  UPDATE_ORDER_ARTIST_ACTION,
} from '../orders/actions';

const initialState = {
  ui: {
    loading: false,
    loadingUser: false,
    loadingWorkLog: false,
    isShowEmail: false,
    loadingEmail: false,
  },
  data: {
    order: {},
    customer: {},
    workLog: [],
    email: '',
    emailTitle: '',
    selectedEmailTemplate: 0,
    currentWorkLogIndex: -1,
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_DETAIL_ACTIONS.UPDATE_ORDER_ITEM_SUMARIZE:
      return update(state, {
        data: {
          order: {
            items: {
              [payload.index]: {
                summarize: {
                  $set: payload.value,
                },
              },
            },
          },
        },
      });
    case ORDER_DETAIL_ACTIONS.UPDATE_EMAIL_NOTIFY:
      return update(state, {
        data: {
          email: {
            $set: payload,
          },
        },
      });
    case ORDER_DETAIL_ACTIONS.UPDATE_SHOW_EMAIL_NOTIFY:
      return update(state, {
        ui: {
          isShowEmail: {
            $set: payload,
          },
        },
      });

    case GET_ORDER_DETAIL_ACTION.PENDING:
    case UPDATE_ORDER_ITEM_FILES_ACTION.PENDING:
    case UPDATE_ORDER_STATUS_ACTION.PENDING:
    case UPLOAD_FILE_WORK_LOG_ACTION.PENDING:
    case UPLOAD_COMMENT_WORK_LOG_ACTION.PENDING:
    case DELETE_COMMENT_WORK_LOG_ACTION.PENDING:
    case APPROVED_WORK_LOG_ACTION.PENDING:
    case REJECTED_WORK_LOG_ACTION.PENDING:
    case SENT_EMAIL_NOTIFY_ACTION.PENDING:
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      });
    case GET_ORDER_DETAIL_ACTION.SUCCESS:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          order: { $set: payload.data },
        },
      });
    case UPDATE_ORDER_STATUS_ACTION.SUCCESS:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          order: {
            status: {
              $set: payload.status,
            },
          },
          workLog: {
            $push: [payload.data],
          },
        },
      });

    case UPDATE_ORDER_ITEM_FILES_ACTION.SUCCESS:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          order: {
            items: {
              [payload.index]: {
                photos: {
                  $push: payload.data,
                },
              },
            },
          },
        },
      });
    case UPLOAD_FILE_WORK_LOG_ACTION.SUCCESS:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          workLog: {
            [payload.index]: {
              attachments: {
                $push: payload.data,
              },
              activities: {
                $push: payload.activives,
              },
            },
          },
        },
      });

    case UPLOAD_COMMENT_WORK_LOG_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          workLog: {
            [payload.index]: {
              comments: {
                $push: [payload.data],
              },
            },
          },
        },
      });
    }
    case DELETE_COMMENT_WORK_LOG_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          workLog: {
            [payload.logIndex]: {
              comments: {
                $splice: [[payload.comIndex, 1]],
              },
            },
          },
        },
      });
    }
    case UPDATE_COMMENT_WORK_LOG_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          workLog: {
            [payload.logIndex]: {
              comments: {
                [payload.comIndex]: {
                  $set: payload.data,
                },
              },
            },
          },
        },
      });
    }

    case APPROVED_WORK_LOG_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          order: {
            status: {
              $set: payload.data.status,
            },
          },
          workLog: {
            [payload.index]: {
              state: {
                $set: 'APPROVED',
              },
              activities: {
                $push: payload.activives,
              },
            },
            $push: [payload.data],
          },
        },
      });
    }
    case REJECTED_WORK_LOG_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          order: {
            status: {
              $set: payload.data.status,
            },
          },
          workLog: {
            [payload.index]: {
              state: {
                $set: 'REJECTED',
              },
              activities: {
                $push: payload.activives,
              },
            },
            $push: [payload.data],
          },
        },
      });
    }
    case UPDATE_ORDER_BUDGET_ACTION.SUCCESS: {
      return update(state, {
        data: {
          order: { budget: { $set: payload.budget } },
        },
      });
    }
    case UPDATE_ORDER_ARTIST_ACTION.SUCCESS: {
      return update(state, {
        data: {
          order: { assignedTo: { $set: payload.assignedTo } },
        },
      });
    }

    case SENT_EMAIL_NOTIFY_ACTION.SUCCESS: {
      const { currentWorkLogIndex } = state.data;
      return update(state, {
        ui: {
          loading: { $set: false },
          isShowEmail: { $set: false },
        },
        data: {
          workLog: {
            [currentWorkLogIndex]: {
              activities: {
                $push: payload.activives,
              },
            },
          },
        },
      });
    }

    case GET_ORDER_DETAIL_ACTION.ERROR:
    case UPDATE_ORDER_ITEM_SUMARIZE_ACTION.ERROR:
    case UPDATE_ORDER_ITEM_SUMARIZE_ACTION.SUCCESS:
    case UPDATE_ORDER_ITEM_FILES_ACTION.ERROR:
    case UPDATE_ORDER_STATUS_ACTION.ERROR:
    case UPLOAD_FILE_WORK_LOG_ACTION.ERROR:
    case UPLOAD_COMMENT_WORK_LOG_ACTION.ERROR:
    case DELETE_COMMENT_WORK_LOG_ACTION.ERROR:
    case UPDATE_COMMENT_WORK_LOG_ACTION.ERROR:
    case APPROVED_WORK_LOG_ACTION.ERROR:
    case REJECTED_WORK_LOG_ACTION.ERROR:
    case SENT_EMAIL_NOTIFY_ACTION.ERROR:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
      });

    case GET_ORDER_CUSTOMER_ACTION.PENDING:
      return update(state, {
        ui: {
          loadingUser: { $set: true },
        },
      });
    case GET_ORDER_CUSTOMER_ACTION.SUCCESS:
      return update(state, {
        ui: {
          loadingUser: { $set: false },
        },
        data: {
          customer: { $set: payload.data },
        },
      });
    case GET_ORDER_CUSTOMER_ACTION.ERROR:
      return update(state, {
        ui: {
          loadingUser: { $set: false },
        },
      });

    case GET_ORDER_WORK_LOG_ACTION.PENDING:
      return update(state, {
        ui: {
          loadingWorkLog: { $set: true },
        },
      });
    case GET_ORDER_WORK_LOG_ACTION.SUCCESS:
      return update(state, {
        ui: {
          loadingWorkLog: { $set: false },
        },
        data: {
          workLog: { $set: payload.data },
        },
      });
    case GET_ORDER_WORK_LOG_ACTION.ERROR:
      return update(state, {
        ui: {
          loadingWorkLog: { $set: false },
        },
      });

    // Get mail
    case GET_EMAIL_TEMPLATE_ACTION.PENDING:
      return update(state, {
        ui: {
          isShowEmail: { $set: true },
          loadingEmail: { $set: true },
        },
      });

    case GET_EMAIL_TEMPLATE_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          loadingEmail: { $set: false },
        },
        data: {
          email: {
            $set: payload.data.content,
          },
          emailTitle: {
            $set: payload.data.title,
          },
          selectedEmailTemplate: {
            $set: payload.templateId,
          },
          currentWorkLogIndex: {
            $set: payload.workLogIndex,
          },
        },
      });
    }

    case GET_EMAIL_TEMPLATE_ACTION.ERROR:
      return update(state, {
        ui: {
          isShowEmail: { $set: false },
          loadingEmail: { $set: false },
        },
      });

    case DELETE_FILE_DELIVERY_ACTION.SUCCESS: {
      return update(state, {
        data: {
          workLog: {
            [payload.logIndex]: {
              attachments: {
                $splice: [[payload.fileIndex, 1]],
              },
            },
          },
        },
      });
    }
    case DELETE_FILE_SUMMARY_ACTION.SUCCESS: {
      return update(state, {
        data: {
          order: {
            items: {
              [payload.itemIndex]: {
                photos: {
                  $splice: [[payload.fileIndex, 1]],
                },
              },
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
