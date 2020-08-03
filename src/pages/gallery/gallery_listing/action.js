import { actionCreator, actionTryCatchCreator, isMobile } from 'utils';
import { getArtworkService } from 'services/artwork';
import { getAllTagsService } from 'services/tag';
import { initialState } from './reducer';

export const ACTIONS = {
  UPDATE_FILTER_ACTION: 'GALLERY_UPDATE_FILTER_ACTION',
};

export const updateFilterAction = (payload = initialState.filterData) => (dispatch) => {
  dispatch({ type: ACTIONS.UPDATE_FILTER_ACTION, payload });
};

export const GET_TAGS = actionCreator('GALLERY_GET_TAG');
export const getAllTagsAction = () => (dispatch, getState) => {
  const onPending = () => {
    dispatch({ type: GET_TAGS.PENDING });
  };
  const onSuccess = (payload) => {
    // console.log('onSuccess -> data', data);
    dispatch({ type: GET_TAGS.SUCCESS, payload: payload.map((item) => item?.name).filter((item) => item) });
  };
  const onError = (error) => {
    dispatch({ type: GET_TAGS.ERROR, payload: error.response });
  };
  actionTryCatchCreator({
    service: getAllTagsService(),
    onPending,
    onSuccess,
    onError,
  });
};

export const GET_ARTWORK = actionCreator('GALLERY_GET_ARTWORK');
export const getArtworksAction = (param) => (dispatch) => {
  const onPending = () => {
    dispatch({ type: GET_ARTWORK.PENDING });
  };
  const onSuccess = (data, headers) => {
    dispatch({ type: GET_ARTWORK.SUCCESS, payload: { data, headers } });
  };
  const onError = (error) => {
    dispatch({ type: GET_ARTWORK.ERROR, payload: error.response });
  };
  actionTryCatchCreator({
    service: getArtworkService(param),
    onPending,
    onSuccess,
    onError,
  });
};
