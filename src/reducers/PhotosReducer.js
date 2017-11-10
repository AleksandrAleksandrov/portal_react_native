import {
  FETCH_ALBUM_LIST,
  SET_ALBUM_LIST,
  SET_REFRESH_STATUS,
  SET_PHOTOS_FOR_ALBUM,
  FETCH_PHOTOS_FOR_ALBUM,
  RESET_PHOTOS,
} from '../actions/types';

const INITIAL_STATE = {
  albums: {},
  fetchingAlbumsInProgress: false,
  refreshingAlbumsInProgress: false,
  photos: [],
  fetchingPhotosForAlbumInProgress: false,
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
    case FETCH_PHOTOS_FOR_ALBUM:
      return {
        ...state,
        fetchingPhotosForAlbumInProgress: true,
      };
    case SET_PHOTOS_FOR_ALBUM:
      // console.warn('SET_PHOTOS_FOR_ALBUM', action.payload);
      return {
        ...state,
        photos: action.payload,
        fetchingPhotosForAlbumInProgress: false,
      };
    case RESET_PHOTOS:
      return {
        ...state,
        photos: [],
      };
    default:
      return state;
  }
};
