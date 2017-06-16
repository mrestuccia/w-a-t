import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/loginActions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey50} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Drawer from 'material-ui/Drawer';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import AddGroup from './Group/AddGroup.js';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import EditGroup from './Group/EditGroup';
import DeleteGroup from './Group/DeleteGroup';
import EditLocation from 'material-ui/svg-icons/maps/edit-location';
import NameLocation from './NameLocation';

const style = {
    'marginTop': 10
};

const muiTheme = getMuiTheme({
  appBar: {
    height: 50,
    fontFamily: 'Audiowide'
  }
});

// const RightMenu = () => (
  
//   <IconMenu
//   iconButtonElement={
//       <IconButton><EditLocation color={grey50}/></IconButton>
//     }
//     targetOrigin={{horizontal: 'right', vertical: 'top'}}
//     anchorOrigin={{horizontal: 'right', vertical: 'top'}}
//   >
//     <MenuItem primaryText="Check In"/>
//   </IconMenu>
// )

// RightMenu.muiName = "IconMenu" ;


class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      showEditModal: false,
      showDeleteModal: false,
      groupId: 1,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
  }

  toggleMenu(e) {
    e.preventDefault();
    this.setState({ open: !this.state.open });
  }

  closeMenu() {
    this.setState({ open: false });
  }

  showEditModal(groupId){
    this.setState({groupId: groupId, showEditModal: !this.state.showEditModal})
  }

  showDeleteModal(groupId){
    this.setState({groupId: groupId, showDeleteModal: !this.state.showDeleteModal})
  }


  render() {

    const { children, user, logout } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div className='header'>
        <AppBar style={{fontFamily:'Audiowide'}} title='WAT' onLeftIconButtonTouchTap={this.toggleMenu} iconElementRight={ !user.id? <IconButton/>:<NameLocation/>}/>
        <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
              <MenuItem onTouchTap={this.closeMenu} style={{display: user.id ? 'none' : 'block'}}><Link to='/login'>Log In</Link> </MenuItem>
              <MenuItem onTouchTap={this.closeMenu} style={{display: user.id ? 'block' : 'none'}}>Hi {user.name}!
                    <AddGroup />
              </MenuItem>
               <Divider style={style}/>

                {
              this.props.groups.map(group => {
                return (
                  <MenuItem key={group.group.id} value={group.group.id} primaryText={group.group.name} rightIcon={<ArrowDropRight/>} 
                  menuItems={[
                        <MenuItem primaryText="Edit" onTouchTap={()=>{this.showEditModal(group.group.id)}}  leftIcon={<Edit />}/>,
                        <MenuItem primaryText="Delete" onTouchTap={()=>{this.showDeleteModal(group.group.id)}} leftIcon={<Delete />}/>
                   ]}/>
                );
              })
            }
            <MenuItem onTouchTap={this.closeMenu} onClick={logout} style={{display: user.id ? 'block' : 'none'}}>Log Out</MenuItem> ;
          </Drawer>
          <EditGroup showModal={this.state.showEditModal} groupId={this.state.groupId} onCloseModal={this.showEditModal}/>
          <DeleteGroup showModal={this.state.showDeleteModal} groupId={this.state.groupId} onCloseModal={this.showDeleteModal}/>
          {children}
        </div>
      </MuiThemeProvider>
    );
  }
}


const mapStateToProps = ({ groups, group, user }) => (
  { groups, user }
);

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()).then(() => hashHistory.push('/login'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
