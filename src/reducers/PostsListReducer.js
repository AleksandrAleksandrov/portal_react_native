import {
  POSTS_FETCH_SUCCESS,
  SET_POSTS_ARE_LOADING,
} from '../actions/types';

const INITIAL_STATE = {
  postsAreLoading: false,
  results: [], // posts list
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POSTS_FETCH_SUCCESS:
      return { ...state, results: action.payload };
    case SET_POSTS_ARE_LOADING:
      return { ...state, postsAreLoading: action.payload };
    default:
      return state;
  }
};
