import { useReducer, createContext, useContext } from 'react';
import { useUserContext } from '../users/userState';

import PostReducer from './postReducer';

import { SET_POSTS, SET_POST, UPDATE_POST } from '../types';

export const PostContext = createContext();

export function PostState({ children }) {
  const { token } = useUserContext();

  const initialState = {
    posts: null,
    post: null,
  };

  const [state, dispatch] = useReducer(PostReducer, initialState);

  async function getAllPosts() {
    try {
      const res = await fetch('/api/posts/all');
      const data = await res.json();


      dispatch({ type: SET_POSTS, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserPosts() {
    try {
      const res = await fetch('/api/posts', {
        method: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      const data = await res.json();

      dispatch({ type: SET_POSTS, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  async function getSinglePost(id) {
    try {
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();

      dispatch({ type: SET_POST, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  async function updatePost(updatedPost, id) {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
        body: JSON.stringify(updatedPost),
      });
      const data = await res.json();
      dispatch({ type: UPDATE_POST, payload: data });

      return data._id;
    } catch (error) {
      console.log(error);
    }
  }

  async function createPost(post) {
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
        body: JSON.stringify(post),
      });
      const data = await res.json();

      dispatch({ type: SET_POST, payload: data });
      return data._id;
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePost(id) {
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });

      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function addPostComment(comment, postId) {
    try {
      const res = await fetch(`/api/post/${postId}/comments`, {
        method: 'POST',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(comment),
      });
      const data = await res.json();

      dispatch({ type: SET_POST, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  async function editPostComment(updatedComment, commentId) {
    try {
      const res = await fetch(`/api/post/comments/${commentId}`, {
        method: 'PUT',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(updatedComment),
      });
      const data = await res.json();
      dispatch({ type: SET_POST, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePostComment(commentId) {
    try {
      const res = await fetch(`/api/post/comments/${commentId}`, {
        method: 'DELETE',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      });
      const data = await res.json();

      dispatch({ type: SET_POST, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PostContext.Provider
      value={{
        ...state,
        getAllPosts,
        getSinglePost,
        getUserPosts,
        createPost,
        deletePost,
        updatePost,
        addPostComment,
        editPostComment,
        deletePostComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePostContext() {
  return useContext(PostContext);
}
