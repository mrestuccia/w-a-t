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
     // center: { lat: 40.7253, lng: -73.9955 }
    this.state={
      center: { lat: 40.7253, lng: -73.9955 },
      zoom: 12,
      lat: 40.7253, 
      lng: -73.9955
    }

    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(lat, lng, zoom){
    this.setState({center:{lat: lat, lng: lng}, zoom:16})
  }

  handleMarkerClick(lat, lng) {
        this.setState({
            center: { lat: lat, lng: lng },
            zoom: 16,
        });
    }

  render() {
    const { updateLocation } = this.props;
    return (
      <div id="myApp">
        <Map updateLocation={updateLocation}/>
        <SimpleMap updateLocation={updateLocation} lat={this.state.lat} lng={this.state.lng} center={this.state.center} zoom={this.state.zoom}/>
        <GroupSelector />
        <FriendList lat={this.state.lat} lng={this.state.lng}changeValue={this.changeValue}/>
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