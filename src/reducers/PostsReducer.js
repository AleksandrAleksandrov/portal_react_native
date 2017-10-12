import {
  POSTS_FETCH_SUCCESS,
  SET_POSTS_ARE_LOADING,
  GET_MORE_POSTS,
  ADD_MORE_POSTS_SUCCESS,
  GET_NEW_POST,
  SET_MORE_POSTS_IN_PROGRESS,
  SET_CURRENT_POST,
  ADDED_TO_FAVOURITE,
  ADDING_TO_FAVOURITE_FAILED,
  DELETE_POST_BY_ID,
  ON_STAR_PRESSED,
  START_REFRESH,
  FINISH_REFRESH,
  SET_FETCHING_COMMENTS,
  SET_FETCHING_COMMENTS_FINISHED,
  SHOW_SORT_BY_DIALOG,
  HIDE_SORT_BY_DIALOG,
  SET_SORT_BY_ADVERT,
  SET_SORT_BY_POLL,
  SET_SORT_BY_EVENT,
} from '../actions/types';

const INITIAL_STATE = {
  postsAreLoading: false,
  loadingMorePostsInProgress: false,
  refreshing: false,
  results: [], // posts list
  nextPage: '',
  newPost: {},
  post: {},
  pressedStarId: {},
  error: '',
  loadingCommentsInProgress: false,
  comments: [],
  showSortBy: false,
  sortByAdvert: false,
  sortByPoll: false,
  sortByEvent: false,
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
    case SET_MORE_POSTS_IN_PROGRESS:
      return {
        ...state,
        loadingMorePostsInProgress: true,
      };

    case ADD_MORE_POSTS_SUCCESS:
      return {
        ...state,
        results: [...state.results, ...action.payload],
        nextPage: action.nextPage,
        loadingMorePostsInProgress: false,
      };
    case SET_POSTS_ARE_LOADING:
      return { ...state,
        postsAreLoading: true,
      };
    case SET_CURRENT_POST:
      const newResults = [...state.results];
      const newPost = action.payload;
      Object.keys(newResults).map(function(objectKey, index) {
        const value = newResults[objectKey];
        if (newPost.id === value.id) {
          newResults[index] = newPost;
        }
      });
      let pressedStarId_ = { ...state.pressedStarId };
      delete pressedStarId_[newPost.id];
      return {
        ...state,
        results: newResults,
        pressedStarId: pressedStarId_,
      };
    case ON_STAR_PRESSED:
      const pressedStarId = { ...state.pressedStarId };
      pressedStarId[action.payload] = true;
      return {
        ...state,
        pressedStarId: pressedStarId,
      };
    case DELETE_POST_BY_ID:
      const resultsToRemove = [...state.results];
      const id = action.payload;
      resultsToRemove.forEach((objectKey, index) => {
        if (id === objectKey.id) {
          resultsToRemove.splice(index, 1);
        }
      });
      return {
        ...state,
        results: resultsToRemove,
      };
    case START_REFRESH:
      return {
        ...state,
        refreshing: true,
      };
    case FINISH_REFRESH:
      return {
        ...state,
        refreshing: false,
      };
    case SET_FETCHING_COMMENTS:
      return {
        ...state,
        loadingCommentsInProgress: true,
      };
    case SET_FETCHING_COMMENTS_FINISHED:
      return {
        ...state,
        comments: action.payload,
        loadingCommentsInProgress: false,
      };
    case SHOW_SORT_BY_DIALOG:
      return {
        ...state,
        showSortBy: true,
      };
    case HIDE_SORT_BY_DIALOG:
      return {
        ...state,
        showSortBy: false,
      };
    case SET_SORT_BY_ADVERT:
      return {
        ...state,
        sortByAdvert: action.payload,
      };
    case SET_SORT_BY_POLL:
      return {
        ...state,
        sortByPoll: action.payload,
      };
    case SET_SORT_BY_EVENT:
      return {
        ...state,
        sortByEvent: action.payload,
      };
    default:
      return state;
  }
};
