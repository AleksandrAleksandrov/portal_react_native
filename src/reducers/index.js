import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './AuthReducer';
import PostsListReucer from './PostsListReducer';


export default combineReducers({
  auth: AuthReducer,
  postsList: PostsListReucer,
  form: formReducer,
});
