export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOCATION_SUCCESS = 'LOCATION_SUCCESS';
export const NEARBY_SUCCESS = 'NEARBY_SUCCESS';
export const NOTIFY_SUCCESS = 'NOTIFY_SUCCESS';

export const loginUserSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
});


export const locationSuccess = (coordinates) => ({
  type: LOCATION_SUCCESS,
  coordinates: coordinates,
});

export const nearbySuccess = (nearbyUsers) => ({
  type: NEARBY_SUCCESS,
  nearby: nearbyUsers,
});

export const notifySuccess = (user) => ({
  type: NEARBY_SUCCESS,
  notify: user,
});
