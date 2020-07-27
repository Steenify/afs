import { combineReducers } from 'redux';
import listing from './gallery_listing/reducer';
import detail from './gallery_detail/reducer';

export default combineReducers({
  listing,
  detail,
});
