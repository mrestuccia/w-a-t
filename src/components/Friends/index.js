import React from 'react';
import { connect } from 'react-redux';
import { loadGroups } from '../../redux/reducers/groupReducer';
import { loadFriends } from '../../redux/reducers/friendReducer';

const friendList = ({friends, group}) =>(
	<div>
		<h5>Friend List</h5>
		<div className='w3-container' style={{margin:'auto'}}>
          <div className='w3-cell-row'>
            <table id="FriendsModal" className="table table-hover table-condensed" style={{maxWidth:'300px'}}>
              <thead>
                <tr>
                  <th style={{width:"35%"}}>Name</th>
                  <th style={{width:"45%"}}>Location</th>
                  <th style={{width:"10%"}}></th>
                </tr>
              </thead>
              <tbody style={{margin:'auto'}}>
                <tr>
                  <td data-th="Name">
                    <div className='row'>
                      <h4>Prof</h4>
                      {
							friends.map( friend => {
								return ( <h4 key={friend.id}> {friend.user.name}</h4> )
							})
				      }	
                    </div>
                  </td>
                  <td data-th="Location">
                    <div className='row'>
                      <h4>FSA</h4>
                      {
							friends.map( friend => {
								return ( <h4 key={friend.id}> lat: {friend.user.lat} long: {friend.user.long}</h4> )
							})
				      }	
                    </div>
                  </td>
                  <td data-th="">
                    <div className='row'>
                      <button className="glyphicon glyphicon-screenshot"></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

	</div>
	)


const mapDispatchToProps = (dispatch) => (
  {
   loadFriends: (gId) => dispatch(loadFriends(gId))
  }
);

const mapStateToProps = (state) => (
  {
    friends: state.friends
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(friendList);

