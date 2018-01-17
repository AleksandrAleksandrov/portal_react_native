import {
  SET_USERS_LIST,
  SET_MORE_USERS_TO_LIST,
  SET_USERS_ARE_LOADING,
  SET_MORE_USERS_ARE_LOADING,
} from './types';

import * as serviceREST from '../services/serviceREST';

const setUsersAction = (users, nextPage) => ({
  type: SET_USERS_LIST,
  payload: users,
  nextPage,
});

const setMoreUsersAction = (users, nextPage) => ({
  type: SET_MORE_USERS_TO_LIST,
  payload: users,
  nextPage,
});

const setUsersAreLoading = () => ({ type: SET_USERS_ARE_LOADING });

const setMoreUsersAreLoading = () => ({ type: SET_MORE_USERS_ARE_LOADING });

export const fetchUsersAction = () => (dispatch) => {
  dispatch(setUsersAreLoading());
  serviceREST.fetchUsers()
    .then((response) => {
      dispatch(setUsersAction(response.data.results, response.data.next));
    })
    .catch((error) => {

    });
};

export const fetchMoreUsersAction = url => (dispatch) => {
  dispatch(setMoreUsersAreLoading());
  serviceREST.fetchMoreUsers(url)
    .then((response) => {
      dispatch(setMoreUsersAction(response.data.results, response.data.next));
    })
    .catch((error) => {

    });
};
