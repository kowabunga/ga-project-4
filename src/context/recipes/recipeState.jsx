import { useReducer, createContext, useContext } from 'react';
import RecipeReducer from './recipeReducer';

import { SET_RECIPE, SET_RECIPES } from '../types';

export const RecipeContext = createContext();

export function RecipeState({ children }) {
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

  async function getRecipe(id) {
    try {
      const res = await fetch(`/api/recipes/${id}`);
      const data = await res.json();

      dispatch({ type: SET_RECIPE, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateRecipe(updatedRecipe) {
    try {
      const res = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: updateRecipe,
      });
      const data = await res.json();
      console.log(data);

      if (state?.recipes.length > 0) {
        const oldRecipeId = state.recipes.findIndex(recipe =>
          recipe._id.equals(data._id)
        );

        const updatedRecipes = state.recipes.splice(oldRecipeId, 1, data);
        dispatch({ type: SET_RECIPES, payload: updatedRecipes });
      }

      dispatch({ type: UPDATE_RECIPE, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <RecipeContext.Provider
      value={{ ...state, getAllRecipes, getRecipe, updateRecipe }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipeContext() {
  return useContext(RecipeContext);
}
