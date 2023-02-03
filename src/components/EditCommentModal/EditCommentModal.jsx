import { useState, useEffect } from 'react';
import { usePostContext } from '../../context/posts/postState';
import { useRecipeContext } from '../../context/recipes/recipeState.jsx';

export default function EditCommentModal({ user, post, oldComment, isPost }) {
  const { editPostComment } = usePostContext();
  const { editRecipeComment } = useRecipeContext();

  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  function handleFormSubmit(e) {
    e.preventDefault();
    isPost
      ? editPostComment(
          { title, content: comment, user: oldComment.user },
          oldComment._id
        )
      : editRecipeComment(
          { title, content: comment, user: oldComment.user },
          oldComment._id
        );
  }

  useEffect(() => {
    setTitle(oldComment.title);
    setComment(oldComment.content);
    return () => {
      setTitle('');
      setComment('');
    };
  }, []);

  return (
    <div
      className='modal fade'
      id={`editCommentModal${oldComment._id}`}
      aria-labelledby={`editCommentModal${oldComment._id}`}
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1
              className='modal-title fs-5'
              id={`editCommentModal${oldComment._id}`}
            >
              Edit Comment/Review
            </h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <form onSubmit={handleFormSubmit}>
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
  );
}
