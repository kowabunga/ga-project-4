import { useEffect } from 'react';
import { useRecipeContext } from '../../context/recipes/recipeState';

export default function RecipePage() {
  const { getAllRecipes, recipes } = useRecipeContext();

  useEffect(() => {
    getAllRecipes();
  }, []);

  return <div></div>;
}
