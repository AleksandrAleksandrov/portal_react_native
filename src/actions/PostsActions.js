import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import Post, { Message } from '../models/Post';
import DBHelper from '../models/DBHelper';
// import Message from '../models/Message';
// import Message from '../models/Message';
import Realm from 'realm';
import {
  URL,
  POSTS_FETCH_SUCCESS,
} from './types';
import * as serviceREST from '../services/serviceREST';

// startfrom and count for pagination
export const getPosts = (startFrom, count) => (dispatch) => {
  serviceREST.getPosts(startFrom, count)
  .then((results) => {
    
    DBHelper.clearPosts();
    DBHelper.writePostsToDB(results);
    dispatch(getPostsSuccess(results));
    // writePostsToDB(results);

  })
  .catch((error) => {
    console.warn(error);
  });
};

const getPostsSuccess = (data) => {
  return {
    type: POSTS_FETCH_SUCCESS,
    payload: data,
  };
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
