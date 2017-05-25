import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { login } from '../actions/loginActions';


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
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <div>
        <div className='buffer local'>
      <form onSubmit={this.onSubmit} className='well'>
        <div className='form-group'>
          <input value={ this.state.name } className='form-control' name='name' onChange={ this.onChange }/>
        </div>
        <div className='form-group'>
          <input value={ this.state.password } className='form-control' name='password' onChange={ this.onChange }/>
        </div>
        <button className='btn btn-primary' onClick={ login } disabled={ this.state.name.length === 0 || this.state.password.length === 0}>Login</button>
      </form>
      </div>
      <div className = "buffer oauth">
        <p>
        <a href="/auth/google/callback" className ="btn btn-social btn-google">
        <span>Sign In with Google</span>
        </a>
        </p>
        </div>
      </div>
  );
  }
}


const mapStoreToProps = (store) => {
  return {
    user: store.user
  }
}
const mapDispatchToProps = (dispatch)=> {
  return {
    login: (credentials)=> {
      return dispatch(login(credentials))
        .then(()=> hashHistory.push('/'))
    }
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(Login) ;
