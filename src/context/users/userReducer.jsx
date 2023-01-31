import { GET_TOKEN, GET_USER, LOGOUT_USER } from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TOKEN:
      return {
        ...state,
        token: payload,
      };

    case GET_USER:
      return {
        ...state,
        user: payload,
      };

    case LOGOUT_USER: {
      return {
        ...state,
        user: null,
        token: null,
      };
    }

    default:
      return state;
  }
};
