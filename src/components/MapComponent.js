import React, { PropTypes } from "react";
import GoogleMap from "react-google-map";
import GoogleMapLoader from "react-google-maps-loader";
import { connect } from 'react-redux';

// const Marker = ({ text, icon, handleMarkerClick }) => {
//   return (
//     <div onClick={handleMarkerClick}>
//       {icon}{text}
//     </div>
//   );
// };

const MY_API_KEY = "AIzaSyCm7cpxb4mIzz8XSO9TYBX9yAf0ze36TnQ";

class Map extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        center: { lat: 40.7253, lng: -73.9955 },
        zoom: 3,
        bounds: new google.maps.LatLngBounds()
    };
        this.startPolling = this.startPolling.bind(this);
        this.handleMarkerClick = this.handleMarkerClick.bind(this);   
  }

  componentDidMount() {
        this.startPolling();
    }

    componentWillUnmount() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }

    /* Map related Events */
    handleMarkerClick(lat, lng) {
        this.setState({
            center: { lat: lat, lng: lng },
            zoom: 16,
        });
    }

    // Initial polling function
    startPolling() {
        var self = this;
        setTimeout(function () {
            self.poll();
            self._timer = setInterval(self.poll.bind(self), 60000);
        }, 1000);
    }

    // Get browser position. Need user approval
    getPosition() {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    // Create an object compatible with our store.
    showPosition(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        return { lat: lat, long: long };
    }

    // Function that is repeated sending the position to the store
    poll() {
        const { updateLocation } = this.props;
        this.getPosition()
            .then((coordinates) => updateLocation(this.showPosition(coordinates)));
    }
 
  render() {
    const {googleMaps, friends} = this.props;
      if (friends[0] == undefined) {
          return null;
      } else {
        var groupCoordinates = []
          friends.map(friend => {
            console.log(friend)
              var latlng = new google.maps.LatLng(friend.user.lat, friend.user.long)
              this.state.bounds.extend(latlng)

              groupCoordinates.push({
                title: friend.user.name,
                position: {
                  lat: friend.user.lat,
                  lng: friend.user.long
                },
                icon: {
                  xmlns: "http://www.w3.org/2000/svg", 
                  width: "24", 
                  height: "24", 
                  viewBox: "0 0 24 24",
                  path: "M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"
                  },
                  onLoaded: (googleMaps, map, marker) => {
                    googleMaps.event.addListener(marker, 'click', () => {
                      this.handleMarkerClick(marker.position.lat(), marker.position.lng())
                    })
                  }
                  
              })
          })
          console.log(groupCoordinates)
          var myCenter = this.state.bounds.getCenter();
          var correctCenter = {lat: myCenter.lat(), lng: myCenter.lng()}
          this.state.center = correctCenter


    return (
      <div style={{ width: '100%', height: '50%' }}>
        <GoogleMap
          googleMaps={googleMaps}
          coordinates = {groupCoordinates}
          center={correctCenter}
          zoom={12}
          autoFitBounds={true}
          onLoaded={(googleMaps, map) => {
            map.setMapTypeId(googleMaps.MapTypeId.ROADMAP)
          } }
          />
      </div>
    );
  }
}

}
Map.propTypes = {
  googleMaps: PropTypes.object.isRequired,
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadFriends: (gId) => dispatch(loadFriends(gId))
  };
};

const mapStateToProps = (store) => {
  return {
    friends: store.friends,
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMapLoader(Map, {
  key: MY_API_KEY,
}))