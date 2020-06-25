import { actionCreator, actionTryCatchCreator } from 'utils';

import {
  getAllArtistsService,
  getArtistService,
  updateArtistService,
} from 'services/artist';

export const ARTISTS_ACTIONS = {
  UPDATE_ARTIST_DETAIL: 'UPDATE_ARTIST_DETAIL',
};

export const updateArtistDetailAction = (payload) => (dispatch) => {
  dispatch({
    type: ARTISTS_ACTIONS.UPDATE_ARTIST_DETAIL,
    payload,
  });
};

export const GET_ARTISTS_LIST_ACTION = actionCreator('GET_ARTISTS_LIST_ACTION');
export const getArtistsListAction = (params = {}) => async (dispatch) => {
  const onPending = () => {
    dispatch({
      type: GET_ARTISTS_LIST_ACTION.PENDING,
    });
  };
  const onSuccess = (data, headers) => {
    console.log('onSuccess -> data', data);
    dispatch({
      type: GET_ARTISTS_LIST_ACTION.SUCCESS,
      payload: { data, headers },
    });
  };
  const onError = (error) => {
    dispatch({
      type: GET_ARTISTS_LIST_ACTION.ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getAllArtistsService(params),
    onPending,
    onSuccess,
    onError,
  });
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
    console.log('GET_ARTISTS_ACTION -> error', error);
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
    console.log('updateArtistDetailApiAction -> error', error);
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
