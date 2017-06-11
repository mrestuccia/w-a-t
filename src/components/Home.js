import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLocation } from '../actions/loginActions';

import SimpleMap from './SimpleMap';
import GroupSelector from './Group/Group.js';
import FriendList from './Friends';

import MapComponent from './MapComponent';
import Map from './MapComponent';


class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { updateLocation } = this.props;
    return (
      <div id="myApp">
        <Map updateLocation={updateLocation}/>
        <GroupSelector />
        <FriendList />
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    updateLocation: (coordinates) => dispatch(updateLocation(coordinates)),
  };
};


const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);