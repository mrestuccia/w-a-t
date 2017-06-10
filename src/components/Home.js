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
    const { updateLocation } = this.props;
    return (
      <div id="myApp">
        <SimpleMap updateLocation={updateLocation} />
        <GroupSelector />
        <FriendList />
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    updateLocation: (coordinates, groupId) => dispatch(updateLocation(coordinates, groupId)),
  };
};


const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

