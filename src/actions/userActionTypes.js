export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const loginUserSuccess = (user)=> {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};


export const logoutSuccess = ()=> ({
  type: LOGOUT_SUCCESS
});