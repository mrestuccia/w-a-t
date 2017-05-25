import React from 'react'
import locations from './seedData'

class Map extends React.Component{
  constructor(props){
    super();
  }
  render(){
    return(
        <div className='w3-container'>
   
          {/*<div className='w3-cell-row' style={{margin:'auto'}}>
            <div style={{overflow:'hidden',height:'300px',width:'300px',margin:'auto'}}>
              <div id='gmap_canvas' style={{height:'300px',width:'300px'}}></div>
              </div> 
              <a href='https://mapswebsite.net/'>embedding a google map</a> 
              </div>*/}
        </div>
    )
  }
}

export default Map;



