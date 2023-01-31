import { SET_RECIPE, SET_RECIPES, UPDATE_RECIPE } from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: payload,
      };

    case UPDATE_RECIPE:
    case SET_RECIPE:
      return {
        ...state,
        recipe: payload,
      };

    default:
      return state;
  }
};
