import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import OneSignal from 'react-native-onesignal';
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
  SET_ERROR,
  SHOW_NOTIFICATION_PERMISSION_DIALOG,
} from './types';
import { setMyId } from '../services/StorageHelper';
import * as serviceREST from '../services/serviceREST';
import {
  INVALID_EMAIL,
  NO_INTERNET_CONNECTION,
} from '../Constants';

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
  return {
    type: HIDE_TOAST_RESTORE_PASSWORD,
  };
};

export const setError = (error) => {
  return {
    type: SET_ERROR,
    payload: error,
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
      dispatch(hideRestorePasswordDialog());
      dispatch(showToast());
    })
    .catch((error) => {
      dispatch(setError(error.data.email));
      dispatch(showToast());
      console.warn('restorePassword', error.data.email);
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
  // console.warn('loginUserSuccess:', user);
  setMyId(user.user.id);
  Actions.postsList();
  return {
    type: LOGIN_USER_SECCESS,
    payload: user,
    // token: user.key,
  };
};

export const setTokenToState = payload => (dispatch) => {
  dispatch({ type: SET_TOKEN, payload });
};

const showNotificationPermission = () => {
  return {
    type: SHOW_NOTIFICATION_PERMISSION_DIALOG,
  };
};

export const subscribeToNotifications = (deviceId) => (dispatch, getState) => {
  const { networkIsConnected } = getState().networkReducer;
  if (!networkIsConnected) {
    dispatch(loginUserFail(NO_INTERNET_CONNECTION));
  } else {
    serviceREST.subscribeToNotifications(deviceId)
    .then((response) => {
      console.warn('subscribeToNotifications', response);
      dispatch(showNotificationPermission());
    })
    .catch((error) => {
      console.warn('subscribeToNotifications', error);
    });
  }
};

export const loginUser = (email, password) => (dispatch, getState) => {
  const { networkIsConnected } = getState().networkReducer;
  if (!networkIsConnected) {
    dispatch(loginUserFail(NO_INTERNET_CONNECTION));
  } else {
    dispatch({
      type: LOGIN_USER,
    });

    serviceREST.postLogin({
      email,
      password,
    })
      .then((response) => {
        OneSignal.addEventListener('ids', (device) => {
          dispatch(subscribeToNotifications(device.userId));
        });
        OneSignal.configure();
        OneSignal.setSubscription(true);
        dispatch(loginUserSuccess(response.data));
      })
      .catch((error) => {
        dispatch(loginUserFail(error));
      });
  }
};
