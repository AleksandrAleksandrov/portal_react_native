import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View, Text } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
import Post, { Message } from './models/Post';
import Realm from 'realm';
import { NavigationBar, DropDownMenu } from '@shoutem/ui';

class App extends Component {


  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (

          <Provider store={store}>
            <Router />
          </Provider>
    );
  }
}

export default App;
