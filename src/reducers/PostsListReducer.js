import {
  POSTS_FETCH_SUCCESS,
  SET_POSTS_ARE_LOADING,
  ADD_MORE_POSTS_SUCCESS,
  GET_NEW_POST,
  SET_CURRENT_POST,
  ADDED_TO_FAVOURITE,
  ADDING_TO_FAVOURITE_FAILED,
  ON_STAR_PRESSED,
} from '../actions/types';

const INITIAL_STATE = {
  postsAreLoading: false,
  results: [], // posts list
  nextPage: '',
  newPost: {},
  post: {},
  adding: false,
  error: '',
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
        results: [...state.results, ...action.payload],
        nextPage: action.nextPage,
        postsAreLoading: false,
      };
    case SET_POSTS_ARE_LOADING:
      return { ...state, postsAreLoading: true };
    case GET_NEW_POST:
      const newResults = [...state.results]
      const newPost = action.payload;
      // newResults.map(obj => newPost.find(o => o.id === obj.id) || obj);
      Object.keys(newResults).map(function(objectKey, index) {
        var value = newResults[objectKey];
        if (newPost.id === value.id) {
          newResults[index] = newPost;
        }
      });
      return {...state, results: newResults,};
    case SET_CURRENT_POST:
      return { ...state, post: action.payload, adding: false, };
    default:
      return state;
  }
};
