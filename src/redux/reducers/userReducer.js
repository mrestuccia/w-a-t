import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../../actions/userActionTypes.js';

const userReducer = (state={}, action)=> {
  switch(action.type){
    case LOGIN_SUCCESS:
      return Object.assign({}, state, action.user); 
      break;
    case LOGOUT_SUCCESS:
      return state; 
      break;
    default:
      return state;
  }
};


export default userReducer;
