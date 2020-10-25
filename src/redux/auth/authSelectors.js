const isAuthenticated = state =>
  state.auth.access_token || state.auth.refresh_token;

const getUserEmail = state => state.auth.user.email;

export default { isAuthenticated, getUserEmail };
