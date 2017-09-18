import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SECCESS,
  LOGIN_USER_FAIL,
  TOKEN
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
    payload: text
  };
};

export const loginUser = (email, password) => (dispatch) => {
  console.log(email);
  serviceREST.postLogin({
    email,
    password
  }).then((response) => {
  console.log(response);
  dispatch(loginUserSuccess(response.data));
})
.catch((error) => {
  console.log(error);
});
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (user) => {
  AsyncStorage.setItem(TOKEN, user.key);
  Actions.postsList();
  return {
    type: LOGIN_USER_SECCESS,
    payload: user
  };
};
