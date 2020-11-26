import update from 'react-addons-update';

import {
  DELETE_WORKFLOW_ACTION,
  UPDATE_WORKFLOW_ACTION,
  GET_WORKFLOW_DETAIL_ACTION,
  ADD_NEW_STATE_ACTION,
  REMOVE_NEW_STATE_ACTION,
  RESET_WORKFLOW_DETAIL_ACTION,
  GET_EMAIL_TEMPLATES_ACTION,
  UPDATE_WORKFLOW_STATE_ZAPIER_ACTION,
  CREATE_WORKFLOW_STATE_ZAPIER_ACTION,
  DELETE_WORKFLOW_TRANSITION_ZAPIER_ACTION,
} from './actions';

const initialState = {
  ui: { loading: false, loadingEmailTemplates: false, loadingInfo: false },
  error: {},
  data: {
    workflow: {},
    emailTemplates: [],
  },
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_WORKFLOW_ACTION.PENDING: {
      return update(state, {
        ui: {
          loadingInfo: { $set: true },
        },
      });
    }
    case UPDATE_WORKFLOW_ACTION.SUCCESS: {
      const temp = { name: payload.name, description: payload.description };
      return update(state, {
        ui: {
          loadingInfo: { $set: false },
        },
        data: {
          workflow: { $merge: temp },
        },
      });
    }
    case UPDATE_WORKFLOW_ACTION.ERROR: {
      return update(state, {
        ui: {
          loadingInfo: { $set: false },
        },
      });
    }
    case ADD_NEW_STATE_ACTION: {
      return update(state, {
        data: {
          workflow: {
            states: { $push: [payload] },
          },
        },
      });
    }
    case REMOVE_NEW_STATE_ACTION: {
      return update(state, {
        data: {
          workflow: {
            states: { $splice: [[payload, 1]] },
          },
        },
      });
    }
    case CREATE_WORKFLOW_STATE_ZAPIER_ACTION.SUCCESS: {
      // const { data, index } = payload;
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        // data: {
        //   workflow: {
        //     states: {
        //       [index]: { $set: data },
        //     },
        //   },
        // },
      });
    }
    case DELETE_WORKFLOW_TRANSITION_ZAPIER_ACTION.SUCCESS:
    case DELETE_WORKFLOW_ACTION.SUCCESS:
    case UPDATE_WORKFLOW_STATE_ZAPIER_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
      });
    }
    case DELETE_WORKFLOW_TRANSITION_ZAPIER_ACTION.PENDING:
    case DELETE_WORKFLOW_ACTION.PENDING:
    case CREATE_WORKFLOW_STATE_ZAPIER_ACTION.PENDING:
    case UPDATE_WORKFLOW_STATE_ZAPIER_ACTION.PENDING:
    case GET_WORKFLOW_DETAIL_ACTION.PENDING: {
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      });
    }
    case DELETE_WORKFLOW_TRANSITION_ZAPIER_ACTION.ERROR:
    case DELETE_WORKFLOW_ACTION.ERROR:
    case CREATE_WORKFLOW_STATE_ZAPIER_ACTION.ERROR:
    case UPDATE_WORKFLOW_STATE_ZAPIER_ACTION.ERROR:
    case GET_WORKFLOW_DETAIL_ACTION.ERROR: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
      });
    }
    case GET_WORKFLOW_DETAIL_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          loading: { $set: false },
        },
        data: {
          workflow: { $set: payload },
        },
      });
    }
    case RESET_WORKFLOW_DETAIL_ACTION: {
      return { ...initialState };
    }
    case GET_EMAIL_TEMPLATES_ACTION.PENDING: {
      return update(state, {
        ui: {
          loadingEmailTemplates: { $set: true },
        },
      });
    }
    case GET_EMAIL_TEMPLATES_ACTION.ERROR: {
      return update(state, {
        ui: {
          loadingEmailTemplates: { $set: false },
        },
      });
    }
    case GET_EMAIL_TEMPLATES_ACTION.SUCCESS: {
      return update(state, {
        ui: {
          loadingEmailTemplates: { $set: false },
        },
        data: {
          emailTemplates: { $set: payload },
        },
      });
    }
    default:
      return state;
  }
};

export default reducer;
