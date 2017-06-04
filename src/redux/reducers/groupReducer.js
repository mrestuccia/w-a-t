import axios from 'axios';

// Action Constants
const LOAD_GROUP_SUCCESS = 'LOAD_GROUP_SUCCESS';

// Action Creator
const loadGroupsSuccess = (groups) => ({
  type: LOAD_GROUP_SUCCESS,
  groups: groups
});




// Axios Call
const loadGroups = (id) => {
  return (dispatch) => {
    return axios.get(`/api/user/${id}/groups`)
      .then(response => dispatch(loadGroupsSuccess(response.data)));
  };
};


// Reducer
const groupReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_GROUP_SUCCESS:
      return action.groups;
    default:
      return state;
  }
};

//Add Group Reducer

const addGroup = (userId, state) => {
  return (dispatch) => {
    console.log('addGroup', userId, state);
    return axios.post(`/api/group/${userId}`, state )
      .then(response => {
        dispatch(loadGroups(userId))
      })
      .catch(err => console.log('Error addGroup: ', err));
  };
};


export {
  loadGroups, addGroup
};


export default groupReducer;
