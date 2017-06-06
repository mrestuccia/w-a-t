import React from 'react';
import { connect } from 'react-redux';
import { loadFriends } from '../../redux/reducers/friendReducer';
import { List, ListItem } from 'material-ui/List';


// Material UI
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Notify me</MenuItem>
    <MenuItem>Delete From the Group</MenuItem>
  </IconMenu>
);



const friendList = ({ friends, group, user }) => (
  <div>
    <List>
      <Subheader>Friends List</Subheader>
      {
        friends.map(friend => {
          return (<ListItem
            leftAvatar={<Avatar src={friend.user.photo} />}
            key={friend.id}
            rightIconButton={rightIconMenu}
            primaryText={
              <p>
                <span style={{ color: darkBlack }}>{friend.user.name
                }	</span>
              </p>
            }
            secondaryText={<primaryText> lat: {friend.user.lat} long: {friend.user.long}</primaryText>}
            secondaryTextLines={2}
          />);
        })
      }
    </List>
  </div>
)


const mapDispatchToProps = (dispatch) => (
  {
    loadFriends: (gId) => dispatch(loadFriends(gId))
  }
);

const mapStateToProps = (state) => (
  {
    friends: state.friends,
    user: state.user
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(friendList);


