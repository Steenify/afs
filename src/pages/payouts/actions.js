import { actionCreator, actionTryCatchCreator } from 'utils';

import { getAllArtistsService } from 'services/artist';

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
