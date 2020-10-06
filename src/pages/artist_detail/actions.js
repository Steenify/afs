import { actionCreator, actionTryCatchCreator } from 'utils';

import { getArtistService, updateArtistService } from 'services/artist';

export const GET_ARTIST_DETAIL_ACTION = actionCreator('GET_ARTIST_DETAIL_ACTION');
export const getArtistDetailAction = (login) => async (dispatch) => {
  actionTryCatchCreator({
    service: getArtistService(login),
    onPending: () =>
      dispatch({
        type: GET_ARTIST_DETAIL_ACTION.PENDING,
      }),
    onSuccess: (data) => {
      dispatch({
        type: GET_ARTIST_DETAIL_ACTION.SUCCESS,
        payload: data,
      });
    },
    onError: (error) => {
      dispatch({
        type: GET_ARTIST_DETAIL_ACTION.ERROR,
        payload: error.response,
      });
      console.log('getArtistDetailAction -> error', JSON.stringify(error));
    },
  });
};

export const UPDATE_ARTIST_DETAIL_ACTION = actionCreator('UPDATE_ARTIST_DETAIL_ACTION');
export const updateArtistDetailAction = (values, onSuccess, onError) => (dispatch) => {
  const payload = {
    artistExtension: {
      fbUrl: values?.fbUrl,
      igUrl: values?.igUrl,
      note: values?.note,
      uid: values?.uid,
      productQualityScore: values?.productQualityScore,
      workingSpeedScore: values?.workingSpeedScore,
      workingAttitudeScore: values?.workingAttitudeScore,
      paymentInfo: values?.paymentInfo,
      country: values?.country,
      countryCode: values?.countryCode,
    },
    login: values?.login,
    email: values?.email,
    firstName: values?.firstName,
    lastName: values?.lastName,
    phoneNumber: values?.phoneNumber,
    phonePrefix: values?.phonePrefix,
    id: values?.id,
    activated: values?.activated,
  };

  actionTryCatchCreator({
    service: updateArtistService(payload),
    onPending: () => dispatch({ type: UPDATE_ARTIST_DETAIL_ACTION.PENDING }),
    onSuccess: (data) => {
      dispatch({
        type: UPDATE_ARTIST_DETAIL_ACTION.SUCCESS,
        payload: data,
      });
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      console.log('updateArtistDetailAction -> error', JSON.stringify(error));
      dispatch({
        type: UPDATE_ARTIST_DETAIL_ACTION.ERROR,
        payload: error.response,
      });
    },
  });
};
