import React from 'react';
import { connect } from 'react-redux';
import { loadGroups } from '../../redux/reducers/groupReducer';
import { loadFriends } from '../../redux/reducers/friendReducer';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const selectFriend = (event) => {
    console.log( event.target.value );
  };

const friendList = ({friends, group}) =>(
  <div>

    <div> <List>
      <Subheader>FSA</Subheader>
      {
        friends.map( f => (
            
            <ListItem key={f.user.id}
              primaryText={f.user.name} 
              leftAvatar={<Avatar src="images/ok-128.jpg" />}
              rightIcon={<CommunicationChatBubble />}
            /> 

        ))
      }
     
    </List></div>

  
  </div>

	)


const mapDispatchToProps = (dispatch) => (
  {
   loadFriends: (gId) => dispatch(loadFriends(gId))
  }
);

const mapStateToProps = (state) => (
  {
    friends: state.friends
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(friendList);

// //TABLE

//         <Table selectable={true}>
//           <TableRow>
//             <TableHeaderColumn style={{textAlign: 'center'}}>
//             Group Name
//             </TableHeaderColumn>
//           </TableRow>

//           <TableRow>
//             <TableHeaderColumn tooltip="avatar" style={{width:"10%"}}></TableHeaderColumn>
//             <TableHeaderColumn tooltip="name" style={{width:"25%"}}>Name</TableHeaderColumn>
//             <TableHeaderColumn tooltip="location" style={{width:"45%"}}>Location</TableHeaderColumn>
//             <TableHeaderColumn tooltip="laction" style={{width:"10%"}}>Action</TableHeaderColumn>
//           </TableRow>
        
//         <TableBody style={{margin:'auto'}} displayRowCheckbox={false}>
//           {friends.map( (friend, index) => (
//             <TableRow key={index} value={friend.user.id}>
//               <TableRowColumn><Avatar src="images/img.js"/></TableRowColumn>
//               <TableRowColumn>{friend.user.name}</TableRowColumn>
//               <TableRowColumn>lat: {friend.user.lat} long: {friend.user.long}</TableRowColumn>
//               <TableRowColumn><button /></TableRowColumn>
//             </TableRow>
//             ))}
//         </TableBody>
//     </Table>
