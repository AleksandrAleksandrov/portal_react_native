import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import {
  EMAIL_CHANGED_IN_CHANGE_PASSWORD,
  HIDE_RESTORE_PASSWORD_DIALOG,
  SHOW_RESTORE_PASSWORD_DIALOG,
  SHOW_TOAST_RESTORE_PASSWORD,
  HIDE_TOAST_RESTORE_PASSWORD,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SECCESS,
  LOGIN_USER_FAIL,
  TOKEN,
  SET_TOKEN,
} from './types';
import * as serviceREST from '../services/serviceREST';

export const emailChangedInChangePassword = (text) => {
  return {
    type: EMAIL_CHANGED_IN_CHANGE_PASSWORD,
    payload: text,
  };
};

export const hideRestorePasswordDialog = () => {
  return {
    type: HIDE_RESTORE_PASSWORD_DIALOG,
  };
};

export const showToast = () => {
  return {
    type: SHOW_TOAST_RESTORE_PASSWORD,
  };
};

export const hideToast = () => {
  console.warn('hideToast');
  return {
    type: HIDE_TOAST_RESTORE_PASSWORD,
  };
};

export const showRestorePassword = () => {
  return {
    type: SHOW_RESTORE_PASSWORD_DIALOG,
  };
};

export const restorePassword = (email) => (dispatch) => {
  serviceREST.restorePassword(email)
    .then((response) => {
      console.warn('restorePassword', response);
      dispatch(hideRestorePasswordDialog());
      dispatch(showToast());
    })
    .catch((error) => {
      console.warn('restorePassword', error);
    });
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text,
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  };
};

const loginUserFail = payload => (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL, payload });
};

const loginUserSuccess = (user) => {
  AsyncStorage.setItem(TOKEN, user.key);
  Actions.postsList();
  return {
    type: LOGIN_USER_SECCESS,
    payload: user,
    token: user.key,
  };
};

export const setTokenToState = payload => (dispatch) => {
  dispatch({ type: SET_TOKEN, payload });
};

export const loginUser = (email, password) => (dispatch) => {
  // console.warn('email', email, 'password', password);
  dispatch({
    type: LOGIN_USER,
  });
  serviceREST.postLogin({
    email,
    password,
  })
  .then((response) => {
    console.warn('loginUserSuccess');
    dispatch(loginUserSuccess(response.data));
  })
  .catch((error) => {
    console.warn('loginUserFail');
    dispatch(loginUserFail(error));
  });
};

