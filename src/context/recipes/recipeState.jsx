import { useReducer, createContext, useContext } from 'react';
import RecipeReducer from './recipeReducer';

import { GET_RECIPE, GET_RECIPES } from '../types';

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
    } catch (error) {
      console.log(error);
    }

    dispatch({ type: GET_RECIPES, payload: data });
  }

  async function getRecipe(id) {
    try {
      const res = await fetch(`/api/recipes/${id}`);
      const data = await res.json();

      dispatch({ type: GET_RECIPE, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <RecipeContext.Provider value={{ ...state, getAllRecipes, getRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipeContext() {
  return useContext(RecipeContext);
}
