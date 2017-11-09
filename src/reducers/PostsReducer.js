import {
  RESET_ERROR,
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
  SENDING_COMMENT_IN_PROGRESS,
  COMMENT_SENT,
  COMMENT_SENT_FAIL,
  SHOW_ALL_COMMENTS,
  SHOW_SORT_BY_DIALOG,
  HIDE_SORT_BY_DIALOG,
  SET_SORT_BY_ADVERT,
  SET_SORT_BY_POLL,
  SET_SORT_BY_EVENT,
  SET_FILTER_BY_FAVOURITE,
  SHOW_NOTIFICATION_PERMISSION_DIALOG,
  HIDE_NOTIFICATION_PERMISSION_DIALOG,
  SET_USER,
  OPEN_DRAWER,
  CLOSE_DRAWER,
  VOTE_FOR,
  SET_VOTE_OPTIONS,
  SHOW_WHO_VOTED_DIALOG,
  SET_POLL_RESULT,
  FETCHING_VOTED_PEOPLE_IN_PROGRESS,
  SELECTED_POLL_RAW_INDEX,
  SET_POLL_VALUE,
  SET_LAT_LON,
  GET_LAT_LON_IN_PROGRESS,
  RESET_LAT_LON,
  SET_IS_LAT_LON_VALID,
} from '../actions/types';
import {
  ADVERT,
  POLL,
  EVENT,
  FAVOURITE,
} from '../Constants';

const filter = new Set();

const createCurrentSet = (state, add, event) => {
  const set = state.filterSet;
  if (add) {
    set.add(event);
  } else {
    set.delete(event);
  }
  return set;
};

const INITIAL_STATE = {
  user: {},
  isDrawerOpened: false,
  postsAreLoading: false,
  loadingMorePostsInProgress: false,
  refreshing: false,
  results: [], // posts list
  nextPage: '',
  newPost: {},
  post: {},
  pressedStarId: {},
  error: null,
  loadingCommentsInProgress: false,
  sendingCommentInProgress: false,
  comments: [],
  isShowAllComments: false,
  showSortBy: false,
  filterByAdvert: false,
  filterByPoll: false,
  filterByEvent: false,
  filterByFavourite: false,
  filterSet: filter,
  showNotificationPermissionDialog: false,
  voteOptions: null,
  votingInProgress: false,
  showWhoVoted: false,
  fetchingVotedPeopleInProgress: false,
  pollResult: null, // People who voted
  selectedPollRawIndex: 0,
  selectedPollTitle: '',
  latitude: null,
  longitude: null,
  getLatLonInProgress: false,
  isLatLonValid: true,
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
      return {
        ...state,
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
    case SENDING_COMMENT_IN_PROGRESS:
      return {
        ...state,
        sendingCommentInProgress: true,
      };
    case COMMENT_SENT:
      return {
        ...state,
        sendingCommentInProgress: false,
      };
    case COMMENT_SENT_FAIL:
      return {
        ...state,
        sendingCommentInProgress: false,
        error: 'Не удалось отправить сообщение',
      };
    case SHOW_ALL_COMMENTS:
      return {
        ...state,
        isShowAllComments: true,
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
        filterByAdvert: action.payload,
        filterSet: createCurrentSet(state, action.payload, ADVERT),
      };
    case SET_SORT_BY_POLL:
      return {
        ...state,
        filterByPoll: action.payload,
        filterSet: createCurrentSet(state, action.payload, POLL),
      };
    case SET_SORT_BY_EVENT:
      return {
        ...state,
        filterByEvent: action.payload,
        filterSet: createCurrentSet(state, action.payload, EVENT),
      };
    case SET_FILTER_BY_FAVOURITE:
      return {
        ...state,
        filterByFavourite: action.payload,
        filterSet: createCurrentSet(state, action.payload, FAVOURITE),
      };
    case SHOW_NOTIFICATION_PERMISSION_DIALOG:
      console.warn('SHOW_NOTIFICATION_PERMISSION_DIALOG', true);
      return {
        ...state,
        showNotificationPermissionDialog: true,
      };
    case HIDE_NOTIFICATION_PERMISSION_DIALOG:
      console.warn('HIDE_NOTIFICATION_PERMISSION_DIALOG', false);
      return {
        ...state,
        showNotificationPermissionDialog: false,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case VOTE_FOR:
      console.warn(VOTE_FOR);
      return {
        ...state,
        votingInProgress: true,
      };
    case SET_VOTE_OPTIONS:
      return {
        ...state,
        voteOptions: action.voteOptions,
        votingInProgress: false,
      };
    case SELECTED_POLL_RAW_INDEX:
      // console.warn('SELECTED_POLL_RAW_INDEX', action.payload);
      return {
        ...state,
        selectedPollRawIndex: action.payload,
      };
    case SET_POLL_VALUE:
      return {
        ...state,
        selectedPollTitle: action.payload,
      };
    case SET_POLL_RESULT:
      return {
        ...state,
        pollResult: action.payload,
        fetchingVotedPeopleInProgress: false,
      };
    case FETCHING_VOTED_PEOPLE_IN_PROGRESS:
      return {
        ...state,
        fetchingVotedPeopleInProgress: true,
      };
    case SHOW_WHO_VOTED_DIALOG:
      return {
        ...state,
        showWhoVoted: action.payload,
      };
    case SET_LAT_LON:
      return {
        ...state,
        isLatLonValid: true,
        getLatLonInProgress: false,
        latitude: Number(action.latitude),
        longitude: Number(action.longitude),
      };
    case GET_LAT_LON_IN_PROGRESS:
      return {
        ...state,
        getLatLonInProgress: true,
      };
    case RESET_LAT_LON:
      return {
        ...state,
        latitude: null,
        longitude: null,
      };
    case SET_IS_LAT_LON_VALID:
      return {
        ...state,
        isLatLonValid: action.payload,
        getLatLonInProgress: false,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
