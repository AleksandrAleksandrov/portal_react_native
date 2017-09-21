import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './AuthReducer';
import PostsListReucer from './PostsListReducer';
import PostReducer from './PostReducer';


export default combineReducers({
  auth: AuthReducer,
  postsList: PostsListReucer,
  post: PostReducer,
  form: formReducer,
});
