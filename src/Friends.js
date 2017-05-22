import React from 'react'

class Friends extends React.Component{
  constructor(props){
    super();
  }
  render(){
    return(
        <div className='w3-container' style={{margin:'auto'}}>
          <div className='w3-cell-row'>
            <table id="FriendsModal" className="table table-hover table-condensed" style={{maxWidth:'300px'}}>
              <thead>
                <tr>
                  <th style={{width:"35%"}}>Name</th>
                  <th style={{width:"45%"}}>Location</th>
                  <th style={{width:"10%"}}></th>
                </tr>
              </thead>
              <tbody style={{margin:'auto'}}>
                <tr>
                  <td data-th="Name">
                    <div className='row'>
                      <h4>Evan</h4>
                    </div>
                  </td>
                  <td data-th="Location">
                    <div className='row'>
                      <h4>FSA</h4>
                    </div>
                  </td>
                  <td data-th="">
                    <div className='row'>
                      <button className="glyphicon glyphicon-screenshot"></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    )
  }
}

export default Friends;
