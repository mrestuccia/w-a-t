import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLocation } from '../actions/loginActions';

import SimpleMap from './SimpleMap';
import GroupSelector from './Group/Group.js';
import FriendList from './Friends';
import Notifications from './Notifications';


class Home extends Component {
  constructor(props) {
    super(props);
     // center: { lat: 40.7253, lng: -73.9955 }
    this.state={
      center: { lat: 40.7253, lng: -73.9955 },
      zoom: 12,
      lat: 40.7253, 
      lng: -73.9955,
      showList: true,
      mapHeight: '50%',
    }

    this.changeValue = this.changeValue.bind(this);
    this.handleList = this.handleList.bind(this); 
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

  handleList(){
    this.setState({showList: !this.state.showList});
    this.state.showList == true? 
    this.setState({mapHeight: '82%'})  : 
    this.setState({mapHeight: '50%'}); 
    updateLocation();
  }  

  render() {
    const {updateLocation} = this.props;
    return (
      <div id="myApp">
        <SimpleMap updateLocation={updateLocation} lat={this.state.lat} lng={this.state.lng} center={this.state.center} zoom={this.state.zoom} mapHeight={this.state.mapHeight}/>
        <GroupSelector handleList={this.handleList} showList={this.state.showList} />
        <FriendList lat={this.state.lat} lng={this.state.lng} changeValue={this.changeValue} />
        <Notifications />
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

//<FriendList lat={this.state.lat} lng={this.state.lng} changeValue={this.changeValue} />