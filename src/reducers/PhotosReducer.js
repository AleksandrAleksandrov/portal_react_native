import {
  FETCH_ALBUM_LIST,
  SET_ALBUM_LIST,
  SET_REFRESH_STATUS,
  SET_PHOTOS_FOR_ALBUM,
  FETCH_PHOTOS_FOR_ALBUM,
  RESET_PHOTOS,
  SHOW_HIDE_FULL_SCREEN_PHOTOS,
  SET_FULL_PHOTO_INDEX,
} from '../actions/types';

const INITIAL_STATE = {
  albums: {},
  fetchingAlbumsInProgress: false,
  refreshingAlbumsInProgress: false,
  photos: [],
  fetchingPhotosForAlbumInProgress: false,
  urls: [],
  isFullScreenPhotos: false,
  fullScreenPhotoIndex: null,
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
      const urlss = new Array();
      action.payload.forEach((objectKey, index) => {
        urlss.push({ url: objectKey.thumbnail });
      });
      // console.warn('SET_PHOTOS_FOR_ALBUM', urlss);
      // console.warn('SET_PHOTOS_FOR_ALBUM', action.payload);
      return {
        ...state,
        photos: action.payload,
        fetchingPhotosForAlbumInProgress: false,
        urls: urlss,
      };
    case SHOW_HIDE_FULL_SCREEN_PHOTOS:
      return {
        ...state,
        isFullScreenPhotos: action.payload,
      };
    case SET_FULL_PHOTO_INDEX:
      return {
        ...state,
        fullScreenPhotoIndex: action.payload,
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
