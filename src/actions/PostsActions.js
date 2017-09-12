import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {
  URL,
  POSTS_FETCH_SUCCESS
} from './types';
import * as serviceREST from '../services/serviceREST';

export const getPosts = () => (dispatch) => {
  serviceREST.getPosts()
  .then((results) => {
    dispatch(getPostsSuccess(results));
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
