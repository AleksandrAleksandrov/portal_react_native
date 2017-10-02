import {
  POSTS_FETCH_SUCCESS,
  SET_POSTS_ARE_LOADING,
  ADD_MORE_POSTS_SUCCESS,
  GET_NEW_POST,
} from '../actions/types';

const INITIAL_STATE = {
  postsAreLoading: false,
  results: [], // posts list
  nextPage: '',
  newPost: {},
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
    default:
      return state;
  }
};
