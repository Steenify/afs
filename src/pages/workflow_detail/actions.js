import { actionCreator, actionTryCatchCreator } from 'utils';

import {
  getWorkflowDetailService,
  updateWorkflowService,
  updateWorkflowStateZapierService,
  createWorkflowStateZapierService,
  deleteWorkflowStateZapierService,
  deleteWorkflowService,
  deleteWorkflowTransitionZapierService,
} from 'services/workflow.service';
import { getEmailTemplatesService } from 'services/email-templates.service';

export const initialWorflowState = {
  stateId: null,
  name: '',
  component: '',
  type: '',
  description: '',
  messageTemplates: [],
  transitions: [],
  updating: true,
};

export const DELETE_WORKFLOW_ACTION = actionCreator('DELETE_WORKFLOW_ACTION');
export const deleteWorkflowAction = (id, onSuccess, onError) => async (dispatch) => {
  await actionTryCatchCreator({
    service: deleteWorkflowService(id),
    onPending: () =>
      dispatch({
        type: DELETE_WORKFLOW_ACTION.PENDING,
      }),
    onSuccess: (data) => {
      dispatch({
        type: DELETE_WORKFLOW_ACTION.SUCCESS,
        payload: data,
      });
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      dispatch({
        type: DELETE_WORKFLOW_ACTION.ERROR,
        payload: error.response,
      });
      if (onError) onError(error.response);
    },
  });
};

export const UPDATE_WORKFLOW_ACTION = actionCreator('UPDATE_WORKFLOW_ACTION');
export const updateWorkflowAction = (id, data, onSuccess, onError) => async (dispatch) => {
  await actionTryCatchCreator({
    service: updateWorkflowService(id, data),
    onPending: () =>
      dispatch({
        type: UPDATE_WORKFLOW_ACTION.PENDING,
      }),
    onSuccess: (data) => {
      dispatch({
        type: UPDATE_WORKFLOW_ACTION.SUCCESS,
        payload: data,
      });
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      dispatch({
        type: UPDATE_WORKFLOW_ACTION.ERROR,
        payload: error.response,
      });
      if (onError) onError(error.response);
    },
  });
};

export const GET_WORKFLOW_DETAIL_ACTION = actionCreator('GET_WORKFLOW_DETAIL_ACTION');
export const getWorkflowDetailAction = (id, onSuccess, onError) => async (dispatch) => {
  actionTryCatchCreator({
    service: getWorkflowDetailService(id),
    onPending: () =>
      dispatch({
        type: GET_WORKFLOW_DETAIL_ACTION.PENDING,
      }),
    onSuccess: (data) => {
      dispatch({
        type: GET_WORKFLOW_DETAIL_ACTION.SUCCESS,
        payload: data,
      });
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      dispatch({
        type: GET_WORKFLOW_DETAIL_ACTION.ERROR,
        payload: error.response,
      });
      if (onError) onError(error.response);
    },
  });
};

export const GET_EMAIL_TEMPLATES_ACTION = actionCreator('GET_EMAIL_TEMPLATES_ACTION');
export const getEmailTemplatesAction = (onSuccess, onError) => async (dispatch) => {
  actionTryCatchCreator({
    service: getEmailTemplatesService(),
    onPending: () =>
      dispatch({
        type: GET_EMAIL_TEMPLATES_ACTION.PENDING,
      }),
    onSuccess: (data) => {
      const list = (data || []).map((item) => ({ ...item, value: item.id, label: item.name }));
      dispatch({
        type: GET_EMAIL_TEMPLATES_ACTION.SUCCESS,
        payload: list,
      });
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      dispatch({
        type: GET_EMAIL_TEMPLATES_ACTION.ERROR,
        payload: error.response,
      });
      if (onError) onError(error.response);
    },
  });
};

export const RESET_WORKFLOW_DETAIL_ACTION = 'RESET_WORKFLOW_DETAIL_ACTION';
export const resetWorkflowDetailAction = () => async (dispatch) => {
  dispatch({
    type: RESET_WORKFLOW_DETAIL_ACTION,
  });
};

export const ADD_NEW_STATE_ACTION = 'ADD_NEW_STATE_ACTION';
export const addNewStateAction = () => async (dispatch) => {
  dispatch({
    type: ADD_NEW_STATE_ACTION,
    payload: initialWorflowState,
  });
};

export const REMOVE_NEW_STATE_ACTION = 'REMOVE_NEW_STATE_ACTION';
export const removeNewStateAction = (index) => async (dispatch) => {
  dispatch({
    type: REMOVE_NEW_STATE_ACTION,
    payload: index,
  });
};

export const UPDATE_WORKFLOW_STATE_ZAPIER_ACTION = actionCreator('GET_WOUPDATE_WORKFLOW_STATE_ZAPIER_ACTIONRKFLOW_DETAIL_ACTION');
export const updateWorkflowStateZapierAction = (id, data, onSuccess, onError) => async (dispatch) => {
  actionTryCatchCreator({
    service: updateWorkflowStateZapierService(id, data),
    onPending: () =>
      dispatch({
        type: UPDATE_WORKFLOW_STATE_ZAPIER_ACTION.PENDING,
      }),
    onSuccess: (data) => {
      dispatch({
        type: UPDATE_WORKFLOW_STATE_ZAPIER_ACTION.SUCCESS,
        payload: data,
      });
      if (onSuccess) onSuccess(data);
      dispatch(getWorkflowDetailAction(id));
    },
    onError: (error) => {
      dispatch({
        type: UPDATE_WORKFLOW_STATE_ZAPIER_ACTION.ERROR,
        payload: error.response,
      });
      if (onError) onError(error.response);
    },
  });
};

export const CREATE_WORKFLOW_STATE_ZAPIER_ACTION = actionCreator('CREATE_WORKFLOW_STATE_ZAPIER_ACTION');
export const createWorkflowStateZapierAction = ({ id, index, data, onSuccess, onError }) => async (dispatch) => {
  actionTryCatchCreator({
    service: createWorkflowStateZapierService(id, data),
    onPending: () =>
      dispatch({
        type: CREATE_WORKFLOW_STATE_ZAPIER_ACTION.PENDING,
      }),
    onSuccess: (data) => {
      dispatch({
        type: CREATE_WORKFLOW_STATE_ZAPIER_ACTION.SUCCESS,
        payload: { data, index },
      });
      if (onSuccess) onSuccess(data);
      dispatch(getWorkflowDetailAction(id));
    },
    onError: (error) => {
      dispatch({
        type: CREATE_WORKFLOW_STATE_ZAPIER_ACTION.ERROR,
        payload: error.response,
      });
      if (onError) onError(error.response);
    },
  });
};

export const DELETE_WORKFLOW_STATE_ZAPIER_ACTION = actionCreator('DELETE_WORKFLOW_STATE_ZAPIER_ACTION');
export const deleteWorkflowStateZapierAction = ({ flowId, stateId, onSuccess, onError }) => async (dispatch) => {
  actionTryCatchCreator({
    service: deleteWorkflowStateZapierService({ flowId, stateId }),
    onPending: () =>
      dispatch({
        type: DELETE_WORKFLOW_STATE_ZAPIER_ACTION.PENDING,
      }),
    onSuccess: (data) => {
      dispatch({
        type: DELETE_WORKFLOW_STATE_ZAPIER_ACTION.SUCCESS,
        payload: data,
      });
      if (onSuccess) onSuccess(data);
      dispatch(getWorkflowDetailAction(flowId));
    },
    onError: (error) => {
      dispatch({
        type: DELETE_WORKFLOW_STATE_ZAPIER_ACTION.ERROR,
        payload: error.response,
      });
      if (onError) onError(error.response);
    },
  });
};

export const DELETE_WORKFLOW_TRANSITION_ZAPIER_ACTION = actionCreator('DELETE_WORKFLOW_TRANSITION_ZAPIER_ACTION');
export const deleteWorkflowTransitionZapierAction = ({ flowId, transitionId, onSuccess, onError }) => async (dispatch) => {
  actionTryCatchCreator({
    service: deleteWorkflowTransitionZapierService({ flowId, transitionId }),
    onPending: () =>
      dispatch({
        type: DELETE_WORKFLOW_TRANSITION_ZAPIER_ACTION.PENDING,
      }),
    onSuccess: (data) => {
      dispatch({
        type: DELETE_WORKFLOW_TRANSITION_ZAPIER_ACTION.SUCCESS,
        payload: data,
      });
      if (onSuccess) onSuccess(data);
      dispatch(getWorkflowDetailAction(flowId));
    },
    onError: (error) => {
      dispatch({
        type: DELETE_WORKFLOW_TRANSITION_ZAPIER_ACTION.ERROR,
        payload: error.response,
      });
      if (onError) onError(error.response);
    },
  });
};
