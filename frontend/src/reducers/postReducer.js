import { ADD_POST, DELETE_POST, FETCH_POST, CLEAR_POSTS } from '../actions/types';

export function postReducer(state = [], action) {
  switch (action.type) {
    case DELETE_POST:
      return state.filter(post => post._id !== action.payload.id);
    case FETCH_POST:
      return action.posts;
    case CLEAR_POSTS:
      return action.posts;
    default:
      return state;
  }
}

export function newPostReducer(state = {}, action) {
  switch (action.type) {
    case ADD_POST:
      return action.newPost;
    default:
      return state;
  }
}