import { combineReducers } from 'redux';
import postReducer from './posts';


export default combineReducers({
  posts: postReducer,
});
