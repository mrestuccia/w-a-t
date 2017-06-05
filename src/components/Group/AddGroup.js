import React from 'react';
import { connect } from 'react-redux';
import { addGroup } from '../../redux/reducers/groupReducer';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
//group menu add button
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

//group menu add chip
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {cyan400, white} from 'material-ui/styles/colors';
const style = {
  marginRight: 10,
  position: 'relative',
  'margin-top': -38,
  left: 180,
   chip: {
    margin: 1
  }
};


class AddGroup extends React.Component {
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
   //console.log(this.props.groups[0].userId);
    this.props.addGroup(this.props.groups[0].userId, this.state);
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
        disabled={this.state.name.length === 0}
        onTouchTap={ this.handleClose }
      />,
    ];


    return (

      <div>
          <Chip onTouchTap={this.handleOpen} style={style.chip} backgroundColor = {cyan400} labelColor = {white}>
          <Avatar size={32} backgroundColor = {cyan400} >+</Avatar>
          Create Group
        </Chip>
         {/*<FloatingActionButton mini={true} style={style} >
            <ContentAdd onTouchTap={this.handleOpen} />
          </FloatingActionButton>*/}

        <Dialog
          title="Create Group"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <p>Enter the Group Name</p>

          <TextField id="friend-name" hintText="Enter the Group Name" floatingLabelText="Name" value={this.state.name} 
          onChange={(event, newValue) => this.setState({ name: newValue })} />
        </Dialog>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addGroup: (userId, state) =>  dispatch(addGroup(userId, state)),  
  };
};


const mapStateToProps = (store) => {
  return {
    groups: store.groups
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup);
