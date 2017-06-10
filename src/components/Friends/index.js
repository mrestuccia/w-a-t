import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFriends, deleteFriend } from '../../redux/reducers/friendReducer';
import { List, ListItem } from 'material-ui/List';
import SimpleMap from '../SimpleMap';
import DeleteFriend from './DeleteFriend'
// Material UI
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import Delete from 'material-ui/svg-icons/action/delete-forever';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class friendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      gId:'',
      fId: '',
      location: '',
      open: false

    }
    this.onDeleteYes = this.onDeleteYes.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  onDeleteYes(){
    console.log('delete yes clicked: ', this.state.selected)
    ;
    const groupId=this.state.selected.groupId;
    const userId=this.state.selected.user.id;
    this.setState({open: false});
    this.props.deleteFriend(groupId, userId, this.state);
    
  }

  onClick(evt){
    this.setState({selected: evt})
    console.log('onClick -  zoom', this.state.selected)
  }

  onClickTrash(){
    //console.log('transhCan: ', this.state.gId,this.state.fId)
    console.log('trashCan!!', 'group', this.state.selected.groupId, 'friend', this.state.selected.id)
  }

  handleOpen(evt){
    this.setState({open: true});
    //this.setState({selected: evt});
    console.log('delete button',this.state.selected)
  };

  handleClose(){
    this.setState({open: false});
  };

  render() {
    const {friends, group, user } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.onDeleteYes}
      />,
    ];
    return (
       <div >
          <List >
            <Subheader>Friends List</Subheader>
            {
              friends.map(friend => {
                return (<ListItem 
                  onClick = {()=>this.onClick(friend)}
                  value={friend.id}
                  leftAvatar={<Avatar src={friend.user.photo} />}
                  key={friend.id}
                  rightIconButton={
                  <div>
                  <IconButton onClick={this.handleOpen}><Delete  /></IconButton>
                      <Dialog
                        title="Delete Friend"
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                      >
                       sure to delete this person?
                      </Dialog></div>}
                  primaryText={ 
                    <div value={friend.id}>
                      <span style={{ color: darkBlack }} value={friend.id} key={friend.id}>{friend.user.name
                      } </span></div>
                 
                  }
                  secondaryText={<primaryText> lat: {friend.user.lat} long: {friend.user.long}</primaryText>}
                  secondaryTextLines={2}
                  
                />);
              })
            }
          </List>
        </div>
    )
  }

}


const mapDispatchToProps = (dispatch) => (
  {
    loadFriends: (gId) => dispatch(loadFriends(gId)),
    deleteFriend: (gId, fId) => dispatch(deleteFriend(gId, fId))
  }
);

const mapStateToProps = (state) => (
  {
    friends: state.friends,
    user: state.user
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(friendList);


