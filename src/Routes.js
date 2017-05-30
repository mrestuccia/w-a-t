import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';


import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/LoginPage';
import { exchangeTokenForUser } from './actions/loginActions.js';
import { loadGroups } from './redux/reducers/groupReducer';
import { loadFriends } from './redux/reducers/friendReducer';


const Routes = ({ bootstrap })=> {
  return (
    <Router history={ hashHistory } onEnter={ bootstrap() }>
      <Route path='/' component={ Layout }>
        <IndexRoute component={ Home } />
        <Route path="/login" component = {Login} />
      </Route>
    </Router>
  );
};

const mapDispatchToProps = (dispatch)=> {
  const bootstrap = ()=> {
    dispatch(exchangeTokenForUser())
     .then( user => console.log(user));
    dispatch(loadGroups(1));
    dispatch(loadFriends(1));
  };
  return {
    bootstrap
  };
};

export default connect(null, mapDispatchToProps)(Routes);
