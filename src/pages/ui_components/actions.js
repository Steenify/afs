import { actionCreator, actionTryCatchCreator, isMobile } from 'utils';

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
  fetch('ui-component-mapping.json')
    .then((r) => r.json())
    .then((data) => {
      console.log('data', data);
    });
  return;
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
    dispatch({
      type: GET_COMPONENTS_ACTION.SUCCESS,
      payload: { data, headers },
    });
  };
  const onError = (error) => {
    console.log('getProductsAction => onError =>', JSON.stringify(error));
    dispatch({
      type: GET_COMPONENTS_ACTION.ERROR,
      payload: error.response,
    });
  };

  // actionTryCatchCreator({
  //   service: getProductsService(searchParams),
  //   onPending,
  //   onSuccess,
  //   onError,
  // });
};

export const UPDATE_COMPONENT_FILTERS_ACTION = 'UPDATE_COMPONENT_FILTERS_ACTION';
export const updateComponentFiltersAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_COMPONENT_FILTERS_ACTION,
    payload,
  });
  dispatch(getComponentsAction());
};
