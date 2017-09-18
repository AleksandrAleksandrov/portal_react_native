import { AsyncStorage } from 'react-native';

const TOKEN = 'token';

export const getToken = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(TOKEN).then((settingsStr) => {
      resolve(settingsStr);
    });
  });
};

export async function setToken(token) {

  await AsyncStorage.setItem(TOKEN, token);
  getToken()
    .then((data) => {

    })
    .catch((error) => {
      console.warn(error);
    });
}
