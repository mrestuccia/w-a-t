import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { loadFriends } from '../redux/reducers/friendReducer';




const Marker = ({ text, icon, handleMarkerClick }) => {
    return (
        <div onClick={handleMarkerClick}>
            {icon}{text}
        </div>
    );
};

class SimpleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: { lat: 40.7253, lng: -73.9955 },
            zoom: 12
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
        const { friends, updateLocation } = this.props;
        this.getPosition()
            .then((coordinates) => updateLocation(this.showPosition(coordinates), friends[0].groupId));
    }


    render() {
        const { friends } = this.props;
        if (friends[0] === undefined) {
            return null;
        } else {
            return (
                <div style={{ width: '100%', height: '50%' }}>
                    <GoogleMapReact
                        center={this.state.center}
                        zoom={this.state.zoom}>
                        {
                            friends.map(friend => {
                                return (
                                    <Marker
                                        mini={true}
                                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z" /></svg>}
                                        text={friend.user.name}
                                        key={friend.user.id}
                                        lat={friend.user.lat}
                                        lng={friend.user.long}
                                        handleMarkerClick={() => this.handleMarkerClick(friend.user.lat, friend.user.long)}
                                    />
                                )
                            }
                            )
                        }
                    </GoogleMapReact>
                </div>
            );
        }
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        loadFriends: (gId) => dispatch(loadFriends(gId))
    };
};

const mapStateToProps = (store) => {
    return {
        friends: store.friends
    };

}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleMap);