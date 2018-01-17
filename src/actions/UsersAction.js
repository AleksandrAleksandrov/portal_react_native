import {
  SET_USERS_LIST,
} from './types'

import * as serviceREST from '../services/serviceREST';

const setUsersAction = users => ({
  type: SET_USERS_LIST,
  payload: users,
});

export const fetchUsersAction = () => (dispatch) => {
  serviceREST.fetchUsers()
    .then((response) => {
      dispatch(setUsersAction(response.data.results));
    })
    .catch((error) => {

    });
};
