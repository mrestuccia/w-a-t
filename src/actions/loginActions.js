
import axios from 'axios';
//haha
import { loginUserSuccess, logoutSuccess, locationSuccess, nearbySuccess } from './userActionTypes';
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


const login = (credentials) => {
  return (dispatch) => {
    return axios.post('/api/user/auth', credentials)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        return dispatch(loginUserSuccess(response.data.user));
      })
      .then(() => dispatch(exchangeTokenForUser()))
      .then(user => dispatch(loadGroups(user.id)))
      .then(state => dispatch(loadFriends(state.groups[0].groupId)))
      .catch((err) => {
        console.log('loginActions Err: ', err);
        localStorage.removeItem('token');
        throw err;
      });
  };
};

const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
    return Promise.resolve();
  };
};

const updateLocation = (coordinates, groupId) => {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    return axios.put(`/api/user/${token}`, coordinates)
      .then(response => response.data)
      .then(response => {
        console.log('update nearby people', response);
        return dispatch(nearbySuccess(response));
      })
      .then(() => {
        return dispatch(locationSuccess(coordinates));
      })
      .then(() => {
        if (groupId) dispatch(loadFriends(groupId));
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

