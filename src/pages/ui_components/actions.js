import { actionCreator, actionTryCatchCreator, isMobile } from 'utils';
import { getUIComponentService, createUIComponentService, updateUIComponentService, deleteUIComponentService } from 'services/ui-components.service';

const buildSearchParams = (input = {}) => {
  var params = new URLSearchParams();
  params.append('s', input.text || '');
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

export const GET_COMPONENTS_ACTION = actionCreator('GET_COMPONENTS_ACTION');
export const getComponentsAction = (params = {}) => async (dispatch, getState) => {
  const { filter } = getState().uiComponents;

  const currSize = isMobile() ? filter.sizeMobile : filter.size;

  const searchParams = buildSearchParams({
    ...filter,
    ...params,
    size: currSize,
  });

  const onPending = () => {
    dispatch({
      type: GET_COMPONENTS_ACTION.PENDING,
    });
  };
  const onSuccess = (data, headers) => {
    const list = (data || []).map((item) => ({ ...item, value: item.id, label: item.name }));
    dispatch({
      type: GET_COMPONENTS_ACTION.SUCCESS,
      payload: { data: list, headers },
    });
  };
  const onError = (error) => {
    console.log('getProductsAction => onError =>', JSON.stringify(error));
    dispatch({
      type: GET_COMPONENTS_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getUIComponentService(searchParams),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_COMPONENT_FILTERS_ACTION = 'UPDATE_COMPONENT_FILTERS_ACTION';
export const updateComponentFiltersAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_COMPONENT_FILTERS_ACTION,
    payload,
  });
  dispatch(getComponentsAction());
};

export const CREATE_COMPONENT_ACTION = actionCreator('CREATE_COMPONENT_ACTION');
export const createComponentAction = (data, onSuccess) => async (dispatch) => {
  await actionTryCatchCreator({
    service: createUIComponentService(data),
    onPending: () => {
      dispatch({
        type: CREATE_COMPONENT_ACTION.PENDING,
      });
    },
    onSuccess: (data) => {
      dispatch({
        type: CREATE_COMPONENT_ACTION.SUCCESS,
        payload: data,
      });
      onSuccess && onSuccess(data);
      dispatch(getComponentsAction());
    },
    onError: (error) => {
      console.log('createWorkflowAction => onError =>', JSON.stringify(error));
      dispatch({
        type: CREATE_COMPONENT_ACTION.ERROR,
        payload: error.response,
      });
    },
  });
};

export const UPDATE_COMPONENT_ACTION = actionCreator('UPDATE_COMPONENT_ACTION');
export const updateComponentAction = (id, data, onSuccess) => async (dispatch) => {
  await actionTryCatchCreator({
    service: updateUIComponentService(id, data),
    onPending: () => {
      dispatch({
        type: UPDATE_COMPONENT_ACTION.PENDING,
      });
    },
    onSuccess: (data) => {
      dispatch({
        type: UPDATE_COMPONENT_ACTION.SUCCESS,
        payload: data,
      });
      onSuccess && onSuccess(data);
      dispatch(getComponentsAction());
    },
    onError: (error) => {
      console.log('updateComponentAction => onError =>', JSON.stringify(error));
      dispatch({
        type: UPDATE_COMPONENT_ACTION.ERROR,
        payload: error.response,
      });
    },
  });
};

export const DELETE_COMPONENT_ACTION = actionCreator('DELETE_COMPONENT_ACTION');
export const deleteComponentAction = (id, onSuccess) => async (dispatch) => {
  await actionTryCatchCreator({
    service: deleteUIComponentService(id),
    onPending: () => {
      dispatch({
        type: DELETE_COMPONENT_ACTION.PENDING,
      });
    },
    onSuccess: (data) => {
      dispatch({
        type: DELETE_COMPONENT_ACTION.SUCCESS,
        payload: data,
      });
      onSuccess && onSuccess(data);
      dispatch(getComponentsAction());
    },
    onError: (error) => {
      console.log('deleteComponentAction => onError =>', JSON.stringify(error));
      dispatch({
        type: DELETE_COMPONENT_ACTION.ERROR,
        payload: error.response,
      });
    },
  });
};
