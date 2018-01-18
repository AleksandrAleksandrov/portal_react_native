import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import StartScreen from './components/StartScreen';
import LoginForm from './components/LoginForm';
import PostsListForm from './components/PostsListForm';
import AlbumsList from './components/AlbumsList';
import Album from './components/Album';
import PostForm from './components/PostForm';
import NewPostForm from './components/NewPostForm';
import Employees from './components/Employees';
import ProfileForm from './components/ProfileForm';

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
        panHandlers={null}
        hideNavBar={true}
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
        key="newPostForm"
        component={NewPostForm}
        hideNavBar={true}
      />
      <Scene
        key="post"
        component={PostForm}
        hideNavBar={true}
      />
      <Scene
        key={'employees'}
        component={Employees}
        hideNavBar={true}
        animation={'fade'}
        type={'replace'}
      />
      <Scene
        key={'profile'}
        component={ProfileForm}
        hideNavBar={true}
        animation={'fade'}
      />
      <Scene
        key={'albums'}
        component={AlbumsList}
        hideNavBar={true}
        animation={'fade'}
        type={'replace'}
      />
      <Scene
        key={'album'}
        component={Album}
        hideNavBar={true}
        animation={'fade'}
      />
    </Scene>
  </Router>);


export default RouterComponent;
