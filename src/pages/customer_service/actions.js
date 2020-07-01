import { actionCreator, actionTryCatchCreator } from 'utils';

import { getAllArtistsService } from 'services/artist';

export const ARTISTS_ACTIONS = {};

export const GET_ARTISTS_LIST_ACTION = actionCreator('GET_ARTISTS_LIST_ACTION');
export const getArtistsListAction = (params = {}) => async (dispatch) => {
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
    console.log('GET_ARTISTS_LIST_ACTION -> error', error);
    dispatch({
      type: GET_ARTISTS_LIST_ACTION.ERROR,
      payload: error.response,
    });
  };

  await actionTryCatchCreator({
    service: getAllArtistsService(params),
    onPending,
    onSuccess,
    onError,
  });
};
