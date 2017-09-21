import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SECCESS,
  LOGIN_USER_FAIL,
  TOKEN,
  SET_TOKEN,
} from './types';
import * as serviceREST from '../services/serviceREST';

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
  dispatch({
    type: LOGIN_USER,
  });
  serviceREST.postLogin({
    email,
    password,
  })
  .then((response) => {
    dispatch(loginUserSuccess(response.data));
  })
  .catch((error) => {
    dispatch(loginUserFail(error));
  });
};

