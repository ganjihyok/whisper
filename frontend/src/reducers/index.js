import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import { postReducer, newPostReducer } from './postReducer';


export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    posts: postReducer,
    newPost: newPostReducer,
});