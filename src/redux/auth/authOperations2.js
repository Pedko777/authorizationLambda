// import axios from 'axios';
// import authActions from './authActions';

// axios.defaults.baseURL = 'http://142.93.134.108:1111';

// const token = {
//   set(token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = '';
//   },
// };

// const register = credentials => async dispatch => {
//   dispatch(authActions.registerRequest());
//   const response = await axios.post('/sign_up', credentials);
//   const user = JSON.parse(response.config.data);

//   dispatch(authActions.registerSuccess(user));
//   if (response.status === 200) {
//     const response = await axios
//       .headers()
//       .post(
//         `/login?email=${credentials.email}&password=${credentials.password}`,
//       );
//     dispatch(authActions.loginSuccess(response));
//     await token.set(response.data.body.access_token);
//   }
// .catch(error => dispatch(authActions.registerError(error)));
// };

// const logIn = credentials => dispatch => {
//   dispatch(authActions.loginRequest());
//   axios
//     .post(
//       `/login?email=${credentials.email}&password=${credentials.password}`,
//       credentials,
//     )
//     .then(response => {
//       // console.log(response);
//       token.set(response.data.body.access_token);
//       dispatch(authActions.loginSuccess(response));
//     })
//     .catch(error => dispatch(authActions.loginError(error)));
// };

// const getCurrentUser = () => (dispatch, getState) => {
//   const {
//     auth: { token: persistedToken },
//   } = getState();

//   if (!persistedToken) {
//     return;
//   }

//   token.set(persistedToken);
//   dispatch(authActions.getCurrentUserRequest());

//   axios
//     .get('/me')
//     .then(response => {
//       // console.log(response);
//       token.set(response.data.body.refresh_token);
//       dispatch(authActions.getCurrentUserSuccess(response));
//     })

//     .catch(error => authActions.getCurrentUserError(error));
// };

// const logOut = () => dispatch => {
//   dispatch(authActions.logoutRequest());

//   axios
//     .post('/refresh')
//     .then(response => {
//       console.log(response);
//       // token.unset();

//       // dispatch(authActions.logoutSuccess());
//     })
//     .catch(error => dispatch(authActions.logoutError(error)));
// };

export default { register, logIn, getCurrentUser, logOut };
