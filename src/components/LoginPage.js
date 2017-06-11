import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { login } from '../actions/loginActions';

// Material UI
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.login(this.state);
  }

  onChange(event) {
    let change = {};
    this.setState({ [event.target.name]: event.target.value });
    this.setState(change);
  }


  render() {
    var invitationGoogle = '/auth/google/';
    var invitationFacebook = '/auth/facebook/';

    var params = (this.props.params.inviteCode) ? this.props.params.inviteCode : '';

    invitationGoogle = invitationGoogle + params;
    invitationFacebook = invitationFacebook + params;

    return (
      <div>
        <form >
          <div className="social-box">
            <div className="row">
              <div className="social-row">
                <a href={invitationGoogle} className="btn btn-block btn-social btn-google">
                  <i className="fa fa-google" />
                  Sign In With Google
                  </a>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="social-row">
                <a href={invitationFacebook} className="btn btn-block btn-social btn-facebook" >
                  <i className="fa fa-facebook" />Sign In with Facebook
                  </a>
              </div>
            </div>
          </div>
          <div className="main">
            <TextField hintText="  Enter your Username" floatingLabelText="  Username" value={this.state.name} onChange={(event, newValue) => this.setState({ name: newValue })} />
            <br />
            <TextField hintText="  Enter your Password" floatingLabelText="  Password" value={this.state.password} onChange={(event, newValue) => this.setState({ password: newValue })} />
            <br />
            <br />
            <span className="clearfix" />
          </div>
          <div className="login-footer">
            <div className="row">
              <div className="col-md-6 col-xs-6">
                <div className="left-section">
                  <a href="">Forgot your password?</a>
                </div>
              </div>
              <div className="col-md-6 col-xs-6 pull-right">
                <RaisedButton label="Login" primary={true} disabled={this.state.name.length === 0 || this.state.password.length === 0} onClick={this.onSubmit} />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (store) => {
  return {
    user: store.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      return dispatch(login(credentials))
        .then(user => {
          console.log('this user exsist!!!', user);
          hashHistory.push('/');
        });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
