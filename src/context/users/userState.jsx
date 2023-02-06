import { useReducer, createContext, useContext } from 'react';
import UserReducer from './userReducer';

import {
  GET_USER,
  GET_TOKEN,
  LOGOUT_USER,
  LOGIN_ERROR,
  REMOVE_LOGIN_ERROR,
  SIGNUP_ERROR,
  REMOVE_SIGNUP_ERROR,
} from '../types';

// Note:
// I recognize this is somewhat redundant, but since I'm using the context api to store my data I don't want to rewrite/move all the userService functions into context since they are already written
// So i'll just import and use them where necessary to set state in context
import userService from '../../utils/userService';
import tokenService from '../../utils/tokenService';

export const UserContext = createContext();

export function UserState({ children }) {
  const initialState = {
    user: null,
    token: null,
    loginError: null,
    signupError: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  function getToken() {
    const token = tokenService.getToken();
    dispatch({ type: GET_TOKEN, payload: token });
  }

  async function getUser() {
    const user = await userService.getUser();
    dispatch({ type: GET_USER, payload: user });
  }

  async function logIn(creds) {
    try {
      const tokenSet = await userService.login(creds);
      if (tokenSet) {
        getUser();
        getToken();
      }
      dispatch({ type: REMOVE_LOGIN_ERROR, payload: null });
    } catch (error) {
      dispatch({ type: LOGIN_ERROR, payload: error.message });
    }
  }

  async function signUp(user) {
    try {
      const tokenSet = await userService.signup(user);
      if (tokenSet) {
        getUser();
        getToken();
      }
      dispatch({ type: REMOVE_SIGNUP_ERROR, payload: null });
    } catch (error) {
      dispatch({ type: SIGNUP_ERROR, payload: error.message });
    }
  }

  function signOut() {
    userService.logout();
    dispatch({ type: LOGOUT_USER });
  }

  return (
    <UserContext.Provider
      value={{ ...state, getToken, getUser, signOut, logIn, signUp }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
