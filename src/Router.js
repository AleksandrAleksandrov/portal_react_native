import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
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
        key="login"
        component={LoginForm}
        title="Авторизация"
      />
      <Scene
        key="postsList"
        component={PostsListForm}
        title="Portal"
        initial
      />
      <Scene
        key="post"
        component={PostForm}
      />
    </Scene>
  </Router>);


export default RouterComponent;
