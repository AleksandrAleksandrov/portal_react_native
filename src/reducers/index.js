import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PostsListReucer from './PostsListReducer';
import PostReducer from './PostReducer';

export default combineReducers({
  auth: AuthReducer,
  postsList: PostsListReucer,
  post: PostReducer,
});
