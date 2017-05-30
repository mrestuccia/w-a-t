import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/loginActions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu' ;
import MenuItem from 'material-ui/MenuItem' ;
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';


const muiTheme = getMuiTheme({
  appBar: {
    height: 50,
    fontFamily: 'Audiowide'
  },
});

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
    this.setState({open: !this.state.open});
  }

  closeMenu() {
    this.setState({open: false});
  }


  render() {

    const { children, products, user, logout } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div className='header'>
        {/*<AppBar title='Where Are They' iconElementLeft={ !user.id ? <Link to='/login'>Login</Link>: <Menu user={user}  />} />*/}
        <AppBar style={{fontFamily:'Audiowide'}} title='Where Are They' onLeftIconButtonTouchTap={this.toggleMenu} />
        <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
              <MenuItem onTouchTap={this.closeMenu} style={{display: user.id ? 'none' : 'block'}}><Link to='/login'>Log In</Link> </MenuItem>
              <MenuItem onTouchTap={this.closeMenu} style={{display: user.id ? 'block' : 'none'}}>Hi {user.name}!</MenuItem>
              <MenuItem onTouchTap={this.closeMenu} style={{display: user.id ? 'block' : 'none'}}>Group: Family</MenuItem>
              <MenuItem onTouchTap={this.closeMenu} style={{display: user.id ? 'block' : 'none'}}>Switch Group</MenuItem>
              <MenuItem onTouchTap={this.closeMenu} style={{display: user.id ? 'block' : 'none'}}>Create a Group</MenuItem>
              <MenuItem onTouchTap={this.closeMenu} style={{display: user.id ? 'block' : 'none'}}>Edit the Group</MenuItem>
              <MenuItem onTouchTap={this.closeMenu} onClick={logout} style={{display: user.id ? 'block' : 'none'}}>Log Out</MenuItem>
          </Drawer>
        {<a onClick = {logout}>LogOut ({user.name}) </a>}
        {children}
      </div> 
      </MuiThemeProvider>
    );
  }
}


const mapStateToProps = ({ groups, user})=>(
  { groups, user }
);

const mapDispatchToProps = (dispatch)=> {
  return {
    logout: ()=> dispatch(logout())
                    .then(()=> hashHistory.push('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
