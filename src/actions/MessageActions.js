import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import {
  ON_STAR_PRESSED,
  ADDED_TO_FAVOURITE,
  ADDING_TO_FAVOURITE_FAILED,
  GET_NEW_POST,
} from './types';
import * as serviceREST from '../services/serviceREST';

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

export const addedToFavourite = (post) => {
  return {
    type: GET_NEW_POST,
    payload: post,
  };
};

export const onStarPressed = (id, isFavourite) => (dispatch) => {
  dispatch({
    type: ON_STAR_PRESSED,
  });
  serviceREST.favourite({ id, isFavourite })
  .then((response) => {
    // console.warn('response:', response);
    dispatch(addedToFavourite(response.data));
    // dispatch(addRemoveSuccess(response.data));
  })
  .catch((error) => {
    // console.warn('error:', error);
    dispatch(addRemoveFailed(error));
  });
};
