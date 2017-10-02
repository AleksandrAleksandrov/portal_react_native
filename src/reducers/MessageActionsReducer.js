import {
  ON_STAR_PRESSED,
  ADDED_TO_FAVOURITE,
  ADDING_TO_FAVOURITE_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
  post: {},
  adding: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  console.warn(state.results);
  switch (action.type) {
    case ON_STAR_PRESSED:
      return {
        ...state,
        adding: true,
        post: action.payload,
      };
    case ADDED_TO_FAVOURITE:
      return {
        ...state,
        post: action.payload,
        adding: false,
        error: '',
      };
    case ADDING_TO_FAVOURITE_FAILED:
      return {
        ...state,
        error: action.payload,
        adding: false,
      };
    default:
      return state;
  }
};
