import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './AuthReducer';
import PostsReducer from './PostsReducer';


export default combineReducers({
  auth: AuthReducer,
  postsList: PostsReducer,
  form: formReducer,
});
