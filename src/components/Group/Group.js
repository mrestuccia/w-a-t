import React from 'react';
import { connect } from 'react-redux';
import { loadGroups, selectGroup } from '../../redux/reducers/groupReducer';
import { loadFriends } from '../../redux/reducers/friendReducer';

const GroupOption = ({ group }) => {
  // console.log('**gId',group.id)
  return (
  <option value={group.id}>{group.name}</option>
)}

const GroupSelector = ({ groups, loadFriends }) => {
  // console.log('Groups',loadFriends)
  return (
  <div>
    <select onChange={(evt)=>loadFriends(evt.target.value)}>
      {
        groups.map(group => {
          return (
            <GroupOption key={group.id} group={group.group} />
          );
        })
      }
    </select>

  </div>  
)}    

const mapDispatchToProps = (dispatch) => (

  {
    loadFriends: (gId) => {
    // console.log('loadfriend on the page', gId) 
    return dispatch(loadFriends(gId))}
  }
);

const mapStateToProps = (state) => (
  {
    groups: state.groups,
    group: state.group
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(GroupSelector);



