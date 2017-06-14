import React from 'react';
import { connect } from 'react-redux';
import {addUserLocation} from '../redux/reducers/userLocationReducer';
//need to import from reducer ../../redux/reducers/namelocation;

import EditLocation from 'material-ui/svg-icons/maps/edit-location';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {grey50} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';

const style = {
  marginRight: 0,
};


class NameLocation extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      name: ''
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  handleOpen() {
    this.setState({ open: true });
  }

  handleClose(event) {
    event.preventDefault();
    this.props.addUserLocation(this.props.userId, this.state);
    this.setState(
      {
        open: false,
        name: ''
      });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={ this.handleClose }
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={ this.handleClose }
      />,
    ];


    return (
      <div>
         <IconButton><EditLocation color={grey50} onTouchTap = {this.handleOpen}/></IconButton>
        <Dialog
          title="Name your Location"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <p>Enter your Location Name</p>
          <TextField id="location-name" hintText="Enter Location Name" floatingLabelText="Name" value={this.state.name} onChange={(event, newValue) => this.setState({ name: newValue })} />    
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUserLocation: (userId, state) =>  dispatch(addUserLocation(userId, state)),  
  };
};


const mapStateToProps = (store) => {
  return {
    userLocation: store.userLocation,
    userId: store.user.id
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameLocation);
