import { useUserContext } from '../../../context/users/userState';
import { useRecipeContext } from '../../../context/recipes/recipeState';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditRecipePage() {
  const { user } = useUserContext();
  const { updateRecipe, getRecipe, recipe } = useRecipeContext();
  const [state, setState] = useState({
    ingredients: '',
    title: '',
    content: '',
    description: '',
    imgUrl: '',
    user: '',
  });

  const navigate = useNavigate();
  const params = useParams();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const recipeId = await updateRecipe(state, params.id);
    navigate(`/recipes/${recipeId}`);
  }

  useEffect(() => {
    user && setState({ ...state, user: user._id });
  }, [user]);

  useEffect(() => {
    recipe &&
      setState({
        ...state,
        ingredients: recipe.ingredients,
        title: recipe.title,
        content: recipe.content,
        description: recipe.description,
        imgUrl: recipe.imgUrl,
      });
  }, [recipe]);

  useEffect(() => {
    getRecipe(params.id);
  }, []);

  return (
    user && (
      <section>
        <h1 className='mb-3'>Edit Recipe</h1>
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
              required
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
              required
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
              required
              onChange={handleChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='instructions' className='form-label'>
              Instructions
            </label>
            <textarea
              className='form-control'
              value={state.content}
              onChange={e => setState({ ...state, content: e.target.value })}
              rows={4}
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
              value={state.imgUrl}
              required
              onChange={handleChange}
            />
          </div>

          <button
            type='submit'
            className='btn btn-primary'
            data-bs-dismiss='modal'
          >
            Update
          </button>
        </form>
      </section>
    )
  );
}
