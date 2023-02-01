import { useEffect } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { useRecipeContext } from '../../context/recipes/recipeState';

export default function RecipePage() {
  const { getAllRecipes, recipes } = useRecipeContext();

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <section className='d-flex flex-wrap justify-content-evenly align-items-center'>
      {recipes && recipes.map(recipe => <RecipeCard recipe={recipe} />)}
    </section>
  );
}
