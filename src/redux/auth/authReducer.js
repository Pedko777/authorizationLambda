import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import authActions from './authActions';

const access_token = createReducer(null, {
  [authActions.loginSuccess]: (_, { payload }) =>
    payload.data.body.access_token,
  [authActions.refreshSuccess]: (_, { payload }) =>
    payload.data.body.access_token,
  [authActions.logoutSuccess]: () => null,
});
const refresh_token = createReducer(null, {
  [authActions.loginSuccess]: (_, { payload }) =>
    payload.data.body.refresh_token,
  [authActions.refreshSuccess]: (_, { payload }) =>
    payload.data.body.refresh_token,
  [authActions.logoutSuccess]: () => null,
});

const error = createReducer(null, {
  [authActions.registerError]: (_, { payload }) => payload,
  [authActions.loginError]: (_, { payload }) => payload,
  [authActions.logoutError]: (_, { payload }) => payload,
  [authActions.getCurrentUserError]: (_, { payload }) => payload,
});


export default combineReducers({
  access_token,
  refresh_token,
  error,
});
