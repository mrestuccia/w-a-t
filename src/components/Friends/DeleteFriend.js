import React from 'react';
import { connect } from 'react-redux';
import { deleteGroup } from '../../redux/reducers/groupReducer';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
//group menu add button
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class DeleteFriend extends React.Component {
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

  handleOpen(){
    this.setState({open: true});
  };

  handleClose(){
    this.setState({open: false});
    this.props.deleteFriend(groupId, this.props.groups[0].userId, this.state);
  };

  render() {
   const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Discard"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];


    return (

      <div>
       <RaisedButton label="Alert" onTouchTap={this.handleOpen} />
         <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          sure to unfollow?
        </Dialog>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    deleteFriend: (groupId, userId, state) =>  dispatch(deleteFriend(groupId, userId, state)),  
  };
};


const mapStateToProps = (store) => {
  return {
    friends: store.friends
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteFriend);
