import {
  POSTS_FETCH_SUCCESS,
  SET_POSTS_ARE_LOADING,
  ADD_MORE_POSTS_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  postsAreLoading: false,
  results: [], // posts list
  nextPage: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POSTS_FETCH_SUCCESS:
      return {
        ...state,
        results: action.payload,
        nextPage: action.nextPage,
        postsAreLoading: false,
      };
    case ADD_MORE_POSTS_SUCCESS:
      return {
        ...state,
        results: state.results.concat(action.payload),
        nextPage: action.nextPage,
        postsAreLoading: false,
      };
    case SET_POSTS_ARE_LOADING:
      return { ...state, postsAreLoading: true };
    default:
      return state;
  }
};
