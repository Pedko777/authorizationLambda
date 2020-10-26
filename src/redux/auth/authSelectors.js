const isAuthenticated = state =>
  state.auth.access_token || state.auth.refresh_token;
const isError = state => state.auth.error;
const isRegister = state => state.auth.register;
export default { isAuthenticated, isError, isRegister };
