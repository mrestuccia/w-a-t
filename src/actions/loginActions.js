
import axios from 'axios';

import { loginUserSuccess, logoutSuccess, locationSuccess } from './userActionTypes';
import { loadGroups } from '../redux/reducers/groupReducer';
import { loadFriends } from '../redux/reducers/friendReducer';

const exchangeTokenForUser = () => {
  return (dispatch) => {
    if (!localStorage.getItem('token')) return Promise.reject('no local storage token');
    return axios.get(`/api/user/auth/${localStorage.getItem('token')}`)
      .then(response => response.data)
      .then(user => {
        dispatch(loginUserSuccess(user));
        return user;
      });
  };
};


const attemptLogin = (dispatch) => {
  return (dispatch) => {
    return exchangeTokenForUser(localStorage.getItem('token'), dispatch);
  };
};


const login = (credentials) => {
  return (dispatch) => {
    return axios.post('/api/user/auth', credentials)
      .then(response => {

        localStorage.setItem('token', response.data.token);

        dispatch(loginUserSuccess(response.data.user));
        return response.data;
      })
      .then(() => dispatch(exchangeTokenForUser()))
      .then(user => {
        dispatch(loadGroups(user.id));
        dispatch(loadFriends(user.id));
      })
      .catch((er) => {
        console.log('test error!!!', er);
        localStorage.removeItem('token');
        throw er;
      });
  };
};

const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
    return Promise.resolve();
  }
}

const updateLocation = (coordinates) => {
  console.log('updateLocation', coordinates);

  const token = localStorage.getItem('token');

  return (dispatch) => {
    return axios.put(`/api/user/${token}`, coordinates)
      .then(response => response.data)
      .then(() => {
        dispatch(locationSuccess(coordinates));
        return Promise.resolve();
      });
  };
};



export {
  login,
  exchangeTokenForUser,
  logout,
  updateLocation
};

