import { useReducer, createContext, useContext } from 'react';
import UserReducer from './userReducer';

import { GET_USER, GET_TOKEN, LOGOUT_USER } from '../types';

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
    const tokenSet = await userService.login(creds);
    if (tokenSet) {
      getUser();
      getToken();
    }
  }

  async function signUp(user) {
    const tokenSet = await userService.signup(user);
    if (tokenSet) {
      getUser();
      getToken();
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
