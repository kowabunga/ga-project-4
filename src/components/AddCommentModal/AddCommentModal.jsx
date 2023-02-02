import { useState } from 'react';

export default function AddCommentModal() {
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(title, comment);
    console.log('Add this after creating comment context');
    setTitle('');
    setComment('');
  }

  return (
    <div
      className='modal fade'
      id='addCommentModel'
      aria-labelledby='addCommentModel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='addCommentModel'>
              Add Comment/Review
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
