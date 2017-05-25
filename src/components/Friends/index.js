import React from 'react';
import { connect } from 'react-redux';
//import { loadGroups } from '../../redux/reducers/groupReducer';

const friendList = ({friends, group}) =>(
	<div>
		<h5>Friend List</h5>
		<ul className='list-group'>
		{
			friends.map( friend => {
				return ( <li key={friend.id}> {friend.user.name}</li> )
			})
		}	
		</ul>
	</div>
	)


const mapDispatchToProps = (dispatch) => (
  {
    loadFriends: () => dispatch(loadFriends(1))
  }
);

const mapStateToProps = (state) => (
  {
    friends: state.friends
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(friendList);




