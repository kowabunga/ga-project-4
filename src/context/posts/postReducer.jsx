import { SET_POST, SET_POSTS, UPDATE_POST } from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_POSTS:
      return {
        ...state,
        posts: payload,
      };
    default:
      return state;
  }
};
