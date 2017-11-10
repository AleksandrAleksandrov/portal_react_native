import {
  FETCH_ALBUM_LIST,
  SET_ALBUM_LIST,
  SET_REFRESH_STATUS,
} from './types';
import * as serviceREST from '../services/serviceREST';

const setAlbumsAction = (albums) => {
  return {
    type: SET_ALBUM_LIST,
    payload: albums,
  };
};

export const fetchAlbumsAction = () => (dispatch) => {
  serviceREST.fetchAlbums()
    .then((response) => {
      dispatch(setAlbumsAction(response.data));
    })
    .catch((error) => {

    });
};

const setRefreshStatus = isRefreshing => ({ type: SET_REFRESH_STATUS, payload: isRefreshing });

export const refreshAlbumsAction = () => (dispatch) => {
  dispatch(setRefreshStatus(true));
  serviceREST.fetchAlbums()
    .then((response) => {
      dispatch(setAlbumsAction(response.data));
      dispatch(setRefreshStatus(false));
    })
    .catch((error) => {

    });
};
