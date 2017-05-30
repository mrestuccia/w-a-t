import React from 'react';
import { connect } from 'react-redux';
//import { loadGroups } from '../../redux/reducers/groupReducer';


const friendDetail = ({friend}) =>{
  console.log('detail', friend)
  return (
    <div>
      <h5>Friend Detail</h5>
    </div>
    )}
  


const mapDispatchToProps = (dispatch) => (
  {
    loadFriends: (gId) => dispatch(loadFriends(gId))
  }
);

const mapStateToProps = (state) => (
  {
    friend: state.friend,
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(friendDetaial);

