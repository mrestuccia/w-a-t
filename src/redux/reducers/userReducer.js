import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOCATION_SUCCESS } from '../../actions/userActionTypes.js';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, action.user);
    case LOGOUT_SUCCESS:
      return {};
    case LOCATION_SUCCESS:
      console.log('LOCATION_SUCCESS', action);
      return Object.assign({}, state, { lat: action.coordinates.lat, long: action.coordinates.long });
    default:
      return state;
  }
};


export default userReducer;
