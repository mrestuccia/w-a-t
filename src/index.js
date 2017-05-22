import React, { Component} from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './redux/store';
import Routes from './Routes';
import TitleBar from './titlebar';
import Map from './Map';
import Friends from './Friends';

class App extends React.Component{
  render(){
    return(
      <div id='myApp'>
        <TitleBar />
        <div className='w3-container w3-card'>
        <button type='button' className='btn-primary btn-xs' style={{float:'right',marginRight:'20px'}}>Switch UI View</button>
        <h4 display='inline-block'>UI Title</h4>
        </div>
        <Map />
        <Friends />
      </div>
    )
  }
}


render(<App />, root);
