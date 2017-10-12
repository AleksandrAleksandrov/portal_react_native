import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './AuthReducer';
import PostsReducer from './PostsReducer';
import ReducerNetworkMonitor from './ReducerNetworkMonitor';


export default combineReducers({
  auth: AuthReducer,
  postsList: PostsReducer,
  networkReducer: ReducerNetworkMonitor,
  form: formReducer,
});
