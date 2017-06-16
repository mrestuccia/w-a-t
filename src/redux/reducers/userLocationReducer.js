import axios from 'axios';

// Action Constants
const USER_LOCATION_SUCCESS= 'USER_LOCATION_SUCCESS';


// Action Creator
const addUserLocationSuccess = (userlocation) => ({
  type: USER_LOCATION_SUCCESS,
  userlocation: userlocation
});


//Add User Location Axios Call

const addUserLocation = (userId, state) => {
  return (dispatch) => { 
    return axios.post(`/api/userlocation/${userId}`, state )
      .then(response => {
        dispatch(addUserLocationSuccess(response.data))
      })
      .catch(err => console.log('Error add User Location ', err));
  };
};

const addUserLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOCATION_SUCCESS:
      return Object.assign({}, state, action.userlocation);
    default:
      return state;
  }
};

export {addUserLocation} ;
export default addUserLocationReducer ;