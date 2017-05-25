import React, { Component } from 'react';

import Map from './Map';

import GroupSelector from './Group/Group.js';
import FriendList from './Friends'

class Home extends Component {
  render() {
    return (
      <div id='myApp'>
        <div className='w3-container w3-card'>
          <button type='button' className='btn-primary btn-xs' style={{ float: 'right', marginRight: '20px' }}>Switch UI View</button>
           <GroupSelector />
           <FriendList />
        </div>
        <Map />
       
      </div>
    )
  }
}

export default Home;

