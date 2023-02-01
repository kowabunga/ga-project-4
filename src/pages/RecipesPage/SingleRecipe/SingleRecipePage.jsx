import { useEffect } from 'react';
import { useRecipeContext } from '../../../context/recipes/recipeState';
import { useParams } from 'react-router-dom';

export default function SingleRecipePage() {
  const { getRecipe, recipe } = useRecipeContext();
  const { id } = useParams();

  useEffect(() => {
    getRecipe(id);
  }, []);

  return (
    recipe && (
      <section>
        <h1 className='display-5 text-center mb-5'>{recipe.title}</h1>
        <div className='row'>
          <div className='col-12 col-lg-6'>
            <img
              src={recipe.imgUrl}
              alt={recipe.title}
              className='img-fluid mb-5'
            />
          </div>
          <div className='col-12 col-lg-6'>
            <p className='lead  mb-3'>{recipe.description}</p>
          </div>
        </div>
        <hr />
        <div className='row mt-5'>
          <div className='col-12 col-lg-6'>
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.map(ingredient => (
                <li>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className='col-12 col-lg-6'>
            <h2>Instructions</h2>
            <p>{recipe.content}</p>
          </div>
        </div>
        <div className='row mt-5'>
          <h3>Reviews and Comments</h3>
        </div>
      </section>
    )
  );
}
