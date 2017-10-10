import { NetInfo } from 'react-native';
import { create, https } from 'apisauce';
import { setToken, getToken } from './StorageHelper';
import { URL } from '../Constants';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SECCESS,
  LOGIN_USER_FAIL,
} from '../actions/types';

const api = create({
  baseURL: URL,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
  timeout: 10000,
});

export const setTokenToHeaders = (token) => {
  // console.warn('setTokenToHeaders', token);
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

export const getProducts = () => new Promise((resolve, reject) => {
  api
  .get('products/')
  .then((response) => {
    if (response.ok) {
      resolve(response);
    } else {
      requestErrorHandler(response, reject);
    }
  })
  .catch((error) => {
    console.warn('getProducts error:', error);
    reject(error);
  });
});

export const getProductReviews = id => new Promise((resolve, reject) => {
  api
  .get(`reviews/${id}`)
  .then((response) => {
    if (response.ok) {
      resolve(response);
    } else {
      requestErrorHandler(response, reject);
    }
  })
  .catch((error) => {
    console.warn('getProductReviews error:', error);
    reject(error);
  });
});

export const postReview = (data, id) => new Promise((resolve, reject) => {
  api.post(`reviews/${id}`, data)
  .then((response) => {
    if (response.ok) {
      resolve(response);
    }
    resolve(response);
  })
  .catch((error) => {
    console.warn('postReview error:', error);
    reject(error);
  });
});

export const postLogin = data => new Promise((resolve, reject) => {
  // NetInfo.isConnected.fetch().then(isConnected => {
  //   function handleFirstConnectivityChange(connectionInfo) {
  //     NetInfo.isConnected.fetch().then(isConnected => {
  //       if (isConnected) {
          api.post(`/api/auth/login/`, data)
          .then((response) => {
            if (response.ok) {
              setToken(response.data.user.token);
              setTokenToHeaders(response.data.user.token);
              resolve(response);
            } else {
              reject(response.data ? response.data.detail : 'Не удалось подключится к серверу');
            }
          })
          .catch((error) => {
            reject(error);
          });
  //       } else {
  //         reject('Нет подключения к интернету');
  //       }
  //     });
  //     NetInfo.removeEventListener(
  //       'connectionChange',
  //     handleFirstConnectivityChange,
  //   );
  //   }
  //   NetInfo.addEventListener(
  //     'connectionChange',
  //     handleFirstConnectivityChange,
  //   );
  // });
});


export const getPosts = (url) => {
  return new Promise((resolve, reject) => {

      api.get('/api/user_messages/')
      .then((response) => {
        if (response.ok) {
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
        console.warn(error);
      });

  });
};

export const getMorePosts = (url) => {
  return new Promise((resolve, reject) => {
    api.get(url)
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          console.warn(response);
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  });
};

export const restorePassword = email => {
  return new Promise((resolve, reject) => {
    api.post(`/api/auth/password/reset/`, { email: email})
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
 * Get filtered by advert, poll, event posts.
 */
export const getFilteredPosts = (query) => {
  return new Promise((resolve, reject) => {
    api.get("/api/user_messages/?" + createQuery(query))
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
        console.warn('getFilteredPosts', error);
      })
  });
};
const createQuery = (params) => {
  let query = '';
  params.forEach((objectKey, index) => {
    query += 'type=' + params[index] + '&';
  });
  return query;
};

/**
 * Mark message as read
 * @param postId
 * @returns {Promise}
 */
export const setAsRead = (postId) => {
  return new Promise((resolve, reject) => {
    api.patch(`/api/user_messages/${postId}/`, { is_readed: true })
      .then((response) => {
        resolve(response);
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
  return new Promise((resolve, reject) => {
    api.get(`/api/messages/${messageId}/comments/`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 *
 * Add/remove post from favourite.
 * @param id
 * @param isFavourite
 * @returns {Promise}
 */

export const favourite = ({ id, isFavourite }) => {
  return new Promise((resolve, reject) => {
      api.patch(`/api/user_messages/${id}/`, { is_favorite: isFavourite })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        // console.warn('favourite fail', error);
        reject(error);
        // console.warn(error);
      });
  });
};

