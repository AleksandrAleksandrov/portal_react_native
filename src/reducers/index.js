import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PostsListReucer from './PostsListReducer';

export default combineReducers({
  auth: AuthReducer,
  postsList: PostsListReucer
});
