import axios from 'axios';

// Action Constants
const LOAD_FRIENDS_SUCCESS = 'LOAD_FRIENDS_SUCCESS';
const SELECT_FRIEND_SUCCESS = 'SELECT_FRIEND_SUCCESS';
const ADD_FRIEND_SUCCESS = 'ADD_FRIEND_SUCCESS';

// Action Creator
const loadFriendsSuccess = (friends) => ({
  type: LOAD_FRIENDS_SUCCESS,
  friends: friends
});

const selectFriendSuccess = (friend) => ({
  type: SELECT_FRIEND_SUCCESS,
  friend: friend
});

const addFriendSuccess = (friend) => ({
  type: ADD_FRIEND_SUCCESS,
  friend: friend
});


// Axios Call
const loadFriends = (gId) => {
  return (dispatch) => {
    return axios.get(`/api/group/${gId}`)
      .then(response => {
        return dispatch(loadFriendsSuccess(response.data));
      });
  };
};

const selectFriend = (gId, uId) => {
  return (dispatch) => {
    return axios.get(`/api/group/${gId}/${uId}`)
      .then(response => dispatch(selectFriendSuccess(response.data)));
  };
};

const addFriend = (gId, state) => {
  return (dispatch) => {
    console.log('addFriend', gId, state);
    return axios.post(`/api/userGroup/${gId}`, state )
      .then(response => {
        dispatch(addFriendSuccess(response.data));
      })
      .catch(err => console.log('Error addFriend: ', err));
  };
};

const deleteFriend = (groupId, userId, state) => {
  return (dispatch) => {
    return axios.delete(`/api/group/${groupId}/${userId}`, state)
      .then(() => {
      dispatch(loadFriends(groupId));
    })
    .catch(err => console.log('Error deleteGroup:', err)) ;
  };
};


// Reducer
const friendReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_FRIENDS_SUCCESS:
      return action.friends;
    case SELECT_FRIEND_SUCCESS:
      return action.friend;
    case ADD_FRIEND_SUCCESS:
      return [...state, action.friend];
    default:
      return state;
  }
};


export {
  loadFriends, selectFriend, addFriend, deleteFriend
};


export default friendReducer;
