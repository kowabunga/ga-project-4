import { useReducer, createContext, useContext } from 'react';
import { useUserContext } from '../users/userState';

import PostReducer from './postReducer';

import { SET_POSTS, SET_POST } from '../types';

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

      console.log(data);

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

  async function addPostComment(comment, postId) {
    console.log(JSON.stringify(comment));
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

  async function editPostComment() {}

  async function deletePostComment(commentId) {
    console.log(commentId);
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
