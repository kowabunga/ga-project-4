import {
  GET_TOKEN,
  GET_USER,
  LOGOUT_USER,
  LOGIN_ERROR,
  REMOVE_LOGIN_ERROR,
  SIGNUP_ERROR,
  REMOVE_SIGNUP_ERROR,
} from '../types';

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

    case REMOVE_SIGNUP_ERROR:
    case REMOVE_LOGIN_ERROR:
      return {
        ...state,
        loginError: null,
      };

    case LOGOUT_USER: {
      return {
        ...state,
        user: null,
        token: null,
      };
    }

    case SIGNUP_ERROR:
      return {
        ...state,
        signUpError: payload,
      };

    case LOGIN_ERROR: {
      return {
        ...state,
        loginError: payload,
      };
    }

    default:
      return state;
  }
};
