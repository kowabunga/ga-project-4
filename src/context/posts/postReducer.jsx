import { SET_POST, SET_POSTS, UPDATE_POST } from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_POST:
    case SET_POST:
      return {
        ...state,
        post: payload,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: payload,
      };
    default:
      return state;
  }
};
