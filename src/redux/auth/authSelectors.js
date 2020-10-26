const isAuthenticated = state =>
  state.auth.access_token || state.auth.refresh_token;
const isError = state => state.auth.error;
export default { isAuthenticated, isError };
