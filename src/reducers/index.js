import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './AuthReducer';
import PostsListReucer from './PostsListReducer';
import PostReducer from './PostReducer';
import MessageActionsReducer from './MessageActionsReducer';


export default combineReducers({
  auth: AuthReducer,
  postsList: PostsListReucer,
  post: PostReducer,
  form: formReducer,
  messageActions: MessageActionsReducer,
});
