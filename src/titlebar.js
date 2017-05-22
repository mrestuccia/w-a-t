import React from 'react'

class TitleBar extends React.Component{
  constructor(props){
    super();
  }
  render(){
    return(
        <div id='title'>
          <h1>WAT</h1>
          <button className='glyphicon glyphicon-cog btn-xs' style={{float:'right',marginRight:'20px'}}></button>
        </div>
    )
  }
}

export default TitleBar;