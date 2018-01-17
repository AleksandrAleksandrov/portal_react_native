import {
  SET_USERS_LIST,
  SET_MORE_USERS_TO_LIST,
  SET_USERS_ARE_LOADING,
  SET_MORE_USERS_ARE_LOADING,
} from '../actions/types';

const INITIAL_STATE = {
  users: [],
  nextPage: '',
  usersAreLoading: true,
  loadingMoreUsersInProgress: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USERS_LIST:
      return {
        ...state,
        users: action.payload,
        nextPage: action.nextPage,
        usersAreLoading: false,
      };
    case SET_MORE_USERS_TO_LIST:
      return {
        ...state,
        users: [...state.users, ...action.payload],
        nextPage: action.nextPage,
        loadingMoreUsersInProgress: false,
      };
    case SET_USERS_ARE_LOADING:
      return {
        ...state,
        postsAreLoading: true,
      };
    case SET_MORE_USERS_ARE_LOADING:
      return {
        ...state,
        postsAreLoading: true,
      };
    default:
      return state;
  }
};
