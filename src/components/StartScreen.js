import { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { getToken } from '../services/StorageHelper';

class StartScreen extends Component {
  componentWillMount() {
    getToken()
    .then((data) => {
      if (data === null) {
        Actions.login();
      } else {
        Actions.postsList();
      }
    })
    .catch((error) => {
      console.warn(error);
    });
  }

  render() {
    return (
      null
    );
  }
}

export default StartScreen;
