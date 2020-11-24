import { actionCreator, actionTryCatchCreator, isMobile } from 'utils';

import { getWorkflowListService, createWorkflowService } from 'services/workflow.service';

const buildSearchParams = (input = {}) => {
  var params = new URLSearchParams();
  params.append('text', input.text || '');
  params.append('page', input.page || 0);
  params.append('size', (input.size && parseInt(input.size)) || 100);

  if (input.sort && input.sort.length) {
    input.sort.forEach((item) => {
      const textSort = item.id + ',' + (item.desc ? 'desc' : 'asc');
      params.append('sort', textSort);
    });
  }

  return params;
};

export const GET_WORKFLOW_LIST_ACTION = actionCreator('GET_WORKFLOW_LIST_ACTION');
export const getWorkflowListAction = (params = {}) => async (dispatch, getState) => {
  const { filter } = getState().workflows;

  const currSize = isMobile() ? filter.sizeMobile : filter.size;

  const searchParams = buildSearchParams({
    ...filter,
    ...params,
    size: currSize,
  });

  const onPending = () => {
    dispatch({
      type: GET_WORKFLOW_LIST_ACTION.PENDING,
    });
  };
  const onSuccess = (data, headers) => {
    dispatch({
      type: GET_WORKFLOW_LIST_ACTION.SUCCESS,
      payload: { data, headers },
    });
  };
  const onError = (error) => {
    console.log('getWorkflowListAction => onError =>', JSON.stringify(error));
    dispatch({
      type: GET_WORKFLOW_LIST_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getWorkflowListService(searchParams),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_WORKFLOW_FILTERS_ACTION = 'UPDATE_WORKFLOW_FILTERS_ACTION';
export const updateWorkflowFiltersAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_WORKFLOW_FILTERS_ACTION,
    payload,
  });
  dispatch(getWorkflowListAction());
};

export const CREATE_WORKFLOW_ACTION = actionCreator('CREATE_WORKFLOW_ACTION');
export const createWorkflowAction = (data, onSuccess) => async (dispatch) => {
  await actionTryCatchCreator({
    service: createWorkflowService(data),
    onPending: () => {
      dispatch({
        type: CREATE_WORKFLOW_ACTION.PENDING,
      });
    },
    onSuccess: (data) => {
      dispatch({
        type: CREATE_WORKFLOW_ACTION.SUCCESS,
        payload: data,
      });
      onSuccess && onSuccess(data);
    },
    onError: (error) => {
      console.log('createWorkflowAction => onError =>', JSON.stringify(error));
      dispatch({
        type: CREATE_WORKFLOW_ACTION.ERROR,
        payload: error.response,
      });
    },
  });
};
