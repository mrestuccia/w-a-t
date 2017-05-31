import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { login, logout} from '../actions/loginActions';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton' ;
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



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
    this.setState({[event.target.name]: event.target.value});
    this.setState(change);
  }


  render() {
    return ( 
    <div>
          <form >
            <TextField hintText="Enter your Username" floatingLabelText="Username" value={this.state.name} onChange = {(event,newValue) => this.setState({name:newValue})}/>
            <br/>
            <TextField hintText="Enter your Password" floatingLabelText="Password" value={this.state.password} onChange = {(event,newValue) => this.setState({password:newValue})}/>
            <br/>
            <RaisedButton label="Login" primary={true} disabled={ this.state.name.length === 0 || this.state.password.length === 0} onClick={this.onSubmit}/>
        </form>
        <div className="buffer oauth">
          <p>
            <a href="/auth/google" className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>Sign In With Google</span>
            </a>
          </p>
        </div>
       
  
     </div>
  );
  }
}


const mapStateToProps = (store) => {
  return {
    user: store.user
  }
}
const mapDispatchToProps = (dispatch)=> {
  return {
    login: (credentials)=> {
      console.log('this user exsist!!!')
      return dispatch(login(credentials))
        .then(()=> hashHistory.push('/'))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login) ;
