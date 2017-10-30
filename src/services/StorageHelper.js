import { AsyncStorage } from 'react-native';
import { MY_ID } from '../Constants';

const TOKEN = 'token';
const NEXT_PAGE = 'next_page';

export const getToken = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(TOKEN).then((settingsStr) => {
      resolve(settingsStr);
    });
  });
};

export async function setMyId(id) {
  await AsyncStorage.setItem(MY_ID, JSON.stringify(id));
}

export const getMyId = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(MY_ID).then((settingsStr) => {
      resolve(settingsStr);
    });
  });
};

export async function setToken(token) {
  await AsyncStorage.setItem(TOKEN, token);
}

export const getNextPage = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(NEXT_PAGE)
      .then((nextPageString) => {
        resolve(nextPageString);
      });
  });
};

export async function setNextPost(nextPage) {
  await AsyncStorage.setItem(NEXT_PAGE, nextPage);
}
