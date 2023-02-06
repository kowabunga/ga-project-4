import { useEffect } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { useRecipeContext } from '../../context/recipes/recipeState';

export default function RecipePage() {
  const { getAllRecipes, recipes } = useRecipeContext();

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <>
      <h1>Recipes</h1>
      <p className='lead'>Favored recipes, shared by friends.</p>
      <hr style={{ width: '90%', margin: '1rem auto' }} />
      <section
        className='d-flex flex-wrap justify-content-evenly align-items-center'
        style={{ height: '30rem' }}
      >
        {recipes &&
          recipes.map(recipe => (
            <RecipeCard recipe={recipe} key={recipe._id} />
          ))}
      </section>
    </>
  );
}
