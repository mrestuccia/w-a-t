import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/loginActions.js';

const Layout = ({ children, products, user, logout })=> (
  <div className='container'>
    <div id='title'>
          <h1>WAT</h1>
          <button className='glyphicon glyphicon-cog btn-xs' style={{float:'right',marginRight:'20px'}}></button>
        </div>

    <div className='container'>
    <Link to='/'>...</Link>
    { ' | ' }
    {
      !user.id ? (
        <Link to='/login'>Login</Link>
      ):(
        <a onClick={ logout }>Logout ({ user.name })</a>
      )
    }
    </div>
    { children }
  </div> 
);

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
