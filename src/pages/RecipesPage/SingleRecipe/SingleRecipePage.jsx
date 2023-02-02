import { useEffect, useState } from 'react';
import { useRecipeContext } from '../../../context/recipes/recipeState';
import { useUserContext } from '../../../context/users/userState';
import { useParams } from 'react-router-dom';

import Comment from '../../../components/Comment/Comment';
import AddCommentModal from '../../../components/AddCommentModal/AddCommentModal';

export default function SingleRecipePage() {
  const { getRecipe, recipe } = useRecipeContext();
  const { token } = useUserContext();
  const { id } = useParams();

  useEffect(() => {
    getRecipe(id);
  }, []);

  return (
    recipe && (
      <section>
        <h1 className='display-5 text-center'>{recipe.title}</h1>
        <h5 className='text-center mb-5'>By {recipe.user.name}</h5>
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
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className='col-12 col-lg-6'>
            <h2>Instructions</h2>
            <p>{recipe.content}</p>
          </div>
        </div>
        <div className='mt-5'>
          <div className='d-flex justify-content-between mb-4'>
            <h3>Reviews and Comments</h3>
            {token && (
              <button
                className='btn btn-outline-primary'
                data-bs-toggle='modal'
                data-bs-target='#addCommentModel'
              >
                Add comment
              </button>
            )}
          </div>
          {recipe.comments.length > 0 ? (
            <ul className='list-group list-group-flush'>
              {recipe.comments.map(comment => (
                <Comment comment={comment} key={comment._id} />
              ))}{' '}
            </ul>
          ) : (
            'No comments or reviews...'
          )}
        </div>
        {/* MODAL FOR ADD COMMENT */}
        <AddCommentModal />
      </section>
    )
  );
}
