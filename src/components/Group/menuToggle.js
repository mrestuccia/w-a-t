import React from 'react';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
  marginRight: 0,

};


class AddFriend extends React.Component {
  constructor() {
    super();
    this.state = {
      open: true,
    };
    this.onClick = this.onClick.bind(this);
  }


  onClick(event) {
    this.setState({ open: !this.state.open });
  }


  render() {
   
    return (
      <div>
         <FloatingActionButton secondary={true} mini={true} style={style}>
            <ContentAdd onTouchTap={this.handleOpen} />
          </FloatingActionButton>
 
        <Dialog
          title="Add Friend"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <p>Enter your friend's name and email</p>

          <TextField id="friend-name" hintText="Enter Name" floatingLabelText="Name" value={this.state.name} onChange={(event, newValue) => this.setState({ name: newValue })} />
          <br />
          <TextField id="friend-email" hintText="Enter Email" floatingLabelText="Email" value={this.state.email} onChange={(event, newValue) => this.setState({ email: newValue })} />

        </Dialog>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addFriend: (gId, state) =>  dispatch(addFriend(gId, state)),  
  };
};


const mapStateToProps = (store) => {
  return {
    friends: store.friends
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend);
