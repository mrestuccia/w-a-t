import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOCATION_SUCCESS, NEARBY_SUCCESS } from '../../actions/userActionTypes.js';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, action.user);
    case LOGOUT_SUCCESS:
      return {};
    case LOCATION_SUCCESS:
      return Object.assign({}, state, { lat: action.coordinates.lat, long: action.coordinates.long });
    case NEARBY_SUCCESS:
      return Object.assign({}, state, { nearby: action.nearby });
    default:
      return state;
  }
};


export default userReducer;
