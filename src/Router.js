import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import StartScreen from './components/StartScreen';
import LoginForm from './components/LoginForm';
import PostsListForm from './components/PostsListForm';
import PostForm from './components/PostForm';

const styles = {
  rootRoutreStyle: {
    paddingTop: 60,
  },
};

const RouterComponent = () => (
  <Router sceneStyle={styles.rootRoutreStyle}>
    <Scene key="main">
      <Scene
        key="startScreen"
        component={StartScreen}
        title="Start"
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
        panHandlers={null}
        animation={'fade'}
        type={'replace'}
        duration={1000}
      />
      <Scene
        key="post"
        component={PostForm}
      />
    </Scene>
  </Router>);


export default RouterComponent;
