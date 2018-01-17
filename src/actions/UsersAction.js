
import * as serviceREST from '../services/serviceREST';

export const fetchUsersAction = () => (dispatch) => {
  serviceREST.fetchUsers()
    .then((response) => {

    })
    .catch((error) => {

    });
};
