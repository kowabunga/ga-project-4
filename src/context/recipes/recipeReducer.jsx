import { GET_RECIPE, GET_RECIPES } from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload,
      };

    case GET_RECIPE:
      return {
        ...state,
        recipe: payload,
      };

    default:
      return state;
  }
};
