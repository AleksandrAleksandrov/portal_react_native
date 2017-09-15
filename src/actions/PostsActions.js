import DBHelper from '../models/DBHelper';
import {
  POSTS_FETCH_SUCCESS,
  SET_POSTS_ARE_LOADING,
} from './types';
import * as serviceREST from '../services/serviceREST';

const getPostsSuccess = (data) => {
  return {
    type: POSTS_FETCH_SUCCESS,
    payload: data,
  };
};

const setPostsAreLoading = (data) => {
  return {
    type: SET_POSTS_ARE_LOADING,
    payload: data,
  };
};

// startfrom and count for pagination
export const getPosts = (startFrom, count) => (dispatch) => {
  dispatch(setPostsAreLoading(true));
  serviceREST.getPosts(startFrom, count)
  .then((results) => {
    DBHelper.clearPosts();
    DBHelper.writePostsToDB(results);
    dispatch(getPostsSuccess(results));
    dispatch(setPostsAreLoading(false));
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
