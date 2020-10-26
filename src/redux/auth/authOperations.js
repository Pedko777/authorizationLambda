import axios from 'axios';
import authActions from './authActions';

const setAuthToken = token => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};

const instance = axios.create({
  baseURL: 'http://142.93.134.108:1111',
});

const register = credentials => dispatch => {
  dispatch(authActions.registerRequest());

  instance({
    method: 'POST',
    url: '/sign_up',
    data: credentials,
  })
    .then(response => {
      dispatch(authActions.registerSuccess(response));
    })
    .catch(error => dispatch(authActions.registerError(error)));
};

const logIn = credentials => dispatch => {
  dispatch(authActions.loginRequest());
  instance({
    method: 'POST',
    url: `/login?email=${credentials.email}&password=${credentials.password}`,
    data: credentials,
  })
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
    setAuthToken(tokenAccess);
    instance({
      method: 'GET',
      url: '/me',
    })
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
    const {
      auth: { refresh_token: tokenRefresh },
    } = getState();

    if (!tokenRefresh) {
      return;
    }
    dispatch(authActions.refreshRequest());
    setAuthToken(tokenRefresh);
    instance({
      method: 'POST',
      url: '/refresh',
    })
      .then(response => {
        if (response.data.statusCode === 200) {
          dispatch(authActions.refreshSuccess(response));
          me();
        } else {
          setAuthToken(null);
          dispatch(authActions.logoutSuccess());
        }
      })
      .catch(error => authActions.refreshError(error));
  };

  if (tokenAccess) {
    setAuthToken(tokenAccess);
    me();
    dispatch(authActions.getCurrentUserRequest());
  }
};

// const getCurrentUser = () => (dispatch, getState) => {
//   const {
//     auth: { access_token: tokenAccess, refresh_token: tokenRefresh },
//   } = getState();
//   if (!tokenAccess && !tokenRefresh) {
//     return;
//   }
//   const me = () => {
//     const {
//       auth: { access_token: tokenAccess },
//     } = getState();
//     token.set(tokenAccess);
//     axios
//       .get('/me')
//       .then(response => {
//         if (response.data.body.status === 'error') {
//           refresh();
//         } else {
//           dispatch(authActions.getCurrentUserSuccess(response));
//         }
//       })
//       .catch(error => authActions.getCurrentUserError(error));
//   };

//   const refresh = () => {
//     if (!tokenRefresh) {
//       return;
//     }
//     dispatch(authActions.refreshRequest());
//     token.set(tokenRefresh);

//     axios
//       .post('/refresh')
//       .then(response => {
//         if (response.data.statusCode === 200) {
//           dispatch(authActions.refreshSuccess(response));
//           me();
//         } else {
//           token.unset();
//           dispatch(authActions.logoutSuccess());
//         }
//       })
//       .catch(error => authActions.refreshError(error));
//   };

//   if (tokenAccess) {
//     token.set(tokenAccess);
//     me();
//     dispatch(authActions.getCurrentUserRequest());
//   }
// };

const logOut = () => dispatch => {
  dispatch(authActions.logoutRequest());
  dispatch(authActions.logoutSuccess());
};

export default { register, logOut, logIn, getCurrentUser };
