import DBHelper from '../models/DBHelper';
import {
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
  SET_MORE_POSTS_IN_PROGRESS
} from './types';
import { NOT_FOUND } from "../Constants";
import * as serviceREST from '../services/serviceREST';

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
  console.warn('setMorePostsInProgress');
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

// startfrom and count for pagination
export const getPosts = (url) => (dispatch) => {
  // console.warn('url', url);
  dispatch(setPostsAreLoading());

  // if (!url) {
  //   dispatch(setPostsAreLoading(null));
  // }
  
  serviceREST.getPosts(url)
  .then((response) => {
    // console.warn(response);
    // DBHelper.clearPosts();
    // DBHelper.writePostsToDB(response.data.results);
    if (url != null) {
      dispatch(addMorePosts(response.data));
    } else {
      dispatch(getPostsSuccess(response.data));
    }
    
    // if (!url) {
    //   dispatch(setPostsAreLoading(null));
    // }
    
    dispatch(setNextPage(response.data.next));
  })
  .catch((error) => {
    console.warn(error);
  });
};

export const getMorePosts = (url) => (dispatch) => {

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
}

export const addedToFavourite = (post) => {
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
        dispatch(addedToFavourite(response.data));
      }
      // dispatch(addRemoveSuccess(response.data));
    })
    .catch((error) => {
      console.warn('error:', error);
      dispatch(addRemoveFailed(error));
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
