import {
  FETCH_ALBUM_LIST,
  SET_ALBUM_LIST,
  SET_REFRESH_STATUS,
  SET_PHOTOS_FOR_ALBUM,
  FETCH_PHOTOS_FOR_ALBUM,
  RESET_PHOTOS,
  SHOW_HIDE_FULL_SCREEN_PHOTOS,
  SET_FULL_PHOTO_INDEX,
  SET_PHOTO_DOWNLOADING_STATUS,
} from '../actions/types';

const INITIAL_STATE = {
  albums: {},
  fetchingAlbumsInProgress: false,
  refreshingAlbumsInProgress: false,
  albumTitle: '',
  photos: [],
  fetchingPhotosForAlbumInProgress: false,
  urls: [],
  isFullScreenPhotos: false,
  fullScreenPhotoIndex: 1,
  photoDownloadingInProgress: false,
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
      action.payload.forEach((objectKey) => {
        urlss.push({ url: objectKey.preview, file: objectKey.file });
      });
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
    case SET_PHOTO_DOWNLOADING_STATUS:
      return {
        ...state,
        photoDownloadingInProgress: action.payload,
      };
    default:
      return state;
  }
};
