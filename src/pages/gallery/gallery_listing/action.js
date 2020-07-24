import { actionCreator, actionTryCatchCreator, isMobile } from 'utils';
import { getArtworkService } from 'services/artwork';
import { getAllTagsService } from 'services/tag';

export const GET_TAGS = actionCreator('GALLERY_GET_TAG');
export const getAllTagsAction = () => (dispatch) => {
  const onPending = () => {
    dispatch({ type: GET_TAGS.PENDING });
  };
  const onSuccess = (data) => {
    console.log('onSuccess -> data', data);
    dispatch({ type: GET_TAGS.SUCCESS });
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
  const onSuccess = (data) => {
    console.log('onSuccess -> data', data);
    dispatch({ type: GET_ARTWORK.SUCCESS });
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
