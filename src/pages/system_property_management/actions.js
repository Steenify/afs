import { actionCreator } from 'utils';
import {
  getAllSystemProperties,
  getSystemProperty,
  updateSystemProperty,
} from 'services/systemProperties.service';

export const GET_SYSTEM_PROPERTIES = actionCreator('GET_SYSTEM_PROPERTIES');
export const actGetAllSystemProperties = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SYSTEM_PROPERTIES.PENDING,
    });

    const res = await getAllSystemProperties();
    dispatch({
      type: GET_SYSTEM_PROPERTIES.SUCCESS,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: GET_SYSTEM_PROPERTIES.ERROR,
      payload: e.response,
    });
  }
};

export const GET_SYSTEM_PROPPERTY = actionCreator('GET_SYSTEM_PROPPERTY');
export const actGetSystemProperty = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SYSTEM_PROPPERTY.PENDING,
    });

    const res = await getSystemProperty(id);

    dispatch({
      type: GET_SYSTEM_PROPPERTY.SUCCESS,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: GET_SYSTEM_PROPPERTY.ERROR,
      payload: e.response,
    });
  }
};

export const UPDATE_SYSTEM_PROPPERTY = actionCreator('UPDATE_SYSTEM_PROPPERTY');
export const actUpdateSystemProperty = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_SYSTEM_PROPPERTY.PENDING,
    });

    const res = await updateSystemProperty(data);

    dispatch({
      type: UPDATE_SYSTEM_PROPPERTY.SUCCESS,
      payload: res,
    });

    return res;
  } catch (e) {
    dispatch({
      type: UPDATE_SYSTEM_PROPPERTY.ERROR,
      payload: e.response,
    });

    return e.response;
  }
};
