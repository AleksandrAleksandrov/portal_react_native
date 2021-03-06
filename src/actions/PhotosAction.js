import {
  SET_ALBUM_LIST,
  SET_REFRESH_STATUS,
  SET_PHOTOS_FOR_ALBUM,
  FETCH_PHOTOS_FOR_ALBUM,
  RESET_PHOTOS,
  SHOW_HIDE_FULL_SCREEN_PHOTOS,
  SET_FULL_PHOTO_INDEX,
  SET_PHOTO_DOWNLOADING_STATUS,
  SET_UPLOAD_FILE_TO_ALBUM_STATUS,
  UPLOAD_FILE_TO_ALBUM,
} from './types';
import * as serviceREST from '../services/serviceREST';

const setAlbumsAction = albums => ({
  type: SET_ALBUM_LIST,
  payload: albums,
});

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

export const resetPhotosAction = () => ({ type: RESET_PHOTOS });

const setPhotosForAlbumStatusAction = isLoading => ({
  type: FETCH_PHOTOS_FOR_ALBUM,
  payload: isLoading,
});

const setPhotosForAlbumAction = photos => ({
  type: SET_PHOTOS_FOR_ALBUM,
  payload: photos,
});

export const fetchPhotosFromAlbumAction = albumId => async (dispatch) => {
  dispatch(setPhotosForAlbumStatusAction(true));
  try {
    const response = await serviceREST.fetchPhotosFromAlbum(albumId);
    dispatch(setPhotosForAlbumStatusAction(false));
    dispatch(setPhotosForAlbumAction(response.data));
  } catch (error) {

  }

    // .then((response) => {
    //   dispatch(setPhotosForAlbumStatusAction(false));
    //   dispatch(setPhotosForAlbumAction(response.data));
    // })
    // .catch((error) => {
    //
    // });
};

// export const fetchPhotosFromAlbumAction = albumId => (dispatch) => {
//   dispatch(setPhotosForAlbumStatusAction(true));
//   serviceREST.fetchPhotosFromAlbum(albumId)
//     .then((response) => {
//       dispatch(setPhotosForAlbumStatusAction(false));
//       dispatch(setPhotosForAlbumAction(response.data));
//     })
//     .catch((error) => {
//
//     });
// };

export const setFullPhotoIndexAction = index => ({
  type: SET_FULL_PHOTO_INDEX,
  payload: index,
});

export const showHideFullScreenPhotosAction = isShow => ({
  type: SHOW_HIDE_FULL_SCREEN_PHOTOS,
  payload: isShow,
});

export const downloadPhotoAction = isDownloading => ({
  type: SET_PHOTO_DOWNLOADING_STATUS,
  payload: isDownloading,
});

const setUploadFileStatus = isUploading => ({
  type: SET_UPLOAD_FILE_TO_ALBUM_STATUS,
  payload: isUploading,
});

export const uploadFileToAlbumAction = (albumId, uri) => (dispatch) => {
  dispatch(setUploadFileStatus(true));
  serviceREST.uploadFileToAlbum(albumId, uri)
    .then((response) => {
      console.warn('uploadFileToAlbumAction', response);
      dispatch(setUploadFileStatus(false));
    })
    .catch((error) => {
      console.warn('ErroruploadFileToAlbumAction', error);
      dispatch(setUploadFileStatus(false));
    });
};
