import { actionCreator, actionTryCatchCreator } from 'utils';

import { getAllArtistsService } from 'services/artist';

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
    service: getAllArtistsService(params),
    onPending,
    onSuccess,
    onError,
  });
};
