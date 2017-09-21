import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SECCESS,
  LOGIN_USER_FAIL,
  SET_TOKEN,
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  firstName: null,
  lastName: null,
  loading: false, // authorization in progress
  token: null,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
        token: action.token,
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
    default:
      return state;
  }
};
