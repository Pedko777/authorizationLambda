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
      dispatch(authActions.loginSuccess(response));
    })
    .catch(error => {
      dispatch(authActions.loginError(error));
    });
};

const getCurrentUser = () => (dispatch, getState) => {
  const {
    auth: { access_token: tokenAccess, refresh_token: tokenRefresh },
  } = getState();
  if (!tokenAccess && !tokenRefresh) {
    return;
  }
  const me = () => {
    const {
      auth: { access_token: tokenAccess },
    } = getState();
    token.set(tokenAccess);
    axios
      .get('/me')
      .then(response => {
        if (response.data.body.status === 'error') {
          refresh();
        } else {
          dispatch(authActions.getCurrentUserSuccess(response));
        }
      })
      .catch(error => authActions.getCurrentUserError(error));
  };

  const refresh = () => {
    if (!tokenRefresh) {
      return;
    }
    dispatch(authActions.refreshRequest());
    token.set(tokenRefresh);

    axios
      .post('/refresh')
      .then(response => {
        dispatch(authActions.refreshSuccess(response));
        if (response.data.statusCode === 200) {
          me();
        }
      })
      .catch(error => authActions.refreshError(error));
  };

  if (tokenAccess) {
    token.set(tokenAccess);
    me();
    dispatch(authActions.getCurrentUserRequest());
  }
};

const logOut = () => dispatch => {
  dispatch(authActions.logoutRequest());
  dispatch(authActions.logoutSuccess());
};

export default { register, logOut, logIn, getCurrentUser };
