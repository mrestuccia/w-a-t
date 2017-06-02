import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLocation } from '../actions/loginActions';


import SimpleMap from './SimpleMap';

import GroupSelector from './Group/Group.js';
import FriendList from './Friends';




class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { user, friends, updateLocation, addFriend } = this.props;
    return (
      <div id='myApp'>
          <SimpleMap updateLocation = {updateLocation} />
          <GroupSelector friends={friends} addFriend={ addFriend } />
          <FriendList />
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    updateLocation: (coordinates) => dispatch(updateLocation(coordinates)),
    addFriend: (gId, state) =>  {
      console.log('home addFriend: ', gId, state);
      return dispatch(addFriend(gId, state));
    }
  };
};


const mapStateToProps = (store) => {
  return {
    user: store.user,
    friends: store.friends
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

