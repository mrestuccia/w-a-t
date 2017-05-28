
import axios from 'axios';

import { loginUserSuccess,logoutSuccess } from './userActionTypes';


const exchangeTokenForUser = ()=> {
  return (dispatch)=> {
    if(!localStorage.getItem('token'))
      return Promise.reject('no local storage token');
    return axios.get(`/api/user/auth/${localStorage.getItem('token')}`)
      .then(response => response.data)
      .then(user => {
        dispatch(loginUserSuccess(user))
        return user;
      })
  }
};


const attemptLogin = (dispatch)=> {
  return (dispatch)=> {
    return exchangeTokenForUser(localStorage.getItem('token'), dispatch);
  };
};


const login = (credentials)=> {
  return (dispatch)=> {
    return axios.post('/api/user/auth', credentials)
      .then(response => {
        
        // console.log('test response!!!!', response.data.token)
        localStorage.setItem('token', response.data.token);
        
         dispatch(loginUserSuccess(response.data.user));
         return response.data;
      })
      .then( ()=> dispatch(exchangeTokenForUser()))
      .catch((er)=> {
        console.log('test error!!!',er);
        localStorage.removeItem('token');
        throw er;
      });
  };
};

const logout = () =>{
  return (dispatch)=>{
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
    return Promise.resolve();
  }
}


export {
  login,
  exchangeTokenForUser,
  logout,
};

