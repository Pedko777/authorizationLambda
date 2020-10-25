import axios from 'axios';
import authActions from './authActions';

axios.defaults.baseURL = 'http://142.93.134.108:1111';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = credentials => dispatch => {
  dispatch(authActions.registerRequest());

  axios
    .post('/sign_up', credentials)
    .then(response => {
      //   token.set(response.data.token);
      dispatch(authActions.registerSuccess(response));
    })
    .catch(error => dispatch(authActions.registerError(error)));
};

const logIn = credentials => dispatch => {
  dispatch(authActions.loginRequest());
  axios
    .post(
      `/login?email=${credentials.email}&password=${credentials.password}`,
      credentials,
    )
    .then(response => {
      //   token.set(response.data.body.access_token);
      dispatch(authActions.loginSuccess(response));
    })
    .catch(error => dispatch(authActions.loginError(error)));
};

const getCurrentUser = () => (dispatch, getState) => {
  const {
    auth: { access_token: tokenAccess, refresh_token: tokenRefresh },
  } = getState();
  //   console.log('tokenAccess', tokenAccess);
  //   console.log('tokenRefresh', tokenRefresh);
  if (!tokenAccess && !tokenRefresh) {
    return;
  }
  if (tokenAccess) {
    token.set(tokenAccess);
    axios
      .get('/me')
      .then(response => {
        dispatch(authActions.getCurrentUserSuccess(response));
      })
      .catch(error => authActions.getCurrentUserError(error));
  } else {
    token.set(tokenRefresh);
    axios
      .post('/refresh')
      .then(response => dispatch(authActions.refreshSuccess(response)));
  }
  //   token.set(persistedToken);
  dispatch(authActions.getCurrentUserRequest());
};

const logOut = () => dispatch => {
  dispatch(authActions.logoutRequest());
  dispatch(authActions.logoutSuccess());
};

export default { register, logOut, logIn, getCurrentUser };
