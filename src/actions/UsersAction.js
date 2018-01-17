import {
  SET_USERS_LIST,
  SET_MORE_USERS_TO_LIST,
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

export const fetchUsersAction = () => (dispatch) => {
  serviceREST.fetchUsers()
    .then((response) => {
      dispatch(setUsersAction(response.data.results, response.data.next));
    })
    .catch((error) => {

    });
};

export const fetchMoreUsersAction = url => (dispatch) => {
  serviceREST.fetchMoreUsers(url)
    .then((response) => {
      dispatch(setMoreUsersAction(response.data.results, response.data.next));
    })
    .catch((error) => {

    });
};
