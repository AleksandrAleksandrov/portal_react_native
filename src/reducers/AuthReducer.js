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
  SET_TOKEN,
  SET_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  restorePasswordDialog: false,
  showToastRestorePassword: false,
  user: null,
  firstName: null,
  lastName: null,
  loading: false, // authorization in progress
  token: null,
  error: null,

};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HIDE_RESTORE_PASSWORD_DIALOG:
      return {
        ...state,
        restorePasswordDialog: false,
      };
    case SHOW_TOAST_RESTORE_PASSWORD:
      return {
        ...state,
        showToastRestorePassword: true,
      };
    case HIDE_TOAST_RESTORE_PASSWORD:
      return {
        ...state,
        showToastRestorePassword: false,
      };
    case SHOW_RESTORE_PASSWORD_DIALOG:
      return {
        ...state,
        restorePasswordDialog: true,
      };
    case EMAIL_CHANGED_IN_CHANGE_PASSWORD:
      return {
        ...state,
        email: action.payload,
      };
    case EMAIL_CHANGED:
      return {
        ...state,
        email: action.payload,
      };
    case PASSWORD_CHANGED:
      return {
        ...state,
        password: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case LOGIN_USER_SECCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload,
        // token: action.token,
        loading: false,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        password: '',
        loading: false,
      };
    case SET_TOKEN:
      return {
        ...state,
        ...INITIAL_STATE,
        token: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
