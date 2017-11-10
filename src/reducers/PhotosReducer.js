import {
  FETCH_ALBUM_LIST,
  SET_ALBUM_LIST,
  SET_REFRESH_STATUS,
} from '../actions/types';

const INITIAL_STATE = {
  albums: {},
  fetchingAlbumsInProgress: false,
  refreshingAlbumsInProgress: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALBUM_LIST:
      return {
        ...state,
        fetchingAlbumsInProgress: true,
      };
    case SET_ALBUM_LIST:
      return {
        ...state,
        fetchingAlbumsInProgress: false,
        albums: action.payload,
      };
    case SET_REFRESH_STATUS:
      return {
        ...state,
        refreshingAlbumsInProgress: action.payload,
      };
    default:
      return state;
  }
};
