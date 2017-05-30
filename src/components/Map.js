import React from 'react';

class Map extends React.Component {
  constructor(props){
    super(props);
    this.startPolling = this.startPolling.bind(this);
    
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

  // Initial polling function
  startPolling() {
    var self = this;
    setTimeout(function() {
      self.poll();
      self._timer = setInterval(self.poll.bind(self), 15000);
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

      return {lat: lat, long: long };
  }

  // Function that is repeated sending the position to the store
  poll() {
    const {updateLocation} = this.props;
    this.getPosition()
     .then((coordinates) => updateLocation(this.showPosition(coordinates)));
  }

  // Render the google map
  render() {
    return (
      <div className='w3-container'>
        {<div className='w3-cell-row' style={{ margin: 'auto' }}>
          <div style={{ overflow: 'hidden', height: '300px', width: '100%', margin: 'auto' }}>
            <div id='gmap_canvas' style={{ height: '300px', width: '100%' }}></div>
          </div>
        </div>}
      </div>
    )
  }
}

export default Map;



