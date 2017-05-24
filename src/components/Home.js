import React, { Component } from 'react';

import Map from './Map';
import Friends from './Friends';
import GroupSelector from './Group/Group.js';

class Home extends Component {
  render() {
    return (
      <div id='myApp'>
        <div className='w3-container w3-card'>
          <button type='button' className='btn-primary btn-xs' style={{ float: 'right', marginRight: '20px' }}>Switch UI View</button>
           <GroupSelector />
        </div>
        <Map />
        <Friends />
       
      </div>
    )
  }
}

export default Home;

