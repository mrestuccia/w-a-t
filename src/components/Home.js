import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLocation } from '../actions/loginActions';

import Map from './Map';
import GroupSelector from './Group/Group.js';
import FriendList from './Friends';
import SimpleMap from './SimpleMap';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { user, updateLocation } = this.props;
    return (
      <div id='myApp'>
          <SimpleMap updateLocation = {updateLocation} />
          <GroupSelector />
          <FriendList />
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    updateLocation: (coordinates) => dispatch(updateLocation(coordinates)),
  };
};


const mapStateToProps = (store) => {
  return {
    user: store.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

