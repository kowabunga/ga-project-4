import { useUserContext } from '../../../context/users/userState';
import { useRecipeContext } from '../../../context/recipes/recipeState';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../../components/Spinner/Spinner';

export default function NewRecipePage() {
  const { user } = useUserContext();
  const { createRecipe } = useRecipeContext();
  const [state, setState] = useState({
    ingredients: '',
    title: '',
    content: '',
    description: '',
    imgUrl: '',
    user: '',
    loading: false,
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

    setState({ ...state, loading: true });

    const recipeId = await createRecipe(state);
    navigate(`/recipes/${recipeId}`);
    setState({ ...state, loading: false });
  }

  useEffect(() => {
    user && setState({ ...state, user: user._id });
  }, [user]);

  return (
    user && (
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
            <label htmlFor='imgUrl' className='form-label'>
              Image
            </label>
            <input
              type='text'
              className='form-control'
              name='imgUrl'
              value={state.imgUrl}
              required
              onChange={handleChange}
            />
          </div>

          {state.loading ? (
            <Spinner />
          ) : (
            <button
              type='submit'
              className='btn btn-primary'
              data-bs-dismiss='modal'
            >
              Submit
            </button>
          )}
        </form>
      </section>
    )
  );
}
