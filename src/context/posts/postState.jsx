import { useReducer, createContext, useContext } from 'react';

import PostReducer from './postReducer';

import { SET_POSTS } from '../types';

export const PostContext = createContext();

export function PostState({ children }) {
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

  return (
    <PostContext.Provider value={{ ...state, getAllPosts }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePostContext() {
  return useContext(PostContext);
}
