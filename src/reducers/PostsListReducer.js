import {
  POSTS_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  results: [] //posts list
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POSTS_FETCH_SUCCESS:
      return { ...state, results: action.payload };
    default:
      return state;
  }
};
