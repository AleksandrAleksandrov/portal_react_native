import DBHelper from '../models/DBHelper';
import {
  POSTS_FETCH_SUCCESS,
  SET_POSTS_ARE_LOADING,
  SET_NEXT_PAGE,
  ADD_MORE_POSTS_SUCCESS,
} from './types';
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
