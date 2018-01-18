import DBHelper from '../models/DBHelper';
import {
  RESET_ERROR,
  POSTS_FETCH_SUCCESS,
  SET_POSTS_ARE_LOADING,
  SET_NEXT_PAGE,
  ADD_MORE_POSTS_SUCCESS,
  ADDED_TO_FAVOURITE,
  ADDING_TO_FAVOURITE_FAILED,
  DELETE_POST_BY_ID,
  SET_CURRENT_POST,
  ON_STAR_PRESSED,
  GET_NEW_POST,
  SET_MORE_POSTS_IN_PROGRESS,
  START_REFRESH,
  FINISH_REFRESH,
  SET_FETCHING_COMMENTS,
  SET_FETCHING_COMMENTS_FINISHED,
  SHOW_SORT_BY_DIALOG,
  HIDE_SORT_BY_DIALOG,
  SET_SORT_BY_ADVERT,
  SET_SORT_BY_POLL,
  SET_SORT_BY_EVENT,
  SET_FILTER_BY_FAVOURITE,
  HIDE_NOTIFICATION_PERMISSION_DIALOG,
  SET_USER,
  SET_VOTE_OPTIONS,
  VOTE_FOR,
  SHOW_WHO_VOTED_DIALOG,
  FETCH_POLL_RESULT,
  SET_POLL_RESULT,
  FETCHING_VOTED_PEOPLE_IN_PROGRESS,
  SELECTED_POLL_RAW_INDEX,
  SET_POLL_VALUE,
  SENDING_COMMENT_IN_PROGRESS,
  COMMENT_SENT,
  COMMENT_SENT_FAIL,
  SHOW_ALL_COMMENTS,
  SET_LAT_LON,
  GET_LAT_LON_IN_PROGRESS,
  RESET_LAT_LON,
  SET_IS_LAT_LON_VALID,
  SET_POSTS,
  SET_WEEK_BIRTHDAYS,
  SET_ERROR_WEEK_BIRTHDAYS,
} from './types';
import { NOT_FOUND } from '../Constants';
import * as serviceREST from '../services/serviceREST';

export const resetError = () => {
  return {
    type: RESET_ERROR,
  };
};

/**
 * Set user model to state.
 * @param data - user model
 * @returns {{type, payload: *}}
 */
const setUser = (data) => {
  return {
    type: SET_USER,
    payload: data,
  };
};

/**
 * Get my own user model to fill personal data
 */
const getUser = () => (dispatch) => {
  serviceREST.getUser()
    .then((response) => {
      dispatch(setUser(response));
    })
    .catch((error) => {

    });
};

export const setPostsAction = posts => ({
  type: SET_POSTS,
  payload: posts,
});

const getPostsSuccess = (data) => {
  return {
    type: POSTS_FETCH_SUCCESS,
    payload: data.results,
    nextPage: data.next,
  };
};

const addMorePosts = (data) => {
  return {
    type: ADD_MORE_POSTS_SUCCESS,
    payload: data.results,
    nextPage: data.next,
  };
};

const setPostsAreLoading = () => {
  return {
    type: SET_POSTS_ARE_LOADING,
  };
};

const setMorePostsInProgress = () => {
  return {
    type: SET_MORE_POSTS_IN_PROGRESS,
  };
};

const setNextPage = (data) => {
  return {
    type: SET_NEXT_PAGE,
    payload: data.next,
  };
};

export const startRefresh = () => ({ type: START_REFRESH });

export const finishRefresh = () => ({ type: FINISH_REFRESH });

export const refreshPosts = () => (dispatch) => {
  dispatch(startRefresh());
  serviceREST.getPosts()
    .then((response) => {
      dispatch(getPostsSuccess(response.data));
      dispatch(setNextPage(response.data.next));
      dispatch(finishRefresh());
    })
    .catch((error) => {
      console.warn('refreshPostsActionError:', error);
      dispatch(finishRefresh());
    });
};

export const getPostsFromNotification = () => (dispatch) => {
  serviceREST.getPosts()
    .then((response) => {
      dispatch(getPostsSuccess(response.data));
      dispatch(setNextPage(response.data.next));
    })
    .catch((error) => {
      console.warn(error);
    });
};

// startfrom and count for pagination
export const getPosts = () => (dispatch) => {
  dispatch(getUser());
  dispatch(setPostsAreLoading());
  serviceREST.getPosts()
  .then((response) => {
    // console.warn(response);
    DBHelper.clearPosts();
    DBHelper.writePostsToDB(response.data.results);
    dispatch(getPostsSuccess(response.data));
    // if (!url) {
    //   dispatch(setPostsAreLoading(null));
    // }
    
    // dispatch(setNextPage(response.data.next));
  })
  .catch((error) => {
    console.warn('getPostsActionError', error);
  });
};

export const getMorePosts = (url) => (dispatch) => {
  dispatch(setMorePostsInProgress());
  serviceREST.getMorePosts(url)
    .then((response) => {

      if (url != null) {
        dispatch(addMorePosts(response.data));
      } else {
        dispatch(getPostsSuccess(response.data));
      }

      dispatch(setNextPage(response.data.next));
    })
    .catch((error) => {
      // console.warn(error);
    });
};

export const addRemoveSuccess = (post) => {
  return {
    type: ADDED_TO_FAVOURITE,
    payload: post,
  };
};

export const addRemoveFailed = (post) => {
  return {
    type: ADDING_TO_FAVOURITE_FAILED,
    payload: post,
  };
};

export const deletePostById = (id) => {
  return {
    type: DELETE_POST_BY_ID,
    payload: id,
  };
};

export const setNewPost = (post) => {
  return {
    type: SET_CURRENT_POST,
    payload: post,
  };
};

export const onStarPressed = (id, isFavourite) => (dispatch) => {
  dispatch({
    type: ON_STAR_PRESSED,
    payload: id,
  });
  serviceREST.favourite({ id, isFavourite })
    .then((response) => {
      if (response.data.detail === NOT_FOUND) {
        dispatch(deletePostById(id));
      } else {
        dispatch(setNewPost(response.data));
      }
      // dispatch(addRemoveSuccess(response.data));
    })
    .catch((error) => {
      console.warn('error:', error);
      dispatch(addRemoveFailed(error));
    });
};

export const setFetchingCommentsInProgress = () => {
  return {
    type: SET_FETCHING_COMMENTS,
  };
};

export const setComments = (response) => {
  return {
    type: SET_FETCHING_COMMENTS_FINISHED,
    payload: response.data,
  };
};

export const getComments = (messageId) => (dispatch) => {
  dispatch(setFetchingCommentsInProgress);
  serviceREST.getComments(messageId)
    .then((response) => {
      dispatch(setComments(response));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const setAsRead = (postId) => (dispatch) => {
  serviceREST.setAsRead(postId)
    .then((response) => {
      if (response.data.detail === NOT_FOUND) {
        dispatch(deletePostById(postId));
      } else {
        dispatch(setNewPost(response.data));
      }
    })
    .catch((error) => {

    });
};

export const showFilterBy = () => {
  return {
    type: SHOW_SORT_BY_DIALOG,
  };
};

export const hideFilterBy = () => {
  return {
    type: HIDE_SORT_BY_DIALOG,
  };
};

export const setAdvert = (isChecked) => (dispatch) => {
  dispatch({
    type: SET_SORT_BY_ADVERT,
    payload: isChecked,
  });
  return Promise.resolve();
};

export const setPoll = (isChecked) => (dispatch) => {
  dispatch({
    type: SET_SORT_BY_POLL,
    payload: isChecked,
  });
  return Promise.resolve();
};

export const setEvent = (isChecked) => (dispatch) => {
  dispatch({
    type: SET_SORT_BY_EVENT,
    payload: isChecked,
  });
  return Promise.resolve();
};

export const setFavourite = isFavourite => (dispatch) => {
  dispatch({
    type: SET_FILTER_BY_FAVOURITE,
    payload: isFavourite,
  });
  return Promise.resolve();
};

export const getFilteredPosts = (query) => (dispatch) => {
  dispatch(startRefresh());
  serviceREST.getFilteredPosts(query)
    .then((response) => {
      dispatch(getPostsSuccess(response.data));
      dispatch(finishRefresh());
    })
    .catch((error) => {
      console.warn("ERROR", error);
      dispatch(finishRefresh());
    });
};

export const hideShowNotificationDialog = () => {
  return {
    type: HIDE_NOTIFICATION_PERMISSION_DIALOG,
  };
};

export const setVoteOptions = (voteOptions) => {
  return {
    type: SET_VOTE_OPTIONS,
    voteOptions,
  };
};

export const vote = () => {
  return {
    type: VOTE_FOR,
  };
};

export const voteFor = (id) => (dispatch) => {
  dispatch(vote());
  serviceREST.voteFor(id)
    .then((response) => {
      dispatch(setVoteOptions(response.data.options));
    })
    .catch((error) => {
      console.warn(error);
    });
  return {
    type: VOTE_FOR,
  };
};

export const showWhoVotedDialog = (isShow) => {
  return {
    type: SHOW_WHO_VOTED_DIALOG,
    payload: isShow,
  };
};

const setPollResult = (pollResult) => {
  return {
    type: SET_POLL_RESULT,
    payload: pollResult,
  };
};

export const getPollResultsAction = (messageId) => (dispatch) => {
  serviceREST.fetchPollResults(messageId)
    .then((response) => {
      dispatch(setPollResult(response.data.options));
    })
    .catch((error) => {
      console.warn('getPollResultsAction', error);
    });
  return {
    type: FETCHING_VOTED_PEOPLE_IN_PROGRESS,
  };
};

export const setSelectedPollRawIndexAction = (index) => {
  // console.warn('setSelectedPollRawIndexAction', index);
  return {
    type: SELECTED_POLL_RAW_INDEX,
    payload: index,
  };
};

export const setPollValueAction = (value) => {
  return {
    type: SET_POLL_VALUE,
    payload: value,
  };
};

const setCommentSent = () => {
  return {
    type: COMMENT_SENT,
  };
};

const setCommentSentFailed = () => {
  return {
    type: COMMENT_SENT_FAIL,
  };
};

const setSendingCommentInProgress = () => {
  return {
    type: SENDING_COMMENT_IN_PROGRESS,
  };
};

export const sendCommentAction = (messageId, text, callback) => (dispatch) => {
  dispatch(setSendingCommentInProgress());
  serviceREST.sendComment(messageId, text)
    .then((response) => {
      dispatch(getComments(messageId));
      callback();
      dispatch(setCommentSent());
    })
    .catch((error) => {
      dispatch(setCommentSentFailed());
    });
};

export const showAllCommentsAction = () => ({ type: SHOW_ALL_COMMENTS });

export const setLatLonAction = (latitude, longitude) => {
  return {
    type: SET_LAT_LON,
    latitude,
    longitude,
  };
};

export const resetLatLon = () => ({ type: RESET_LAT_LON });

export const setLatLonIsValid = (isValid) => ({ type: SET_IS_LAT_LON_VALID, payload: isValid });

const setGettingLatLonInProgress = () => ({ type: GET_LAT_LON_IN_PROGRESS });

export const getLatLonAction = (url) => (dispatch) => {
  dispatch(setGettingLatLonInProgress());
  serviceREST.getLatLon(url)
    .then((response) => {
      dispatch(setLatLonAction(response[0], response[1]));
    })
    .catch((error) => {
      console.warn('getLatLonActionERROR', error);
      dispatch(setLatLonIsValid(false));
    });
};

const setWeekBirthdays = users => ({
  type: SET_WEEK_BIRTHDAYS,
  payload: users,
});

const setErrorWeekBirthdays = error => ({
  type: SET_ERROR_WEEK_BIRTHDAYS,
  payload: error,
});

export const fetchWeekBirthdays = () => (dispatch) => {
  serviceREST.fetchWeekBirthdays()
    .then((response) => {
      dispatch(setWeekBirthdays(response.data));
    })
    .catch((error) => {
      dispatch(setErrorWeekBirthdays(error));
    });
};

// const Post = {
//   name: 'Post',
//   properties: {
//     id: 'int',
//     user: 'int',
//     message: 'Message',
//   },
// };

// const Message = {
//   name: 'Message',
//   properties: {
//     id: { type: 'int' }
//     // title: 'string',
//     // message_type: 'string',
//     // create_dt: 'string',
//   },
// };
