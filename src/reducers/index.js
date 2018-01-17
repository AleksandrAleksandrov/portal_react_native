import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './AuthReducer';
import PostsReducer from './PostsReducer';
import ReducerNetworkMonitor from './ReducerNetworkMonitor';
import PhotosReducer from './PhotosReducer';
import UsersReducer from './UsersReducer';


export default combineReducers({
  auth: AuthReducer,
  postsList: PostsReducer,
  networkReducer: ReducerNetworkMonitor,
  photo: PhotosReducer,
  users: UsersReducer,
  form: formReducer,
});
