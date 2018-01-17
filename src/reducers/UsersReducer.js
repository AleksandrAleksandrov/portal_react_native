import {
  SET_USERS_LIST,
  SET_MORE_USERS_TO_LIST,
} from '../actions/types';

const INITIAL_STATE = {
  users: [],
  nextPage: '',
  usersAreLoading: false,
  loadingMoreUsersInProgress: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USERS_LIST:
      return {
        ...state,
        users: action.payload,
        nextPage: action.nextPage,
      };
    case SET_MORE_USERS_TO_LIST:
      return {
        ...state,
        users: [...state.users, ...action.payload],
        nextPage: action.nextPage,
      };
    default:
      return state;
  }
};
