
import axios from 'axios';

// Action Constants
const LOAD_FRIENDS_SUCCESS = 'LOAD_FRIENDS_SUCCESS';
const SELECT_FRIEND_SUCCESS = 'SELECT_FRIEND_SUCCESS';

// Action Creator
const loadFriendsSuccess = (friends)=> ({
  type: LOAD_FRIENDS_SUCCESS,
  friends: friends
});

const selectFriendSuccess = (friend) => ({
	type: SELECT_FRIEND_SUCCESS,
	friend: friend
})

// Axios Call
const loadFriends = (gId)=> {
  // console.log('loadfried', gId)
  return (dispatch)=> {
    return axios.get(`/api/group/${gId}`)
      .then(response => {
        // console.log('friendlist', response.data)
        return dispatch(loadFriendsSuccess(response.data));
      })
  };
};

const selectFriend = (gId, uId)=> {
	return (dispatch) => {
		return axios.get(`/api/group/${gId}/${uId}`)
		.then( response => dispatch(selectFriendSuccess(response.data)))
	}
}


// Reducer
const friendReducer = (state=[], action)=> {
  switch(action.type){
    case LOAD_FRIENDS_SUCCESS:
      state = action.friends;
      break;
    case SELECT_FRIEND_SUCCESS:
    	state = action.friend  
  }

  return state;
};


export {
  loadFriends, selectFriend
};


export default friendReducer;




