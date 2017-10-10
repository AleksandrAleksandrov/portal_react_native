import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import StartScreen from './components/StartScreen';
import LoginForm from './components/LoginForm';
import TestLogin from './components/TestLogin';
import PostsListForm from './components/PostsListForm';
import PostForm from './components/PostForm';

const styles = {
  rootRouterStyle: {
    paddingTop: 60,
  },
};

const RouterComponent = () => (
  <Router>
    <Scene key="main">

      <Scene
        key="startScreen"
        component={StartScreen}
        hideNavBar={true}
        initial
      />
      <Scene
        key="login"
        component={LoginForm}
        title="Авторизация"
        panHandlers={null}
        animation={'fade'}
        type={'replace'}
        duration={1000}
      />
      <Scene

        key="postsList"
        component={PostsListForm}
        title="Portal"
        hideNavBar={true}
        panHandlers={null}
        animation={'fade'}
        type={'replace'}
      />
      <Scene
        hideNavBar={true}
        key="post"
        component={PostForm}
      />
    </Scene>
  </Router>);


export default RouterComponent;
