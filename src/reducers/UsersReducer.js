import {
  SET_USERS_LIST,
} from '../actions/types';

const INITIAL_STATE = {
  users: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USERS_LIST:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
