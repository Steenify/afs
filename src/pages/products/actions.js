import { getProductsService } from 'services/product';
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

export const GET_PRODUCTS_ACTION = actionCreator('GET_PRODUCTS_ACTION');
export const getProductsAction = (params = {}) => async (dispatch, getState) => {
  const { filter } = getState().products;

  const currSize = isMobile() ? filter.sizeMobile : filter.size;

  const searchParams = buildSearchParams({
    ...filter,
    ...params,
    size: currSize,
  });

  const onPending = () => {
    dispatch({
      type: GET_PRODUCTS_ACTION.PENDING,
    });
  };
  const onSuccess = (data, headers) => {
    dispatch({
      type: GET_PRODUCTS_ACTION.SUCCESS,
      payload: { data, headers },
    });
  };
  const onError = (error) => {
    console.log('getProductsAction => onError =>', JSON.stringify(error));
    dispatch({
      type: GET_PRODUCTS_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getProductsService(searchParams),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_PRODUCT_FILTERS_ACTION = 'UPDATE_PRODUCT_FILTERS_ACTION';
export const updateProductFiltersAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_PRODUCT_FILTERS_ACTION,
    payload,
  });
  dispatch(getProductsAction());
};

export const UPDATE_PRODUCT_ITEMS_ACTION = 'UPDATE_PRODUCT_ITEMS_ACTION';
export const updateProductItemsAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_PRODUCT_ITEMS_ACTION,
    payload,
  });
};

export const UPDATE_ALL_PRODUCT_ITEMS_ACTION = 'UPDATE_ALL_PRODUCT_ITEMS_ACTION';
export const updateAllProductSelectedAction = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_ALL_PRODUCT_ITEMS_ACTION,
    payload,
  });
};
