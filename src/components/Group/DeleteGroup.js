import React from 'react';
import { connect } from 'react-redux';
import { deleteGroup } from '../../redux/reducers/groupReducer';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
//group menu add button
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';




class DeleteGroup extends React.Component {
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

  handleClose( groupId) {
    //event.preventDefault();
    this.props.deleteGroup(groupId, this.props.groups[0].userId, this.state);
    this.setState(
      {
        name: ''
      });
    this.props.onCloseModal()
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={ this.handleClose }
      />,
      <FlatButton
        label="Yes"
        primary={true}
        onTouchTap={ ()=>{this.handleClose(this.props.groupId)} }
      />,
    ];


    return (

      <div>
        <Dialog
          title="Delete Group"
          actions={actions}
          modal={true}
          open={this.props.showModal}
        >
          <p>Are you sure you want to delete this group</p>
        </Dialog>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    deleteGroup: (groupId, userId, state) =>  dispatch(deleteGroup(groupId, userId, state)),  
  };
};


const mapStateToProps = (store) => {
  return {
    groups: store.groups
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteGroup);
