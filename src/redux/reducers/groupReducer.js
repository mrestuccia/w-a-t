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
    return axios.post(`/api/group/${userId}`, state )
      .then(() => {
        dispatch(loadGroups(userId));
      })
      .catch(err => console.log('Error addGroup: ', err));
  };
};

//Delete Group Reducer

const deleteGroup = (groupId, userId, state) => {
  return (dispatch) => {
    return axios.delete(`/api/group/${groupId}/${userId}`, state)
      .then(() => {
      dispatch(loadGroups(userId));
    })
    .catch(err => console.log('Error deleteGroup:', err)) ;
  };
};

// Edit Group Reducer
const editGroup = (groupId, userId, state) => {
  return (dispatch) => {
    return axios.put(`/api/group/${groupId}/${userId}`, state)
    .then(() => {
      dispatch(loadGroups(userId));
    })
    .catch(err => console.log('Error editGroup:', err)) ;
  };
};


export {
  loadGroups, addGroup, deleteGroup, editGroup
};


export default groupReducer;
