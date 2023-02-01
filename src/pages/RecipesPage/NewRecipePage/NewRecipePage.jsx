import { useUserContext } from '../../../context/users/userState';
import { useRecipeContext } from '../../../context/recipes/recipeState';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewRecipePage() {
  const { user } = useUserContext();
  const { createRecipe } = useRecipeContext();
  const [state, setState] = useState({
    ingredients: '',
    title: '',
    content: '',
    description: '',
    imageUrl: '',
    user: user._id,
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const recipeId = await createRecipe(state);
    navigate(`/recipes/${recipeId}`);
  }
  console.log(user);
  return (
    <section>
      <h1 className='mb-3'>Create Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <input
            type='text'
            className='form-control'
            value={state.title}
            name='title'
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <input
            type='text'
            className='form-control'
            name='description'
            value={state.description}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='ingredients' className='form-label'>
            Ingredients
          </label>
          <input
            type='text'
            className='form-control'
            name='ingredients'
            value={state.ingredients}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='instructions' className='form-label'>
            Instructions
          </label>
          <input
            type='text'
            className='form-control'
            name='content'
            value={state.content}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='imageUrl' className='form-label'>
            Image
          </label>
          <input
            type='text'
            className='form-control'
            name='imageUrl'
            value={state.imageUrl}
            onChange={handleChange}
          />
        </div>

        <button
          type='submit'
          className='btn btn-primary'
          data-bs-dismiss='modal'
        >
          Submit
        </button>
      </form>
    </section>
  );
}
