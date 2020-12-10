import update from 'immutability-helper';
import {
  GET_ORDER_DETAIL_ACTION,
  ORDER_DETAIL_ACTIONS,
  UPDATE_ORDER_ITEM_SUMARIZE_ACTION,
  UPDATE_ORDER_ITEM_FILES_ACTION,
  GET_ORDER_CUSTOMER_ACTION,
  UPDATE_ORDER_STATUS_ACTION,
  CREATE_ORDER_CANVAS_WORK_LOG_ACTION,
  GET_ORDER_CANVAS_WORK_LOG_ACTION,
  GET_ORDER_WORK_LOG_ACTION,
  UPLOAD_FILE_WORK_LOG_ACTION,
  APPROVED_WORK_LOG_ACTION,
  REJECTED_WORK_LOG_ACTION,
  GET_EMAIL_TEMPLATE_ACTION,
  SENT_EMAIL_NOTIFY_ACTION,
  DELETE_ATTACHMENT_WORK_LOG_ACTION,
  UPLOAD_COMMENT_WORK_LOG_ACTION,
  DELETE_COMMENT_WORK_LOG_ACTION,
  UPDATE_COMMENT_WORK_LOG_ACTION,
  DELETE_FILE_DELIVERY_ACTION,
  DELETE_FILE_SUMMARY_ACTION,
  GET_FB_MESSAGE_TEMPLATE_ACTION,
  SENT_FB_MESSAGES_NOTIFY_ACTION,
  UPDATE_TRACKING_CODE_WORK_LOG_ACTION,
  GET_REMIND_EMAIL_TEMPLATE_ACTION,
  GET_REMIND_FB_MESSAGE_TEMPLATE_ACTION,
  SENT_EMAIL_REMIND_ACTION,
  SENT_MESSAGE_REMIND_ACTION,
  CANCELED_WORK_LOG_ACTION,
  ADD_ORDER_ITEM_ACTION,
  GET_ORDER_TODO_LIST_ACTION,
  CREATE_ORDER_TODO_LIST_ACTION,
  EDIT_ORDER_TODO_LIST_ACTION,
  RESOLVED_ORDER_TODO_LIST_ACTION,
  REMOVE_ORDER_TODO_LIST_ACTION,
  DELETE_ARTIST_BUDGET_ORDER_ACTION,
} from './actions';

import { ORDER_TABLE_UPDATE_BUDGET_ACTION, ORDER_TABLE_UPDATE_ARTIST_ACTION } from 'components/tables/orders/actions';

const initialState = {
  ui: {
    loading: false,
    loadingUser: false,
    loadingWorkLog: false,
    loadingCanvasWorkLog: false,
    isShowEmail: false,
    isDeliveryEmail: false,
    isShowAddProduct: false,
    loadingEmail: false,
    loadingTodo: true,
    remind: {
      isShowEmail: false,
      loadingEmail: false,
    },
    assignedBox: {
      isShow: false,
      currentShow: '',
    },
  },
  data: {
    order: {},
    customer: {},
    workLog: {},
    canvasWorkLog: {},
    email: '',
    emailTitle: '',
    selectedEmailTemplate: 0,
    currentWorkLogIndex: -1,
    currentWorkLogType: 'workLog',
    currentArtistId: 0,
    fbTemplate: '',
    fbTemplateAttachments: [],
    remind: {
      fbTemplate: '',
      fbTemplateAttachments: [],
      email: '',
      emailTitle: '',
    },
    todos: [],
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
    case ORDER_DETAIL_ACTIONS.UPDATE_FB_TEMPLATE_NOTIFY:
      return update(state, {
        data: {
          fbTemplate: {
            $set: payload,
          },
        },
      });
    case ORDER_DETAIL_ACTIONS.UPDATE_REMIND_TEMPLATE:
      return update(state, {
        data: {
          remind: {
            $merge: payload,
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
    case ORDER_DETAIL_ACTIONS.UPDATE_SENT_DELIVERY_EMAIL:
      return update(state, {
        ui: {
          isDeliveryEmail: {
            $set: payload,
          },
        },
      });
    case ORDER_DETAIL_ACTIONS.UPDATE_SHOW_EMAIL_REMIND:
      return update(state, {
        ui: {
          remind: {
            isShowEmail: {
              $set: payload,
            },
          },
        },
      });
    case ORDER_DETAIL_ACTIONS.UPDATE_SHOW_ADD_PRODUCT_MODAL:
      return update(state, {
        ui: {
          isShowAddProduct: {
            $set: payload,
          },
        },
      });
    case ORDER_DETAIL_ACTIONS.UPDATE_ORDER_CUSTOMER:
      return update(state, {
        data: {
          customer: {
            $merge: payload,
          },
        },
      });

    case GET_ORDER_DETAIL_ACTION.PENDING:
    case UPDATE_ORDER_ITEM_FILES_ACTION.PENDING:
    case CREATE_ORDER_CANVAS_WORK_LOG_ACTION.PENDING:
    case UPDATE_ORDER_STATUS_ACTION.PENDING:
    case UPLOAD_FILE_WORK_LOG_ACTION.PENDING:
    case UPLOAD_COMMENT_WORK_LOG_ACTION.PENDING:
    case UPDATE_TRACKING_CODE_WORK_LOG_ACTION.PENDING:
    case DELETE_COMMENT_WORK_LOG_ACTION.PENDING:
    case DELETE_ATTACHMENT_WORK_LOG_ACTION.PENDING:
    case APPROVED_WORK_LOG_ACTION.PENDING:
    case REJECTED_WORK_LOG_ACTION.PENDING:
    case CANCELED_WORK_LOG_ACTION.PENDING:
    case SENT_EMAIL_NOTIFY_ACTION.PENDING:
    case SENT_FB_MESSAGES_NOTIFY_ACTION.PENDING:
    case SENT_EMAIL_REMIND_ACTION.PENDING:
    case SENT_MESSAGE_REMIND_ACTION.PENDING:
    case ADD_ORDER_ITEM_ACTION.PENDING:
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
    case ADD_ORDER_ITEM_ACTION.SUCCESS:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          order: {
            items: {
              $push: [payload],
            },
          },
        },
      });
    case CREATE_ORDER_CANVAS_WORK_LOG_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          order: {
            statusForCanvas: {
              $set: payload.data.status,
            },
          },
          canvasWorkLog: {
            $set: [payload.data],
          },
        },
      });
    }
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
            [payload.artistId]: { $push: [payload.data] },
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
          [payload.workLogType]: {
            [payload.artistId]: {
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
        },
      });

    case UPLOAD_COMMENT_WORK_LOG_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          [payload.workLogType]: {
            [payload.artistId]: {
              [payload.index]: {
                comments: {
                  $push: [payload.data],
                },
              },
            },
          },
        },
      });
    }
    case DELETE_ATTACHMENT_WORK_LOG_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          [payload.workLogType]: {
            [payload.artistId]: {
              [payload.logIndex]: {
                attachments: {
                  $splice: [[payload.attachmentIndex, 1]],
                },
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
          [payload.workLogType]: {
            [payload.artistId]: {
              [payload.logIndex]: {
                comments: {
                  $splice: [[payload.comIndex, 1]],
                },
              },
            },
          },
        },
      });
    }
    case UPDATE_TRACKING_CODE_WORK_LOG_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          order: {
            printfulTrackings: { $set: payload || [] },
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
          [payload.workLogType]: {
            [payload.artistId]: {
              [payload.logIndex]: {
                comments: {
                  [payload.comIndex]: {
                    $set: payload.data,
                  },
                },
              },
            },
          },
        },
      });
    }

    case APPROVED_WORK_LOG_ACTION.SUCCESS: {
      if (payload.isStartingCanvas) {
        return update(state, {
          ui: {
            loading: { $set: false },
          },
          data: {
            [payload.workLogType]: {
              [payload.artistId]: {
                [payload.index]: {
                  state: {
                    $set: 'APPROVED',
                  },
                  activities: {
                    $push: payload.activives,
                  },
                },
              },
            },
          },
        });
      }
      if (payload.isMarkAsDone) {
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
              [payload.artistId]: {
                $push: [payload.data],
              },
            },
            canvasWorkLog: {
              [payload.artistId]: {
                [payload.index]: {
                  state: {
                    $set: 'APPROVED',
                  },
                  activities: {
                    $push: payload.activives,
                  },
                },
              },
            },
          },
        });
      }
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          order: {
            [payload.workLogType === 'workLog' ? 'status' : 'statusForCanvas']: {
              $set: payload.data.status,
            },
          },
          [payload.workLogType]: {
            [payload.artistId]: {
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
          [payload.workLogType]: {
            [payload.artistId]: {
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
        },
      });
    }
    case CANCELED_WORK_LOG_ACTION.SUCCESS: {
      const newState = update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          order: {
            status: {
              $set: payload?.orderStatus || '',
            },
          },
          [payload.workLogType]: {
            [payload.artistId]: {
              $splice: [[payload?.index, 1]],
            },
          },
        },
      });

      console.log('reducer -> newState', newState);
      return newState;
    }
    case ORDER_TABLE_UPDATE_BUDGET_ACTION.SUCCESS: {
      return update(state, {
        data: {
          order: { budget: { $set: payload.budget } },
        },
      });
    }
    case ORDER_TABLE_UPDATE_ARTIST_ACTION.SUCCESS: {
      return update(state, {
        data: {
          order: {
            $set: payload,
          },
        },
      });
    }

    case SENT_EMAIL_NOTIFY_ACTION.SUCCESS:
    case SENT_EMAIL_REMIND_ACTION.SUCCESS:
    case SENT_MESSAGE_REMIND_ACTION.SUCCESS:
    case SENT_FB_MESSAGES_NOTIFY_ACTION.SUCCESS: {
      const { currentWorkLogIndex, currentWorkLogType = 'workLog', currentArtistId } = state.data;
      return update(state, {
        ui: {
          loading: { $set: false },
          isShowEmail: { $set: false },
        },
        data: {
          [currentWorkLogType]: {
            [currentArtistId]: {
              [currentWorkLogIndex]: {
                activities: {
                  $push: payload.activives,
                },
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
    case CREATE_ORDER_CANVAS_WORK_LOG_ACTION.ERROR:
    case UPLOAD_FILE_WORK_LOG_ACTION.ERROR:
    case UPLOAD_COMMENT_WORK_LOG_ACTION.ERROR:
    case DELETE_COMMENT_WORK_LOG_ACTION.ERROR:
    case DELETE_ATTACHMENT_WORK_LOG_ACTION.ERROR:
    case UPDATE_TRACKING_CODE_WORK_LOG_ACTION.ERROR:
    case UPDATE_COMMENT_WORK_LOG_ACTION.ERROR:
    case APPROVED_WORK_LOG_ACTION.ERROR:
    case REJECTED_WORK_LOG_ACTION.ERROR:
    case CANCELED_WORK_LOG_ACTION.ERROR:
    case SENT_EMAIL_NOTIFY_ACTION.ERROR:
    case SENT_FB_MESSAGES_NOTIFY_ACTION.ERROR:
    case SENT_EMAIL_REMIND_ACTION.ERROR:
    case SENT_MESSAGE_REMIND_ACTION.ERROR:
    case ADD_ORDER_ITEM_ACTION.ERROR:
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

    case GET_ORDER_CANVAS_WORK_LOG_ACTION.PENDING:
      return update(state, {
        ui: {
          loadingCanvasWorkLog: { $set: true },
        },
      });
    case GET_ORDER_CANVAS_WORK_LOG_ACTION.SUCCESS:
      return update(state, {
        ui: {
          loadingCanvasWorkLog: { $set: false },
        },
        data: {
          canvasWorkLog: { $set: payload.data },
        },
      });
    case GET_ORDER_CANVAS_WORK_LOG_ACTION.ERROR:
      return update(state, {
        ui: {
          loadingCanvasWorkLog: { $set: false },
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
    case GET_FB_MESSAGE_TEMPLATE_ACTION.PENDING:
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
          currentWorkLogType: {
            $set: payload.workLogType,
          },
          currentArtistId: {
            $set: payload.artistId,
          },
        },
      });
    }

    case GET_REMIND_EMAIL_TEMPLATE_ACTION.PENDING:
    case GET_REMIND_FB_MESSAGE_TEMPLATE_ACTION.PENDING:
      return update(state, {
        ui: {
          remind: { isShowEmail: { $set: true }, loadingEmail: { $set: true } },
        },
      });
    case GET_REMIND_EMAIL_TEMPLATE_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          remind: {
            loadingEmail: { $set: false },
          },
        },
        data: {
          remind: {
            email: {
              $set: payload.data.content,
            },
            emailTitle: {
              $set: payload.data.title,
            },
          },
          currentWorkLogIndex: {
            $set: payload.workLogIndex,
          },
          currentWorkLogType: {
            $set: payload.workLogType,
          },
          currentArtistId: {
            $set: payload.artistId,
          },
        },
      });
    }
    case GET_FB_MESSAGE_TEMPLATE_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          loadingEmail: { $set: false },
        },
        data: {
          fbTemplate: {
            $set: payload.data.content,
          },
          fbTemplateAttachments: {
            $set: payload.data.attachments,
          },
          currentWorkLogIndex: {
            $set: payload.workLogIndex,
          },
          currentArtistId: {
            $set: payload.artistId,
          },
        },
      });
    }
    case GET_REMIND_FB_MESSAGE_TEMPLATE_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          remind: {
            loadingEmail: { $set: false },
          },
        },
        data: {
          remind: {
            fbTemplate: {
              $set: payload.data.content,
            },
            fbTemplateAttachments: {
              $set: payload.data.attachments,
            },
          },
          selectedEmailTemplate: {
            $set: payload.templateId,
          },
          currentWorkLogIndex: {
            $set: payload.workLogIndex,
          },
          currentArtistId: {
            $set: payload.artistId,
          },
        },
      });
    }

    case GET_EMAIL_TEMPLATE_ACTION.ERROR:
    case GET_FB_MESSAGE_TEMPLATE_ACTION.ERROR:
      return update(state, {
        ui: {
          isShowEmail: { $set: false },
          loadingEmail: { $set: false },
        },
      });
    case GET_REMIND_EMAIL_TEMPLATE_ACTION.ERROR:
    case GET_REMIND_FB_MESSAGE_TEMPLATE_ACTION.ERROR:
      return update(state, {
        ui: {
          remind: {
            isShowEmail: { $set: false },
            loadingEmail: { $set: false },
          },
        },
      });

    case DELETE_FILE_DELIVERY_ACTION.SUCCESS: {
      return update(state, {
        data: {
          [payload.workLogType]: {
            [payload.artistId]: {
              [payload.logIndex]: {
                attachments: {
                  $splice: [[payload.fileIndex, 1]],
                },
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
    case GET_ORDER_TODO_LIST_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          loadingTodo: {
            $set: false,
          },
        },
        data: {
          todos: {
            $set: payload,
          },
        },
      });
    }
    case CREATE_ORDER_TODO_LIST_ACTION.SUCCESS: {
      return update(state, {
        data: {
          todos: {
            $push: [payload],
          },
        },
      });
    }
    case EDIT_ORDER_TODO_LIST_ACTION.SUCCESS: {
      return update(state, {
        data: {
          todos: {
            [payload.index]: {
              $set: payload.data,
            },
          },
        },
      });
    }
    case RESOLVED_ORDER_TODO_LIST_ACTION.SUCCESS: {
      return update(state, {
        data: {
          todos: {
            [payload.index]: {
              $set: payload.data,
            },
          },
        },
      });
    }
    case REMOVE_ORDER_TODO_LIST_ACTION.SUCCESS: {
      return update(state, {
        data: {
          todos: {
            $splice: [[payload.index, 1]],
          },
        },
      });
    }
    case DELETE_ARTIST_BUDGET_ORDER_ACTION.SUCCESS: {
      return update(state, {
        data: {
          order: {
            artistBudgets: {
              $splice: [[payload.index, 1]],
            },
          },
        },
      });
    }

    case ORDER_DETAIL_ACTIONS.UPDATE_SHOW_ASSIGNED_MODAL: {
      return update(state, {
        ui: {
          assignedBox: {
            currentShow: { $set: payload },
          },
        },
      });
    }

    case ORDER_DETAIL_ACTIONS.SET_ORDER_DETAIL_BUDGET: {
      const order = state.data.order || {};
      const index = order?.artistBudgets?.findIndex?.((item) => item?.artist?.id === order?.assignedTo?.id);
      if (index !== -1) {
        return update(state, {
          data: {
            order: {
              budget: { $set: payload },
              artistBudgets: {
                [index]: { budget: { $set: payload } },
              },
            },
          },
        });
      } else {
        return update(state, {
          data: {
            order: {
              budget: { $set: payload },
            },
          },
        });
      }
    }

    default:
      return state;
  }
};

export default reducer;
