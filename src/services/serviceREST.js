import { create } from 'apisauce';
import axios from 'axios';
import { setToken } from './StorageHelper';
import { createQuery } from '../utils/StringUtils';
import {
  URL,
  AUTH,
  SUBSCRIBE_TO_GET_NOTIFICATIONS,
  MESSAGES,
  USER_MESSAGE,
  PASSWORD_RESET,
  USER,
  VOTE_FOR,
  GET_POLL_RESULT,
  FETCH_COMMENTS,
  SEND_COMMENT,
  FETCH_ALBUMS,
  FETCH_PHOTOS_FROM_ALBUM
} from '../ApiConstants';

const api = create({
  baseURL: URL,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
  timeout: 10000,
});

export const getExpand = (url) => {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {
        // getLatLon(response.request.responseURL);
        resolve(response.request.responseURL);
      })
      .catch((error) => {
        console.warn('getExpandERRor', error);
        reject(error);
      });
  });
};

export const getLatLon = (url) => {
  return new Promise((resolve, reject) => {
    getExpand(url)
      .then((response) => {
        let latLon;
        let parts = response.split('!3d');
        if (parts.length >= 2) {
          let coord = parts[1].split('!4d');
          if (isNaN(coord[1])) {
            const ll = coord[1];
            const re = '?';
            const found = ll.split(re);

            coord[1] = found[0];
          }
          if (!isNaN(coord[0]) & !isNaN(coord[1])) {
            resolve(coord);
          }
          reject();
        }
        reject();
      });
  });
};

/**
 * Set token to every header that go with requests
 * @param token
 */
export const setTokenToHeaders = (token) => {
  if (token) {
    api.setHeaders({
      Authorization: `Token ${token}`,
    });
  } else {
    api.setHeaders({
      Authorization: null,
    });
  }
};

/**
 * Subscribe device to receive push notifications.
 * @param deviceId
 * @returns {Promise}
 */
export const subscribeToNotifications = (deviceId) => {
  return new Promise((resolve, reject) => {
    api.post(SUBSCRIBE_TO_GET_NOTIFICATIONS, { player_id: deviceId })
      .then((response) => {
        console.warn('SUBSCRIBE_TO_GET_NOTIFICATIONS', response);
        resolve(response);
      })
      .catch((error) => {
        console.warn('SUBSCRIBE_TO_GET_NOTIFICATIONS', error);
        reject(error);
      });
  });
};

/**
 * Authorize with email and password.
 * @param data contains email and password
 * @returns {Promise}
 */
export const postLogin = (data) => {
  return new Promise((resolve, reject) => {
    api.post(AUTH, data)
      .then((response) => {
        if (response.ok) {
          setToken(response.data.key);
          setTokenToHeaders(response.data.key);
          resolve(response);
        } else {
          console.warn('response', response);
          reject(response.data ? response.data.detail : 'Не удалось подключится к серверу');
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Fetch my own user model to fill personal data.
 * @returns {Promise}
 */
export const getUser = () => {
  return new Promise((resolve, reject) => {
    api.get(USER)
      .then((response) => {
        if (response.ok) {
          resolve(response.data);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Get posts list.
 * @returns {Promise}
 */
export const getPosts = () => {
  return new Promise((resolve, reject) => {
    api.get(USER_MESSAGE)
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// export const getPosts = () => api.get(USER_MESSAGE);

/**
 * Get more posts by pagination.
 * @param next page url
 * @returns {Promise}
 */
export const getMorePosts = (url) => {
  return new Promise((resolve, reject) => {
    api.get(url)
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Restore password with email.
 * @param email
 * @returns {Promise}
 */
export const restorePassword = (email) => {
  return new Promise((resolve, reject) => {
    api.post(PASSWORD_RESET, { email: email })
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// export const restorePassword = (email) => api.post(PASSWORD_RESET, { email: email });

/**
 * Get filtered by advert, poll, event posts.
 * @param query
 * @returns {Promise}
 */
export const getFilteredPosts = (query) => {
  return new Promise((resolve, reject) => {
    api.get(`${USER_MESSAGE}?` + createQuery(query))
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Mark message as read
 * @param postId
 * @returns {Promise}
 */
export const setAsRead = (postId) => {
  return new Promise((resolve, reject) => {
    api.patch(`${USER_MESSAGE}${postId}/`, { is_readed: true })
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Fetch comments from the server by message id
 * @param messageId
 * @returns {Promise}
 */
export const getComments = (messageId) => {
  console.warn('fetching all comments');
  return new Promise((resolve, reject) => {
    api.get(`${MESSAGES}${messageId}/comments/`)
      .then((response) => {
        if (response.ok) {
          console.warn('fetched comments', response);
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Add/remove post from favourite.
 * @param id
 * @param isFavourite
 * @returns {Promise}
 */
export const favourite = ({ id, isFavourite }) => {
  return new Promise((resolve, reject) => {
    api.patch(`${USER_MESSAGE}${id}/`, { is_favorite: isFavourite })
    .then((response) => {
      if (response.ok) {
        resolve(response);
      } else {
        reject(response);
      }
    })
    .catch((error) => {
      reject(error);
    });
  });
};

/**
 * Vote for option
 * @param id - option id
 * @returns {Promise}
 */
export const voteFor = (id) => {
  return new Promise((resolve, reject) => {
    api.post(VOTE_FOR, { option: id })
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Get poll results by message id.
 * @param messageId
 * @returns {Promise}
 */
export const fetchPollResults = (messageId) => {
  return new Promise((resolve, reject) => {
    api.get(`${MESSAGES}${messageId}${GET_POLL_RESULT}`)
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Send comment for post.
 * @param messageId
 * @param text
 * @returns {Promise}
 */
export const sendComment = (messageId, text) => {
  return new Promise((resolve, reject) => {
    api.post(SEND_COMMENT, { text, message: messageId })
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Fetch list of albums.
 * @returns {Promise}
 */
export const fetchAlbums = () => {
  return new Promise((resolve, reject) => {
    api.get(FETCH_ALBUMS)
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * Fetch all photos from album.
 * @param albumId
 * @returns {Promise}
 */
export const fetchPhotosFromAlbum = (albumId) => {
  return new Promise((resolve, reject) => {
    api.get(`${FETCH_ALBUMS}${albumId}${FETCH_PHOTOS_FROM_ALBUM}`)
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
