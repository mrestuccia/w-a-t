import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class AddFriend extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      name: '',
      email: ''
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

    this.props.addFriend(this.props.friends[0].groupId, this.state);
    this.setState(
      {
        open: false,
        name: '',
        email: ''
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
        label="Invite"
        primary={true}
        disabled={this.state.name.length === 0 || this.state.email.length === 0}
        onTouchTap={ this.handleClose }
      />,
    ];


    return (
      <div>
        <FlatButton label="Invite" onTouchTap={this.handleOpen} />
        <Dialog
          title="Add Friend"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Enter your friend's name and email

          <TextField id="friend-name" hintText="Enter Name" floatingLabelText="Name" value={this.state.name} onChange={(event, newValue) => this.setState({ name: newValue })} />
          <br />
          <TextField id="friend-email" hintText="Enter Email" floatingLabelText="Email" value={this.state.email} onChange={(event, newValue) => this.setState({ email: newValue })} />

        </Dialog>
      </div>
    );
  }
}