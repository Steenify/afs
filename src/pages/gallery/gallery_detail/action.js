import { getArtworkDetailService } from 'services/artwork';
import { actionCreator, actionTryCatchCreator } from 'utils';

export const GET_ARTWORK_DETAIL = actionCreator('GET_ARTWORK_DETAIL');
export const getArtworkDetailAction = (id) => (dispatch) => {
  const { PENDING, SUCCESS, ERROR } = GET_ARTWORK_DETAIL;

  const onPending = () => {
    dispatch({
      type: PENDING,
    });
  };

  const onSuccess = (payload) => {
    dispatch({
      type: SUCCESS,
      payload,
    });
  };

  const onError = (error) => {
    dispatch({
      type: ERROR,
      payload: error.response,
    });
  };

  actionTryCatchCreator({
    service: getArtworkDetailService(id),
    onPending,
    onSuccess,
    onError,
  });
};
