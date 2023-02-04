import { useReducer, createContext, useContext } from 'react';
import RecipeReducer from './recipeReducer';

import { useUserContext } from '../users/userState';

import { SET_RECIPE, SET_RECIPES, UPDATE_RECIPE } from '../types';

export const RecipeContext = createContext();

export function RecipeState({ children }) {
  const { token } = useUserContext();

  const initialState = {
    recipes: null,
    recipe: null,
  };

  const [state, dispatch] = useReducer(RecipeReducer, initialState);

  async function getAllRecipes() {
    try {
      const res = await fetch('/api/recipes/all');
      const data = await res.json();
      dispatch({ type: SET_RECIPES, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserRecipes() {
    try {
      const res = await fetch('/api/recipes', {
        method: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      const data = await res.json();

      dispatch({ type: SET_RECIPES, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  async function getRecipe(id) {
    try {
      const res = await fetch(`/api/recipes/${id}`);
      const data = await res.json();

      dispatch({ type: SET_RECIPE, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  async function createRecipe(recipe) {
    try {
      const res = await fetch(`/api/recipes`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
        body: JSON.stringify(recipe),
      });
      const data = await res.json();

      dispatch({ type: SET_RECIPE, payload: data });
      console.log(data);
      return data._id;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateRecipe(updatedRecipe, id) {
    try {
      const res = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
        body: JSON.stringify(updatedRecipe),
      });
      const data = await res.json();

      dispatch({ type: UPDATE_RECIPE, payload: data });
      return data._id;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteRecipe(id) {
    console.log(id);
    try {
      const res = await fetch(`/api/recipes/${id}`, {
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

  async function addRecipeComment(comment, recipeId) {
    try {
      console.log(comment, recipeId);

      const res = await fetch(`/api/recipe/${recipeId}/comments`, {
        method: 'POST',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(comment),
      });

      const data = await res.json();
      console.log(data);

      dispatch({ type: SET_RECIPE, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  async function editRecipeComment(updatedComment, commentId) {
    try {
      const res = await fetch(`/api/recipe/comments/${commentId}`, {
        method: 'PUT',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(updatedComment),
      });
      const data = await res.json();
      dispatch({ type: SET_RECIPE, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteRecipeComment(commentId) {
    try {
      const res = await fetch(`/api/recipe/comments/${commentId}`, {
        method: 'DELETE',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
      });
      const data = await res.json();

      dispatch({ type: SET_RECIPE, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <RecipeContext.Provider
      value={{
        ...state,
        getAllRecipes,
        getRecipe,
        getUserRecipes,
        updateRecipe,
        createRecipe,
        deleteRecipe,
        addRecipeComment,
        editRecipeComment,
        deleteRecipeComment,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipeContext() {
  return useContext(RecipeContext);
}
