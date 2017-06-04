import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/loginActions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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


const style = {
    'margin-top': 10
};

const muiTheme = getMuiTheme({
  appBar: {
    height: 50,
    fontFamily: 'Audiowide'
  }
});

const RightMenu = () => (
  
  <IconMenu
  iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Invite a Friend"/>
    <MenuItem primaryText="Leave the Group" />
  </IconMenu>
)

RightMenu.muiName = "IconMenu" ;


class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  toggleMenu(e) {
    e.preventDefault();
    this.setState({ open: !this.state.open });
  }

  closeMenu() {
    this.setState({ open: false });
  }


  render() {

    const { children, user, logout } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div className='header'>
        {/*<AppBar title='Where Are They' iconElementLeft={ !user.id ? <Link to='/login'>Login</Link>: <Menu user={user}  />} />*/}
        <AppBar style={{fontFamily:'Audiowide'}} title='WAT' onLeftIconButtonTouchTap={this.toggleMenu} iconElementRight={ !user.id? <IconButton/>:<RightMenu/>}/>
        <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
              <MenuItem onTouchTap={this.closeMenu} style={{display: user.id ? 'none' : 'block'}}><Link to='/login'>Log In</Link> </MenuItem>
              <MenuItem onTouchTap={this.closeMenu} style={{display: user.id ? 'block' : 'none'}}>Hi {user.name}!
                    <AddGroup />
              </MenuItem>
               <Divider style={style}/>

                {
              this.props.groups.map(group => {
                return (
                  <MenuItem key={group.group.id} value={group.group.id} primaryText={group.group.name} />
                );
              })
            }
            <MenuItem onTouchTap={this.closeMenu} onClick={logout} style={{display: user.id ? 'block' : 'none'}}>Log Out</MenuItem> ;
              {/*<MenuItem style={{display: user.id ? 'block' : 'none'}} primaryText="Group:Family" checked={true} rightIcon={<ArrowDropRight/>}
              menuItems={[
                <MenuItem primaryText="Family" checked={true}/>,
              ]}
              />
              <MenuItem onTouchTap={this.closeMenu} style={{display: user.id ? 'block' : 'none'}}>Create a Group</MenuItem>
              <MenuItem onTouchTap={this.closeMenu} style={{display: user.id ? 'block' : 'none'}}>Edit the Group</MenuItem>
              */}
          </Drawer>
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
