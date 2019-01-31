import { ADD_POST, DELETE_POST, FETCH_POST, CLEAR_POSTS } from './types';
import axios from 'axios';

export const createPost = (post, history) => {
  return (dispatch) => {
    return axios.post(`/api/posts/add`, post)
      .then(response => {
        console.log(response.data)
        dispatch(createPostSuccess(response.data));
        history.push('/posts');
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const createPostSuccess = (newPost) => {
  return {
    type: ADD_POST,
    newPost,
  }
};

export const deletePost = id => {
  return (dispatch) => {
    return axios.get(`/api/posts/delete/${id}`)
      .then(response => {
        dispatch(deletePostSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const deletePostSuccess = id => {
  return {
    type: DELETE_POST,
    payload: {
      id
    }
  }
}

export const fetchAllPosts = () => {
  return (dispatch) => {
    return axios.get('/api/posts')
      .then(response => {
        dispatch(fetchPosts(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchPosts = (posts) => {
  return {
    type: FETCH_POST,
    posts
  }
};

export const clearPosts = (posts) => {
  return (dispatch) => {
    return dispatch({
      type: CLEAR_POSTS,
      posts,
    })
  }
};
