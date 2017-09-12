import { create } from 'apisauce';
import { AsyncStorage } from 'react-native';

const REQUEST_URL = 'https://www.portal.light-it.net';

const api = create({
  baseURL: REQUEST_URL,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
  timeout: 10000,
});

export const getToken = () => {
  AsyncStorage.getItem('token').then((settingsStr) => {
    return settingsStr;
  });
};

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
//
// export const requestErrorHandler = (response, reject) => {
//   if (response.problem !== null) {
//     const error = `${response.problem}`;
//     reject(error);
//   } else {
//     reject('Sorry, something went wrong ...');
//   }
// };

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

export const postRegister = data => new Promise((resolve, reject) => {
  api.post('register/', data)
  .then((response) => {
    if (response.ok) {
      setTokenToHeaders(response.data.token);
      resolve(response);
    }
    resolve(response);
  })
  .catch((error) => {
    console.warn('postRegistration error:', error);
    reject(error);
  });
});

export const postLogin = data => new Promise((resolve, reject) => {
  api.post('/api/auth/login/', data)
  .then((response) => {
    if (response.ok) {
      // setTokenToHeaders(response.data.token);
      resolve(response);
    }
    resolve(response);
  })
  .catch((error) => {
    console.warn('postLogin error:', error);
    reject(error);
  });
});

export const getPosts = () => {
  return new Promise((resolve, reject) => {
    setTokenToHeaders('5163522b2705364cc2a60e54a426159a8c8422b4');
    api.get('/api/user_messages/')
    .then((response) => {
      if (response.ok) {
        // console.warn("getPosts response", response);
        resolve(response.data.results);
      }
    })
    .catch((error) => {
      console.warn(error);
    });
  });
};
