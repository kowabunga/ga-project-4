import { useEffect, useState } from 'react';
import { useRecipeContext } from '../../../context/recipes/recipeState';
import { useUserContext } from '../../../context/users/userState';
import { useParams } from 'react-router-dom';

import Comment from '../../../components/Comment/Comment';

export default function SingleRecipePage() {
  const { getRecipe, recipe } = useRecipeContext();
  const { user } = useUserContext();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    getRecipe(id);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(title, comment);
    console.log('Add this after creating comment context');
  }

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
        <hr />
        <div className='mt-5'>
          <div className='d-flex justify-content-between mb-4'>
            <h3>Reviews and Comments</h3>
            <button
              className='btn btn-outline-primary'
              data-bs-toggle='modal'
              data-bs-target='#addCommentModel'
            >
              Add comment
            </button>
          </div>
          {recipe.comments.length > 0 ? (
            <ul className='list-group-flush'>
              {recipe.comments.map(comment => (
                <Comment comment={comment} key={comment._id} />
              ))}{' '}
            </ul>
          ) : (
            'No comments or reviews...'
          )}
        </div>
        {/* MODAL FOR ADD COMMENT */}
        <div
          className='modal fade'
          id='addCommentModel'
          tabindex='-1'
          aria-labelledby='addCommentModel'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='addCommentModel'>
                  Modal title
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label htmlFor='title' className='form-label'>
                      Title
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      value={title}
                      onChange={e => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='comment' className='form-label'>
                      Comment
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      value={comment}
                      onChange={e => {
                        setComment(e.target.value);
                      }}
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
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
}
