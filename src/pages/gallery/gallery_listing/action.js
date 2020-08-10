import { actionTryCatchCreator } from 'utils';
import { getArtworkService, addArtworkService } from 'services/artwork';
import { getAllTagsService } from 'services/tag';
import { initialState, ACTIONS, GET_TAGS, GET_ARTWORK, ADD_ARTWORK } from './const';

export const updateFilterAction = (payload = initialState.filterData) => (dispatch) => {
  dispatch({ type: ACTIONS.UPDATE_FILTER_ACTION, payload });
};

export const getAllTagsAction = () => (dispatch, getState) => {
  const onPending = () => {
    dispatch({ type: GET_TAGS.PENDING });
  };
  const onSuccess = (payload) => {
    dispatch({ type: GET_TAGS.SUCCESS, payload });
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

export const addArtworksAction = (data, callback) => (dispatch) => {
  const onPending = () => {
    dispatch({ type: ADD_ARTWORK.PENDING });
  };
  const onSuccess = (data, headers) => {
    callback && callback();
    dispatch({ type: ADD_ARTWORK.SUCCESS, payload: { data, headers } });
  };
  const onError = (error) => {
    dispatch({ type: ADD_ARTWORK.ERROR, payload: error.response });
  };
  actionTryCatchCreator({
    service: addArtworkService(data),
    onPending,
    onSuccess,
    onError,
  });
};
