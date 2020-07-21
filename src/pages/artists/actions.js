import { actionCreator, actionTryCatchCreator, isMobile } from 'utils';

import {
  getAllArtistsService,
  getArtistService,
  updateArtistService,
} from 'services/artist';

export const ARTISTS_ACTIONS = {
  UPDATE_ARTIST_DETAIL: 'UPDATE_ARTIST_DETAIL',
  UPDATE_ARTIST_FILTERS_ACTION: 'UPDATE_ARTIST_FILTERS_ACTION',
  UPDATE_ARTIST_ITEMS_ACTION: 'UPDATE_ARTIST_ITEMS_ACTION',
  UPDATE_ALL_ARTIST_ITEMS_ACTION: 'UPDATE_ALL_ARTIST_ITEMS_ACTION',
};

export const updateArtistFilterAction = (payload) => (dispatch) => {
  dispatch({
    type: ARTISTS_ACTIONS.UPDATE_ARTIST_FILTERS_ACTION,
    payload,
  });
};

export const updateArtistItemsAction = (payload) => (dispatch) => {
  dispatch({
    type: ARTISTS_ACTIONS.UPDATE_ARTIST_ITEMS_ACTION,
    payload,
  });
};

export const updateAllArtistSelectedAction = (payload) => (dispatch) => {
  dispatch({
    type: ARTISTS_ACTIONS.UPDATE_ALL_ARTIST_ITEMS_ACTION,
    payload,
  });
};

export const GET_ARTISTS_LIST_ACTION = actionCreator('GET_ARTISTS_LIST_ACTION');
export const getArtistsListAction = (params = {}) => async (
  dispatch,
  getState,
) => {
  const { filter } = getState().artists;

  const currSize = isMobile() ? filter.sizeMobile : filter.size;

  const searchParams = buildSearchParamPayouts({
    ...filter,
    ...params,
    size: currSize,
  });

  const onPending = () => {
    dispatch({
      type: GET_ARTISTS_LIST_ACTION.PENDING,
    });
  };
  const onSuccess = (data, headers) => {
    dispatch({
      type: GET_ARTISTS_LIST_ACTION.SUCCESS,
      payload: { data, headers },
    });
  };
  const onError = (error) => {
    console.log(
      'getArtistsListAction => onError -> error',
      JSON.stringify(error),
    );
    dispatch({
      type: GET_ARTISTS_LIST_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getAllArtistsService(searchParams),
    onPending,
    onSuccess,
    onError,
  });
};

const buildSearchParamPayouts = (input = {}) => {
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

export const GET_ARTISTS_ACTION = actionCreator('GET_ARTISTS_ACTION');
export const getArtistAction = (login) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_ARTISTS_ACTION.PENDING,
    });
  };
  const onSuccess = (data, headers) => {
    dispatch({
      type: GET_ARTISTS_ACTION.SUCCESS,
      payload: { data, headers },
    });
  };
  const onError = (error) => {
    console.log('getArtistAction => onError -> error', JSON.stringify(error));
    dispatch({
      type: GET_ARTISTS_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getArtistService(login),
    onPending,
    onSuccess,
    onError,
  });
};

export const UPDATE_ARTISTS_API_ACTION = actionCreator(
  'UPDATE_ARTISTS_API_ACTION',
);
export const updateArtistDetailApiAction = (payload, cb) => (dispatch) => {
  const onPending = () => {
    dispatch({
      type: UPDATE_ARTISTS_API_ACTION.PENDING,
    });
  };
  const onSuccess = (data) => {
    dispatch({
      type: UPDATE_ARTISTS_API_ACTION.SUCCESS,
      payload: { data },
    });

    cb && cb();
  };
  const onError = (error) => {
    console.log(
      'updateArtistDetailApiAction => onError -> error',
      JSON.stringify(error),
    );
    dispatch({
      type: UPDATE_ARTISTS_API_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: updateArtistService(payload),
    onPending,
    onSuccess,
    onError,
  });
};

export const updateArtistDetailAction = (payload) => (dispatch) => {
  dispatch({
    type: ARTISTS_ACTIONS.UPDATE_ARTIST_DETAIL,
    payload,
  });
};
