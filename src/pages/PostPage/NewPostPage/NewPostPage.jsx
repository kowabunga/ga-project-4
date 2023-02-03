import { useUserContext } from '../../../context/users/userState';
import { usePostContext } from '../../../context/posts/postState';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewPostPage() {
  const { user } = useUserContext();
  const { createPost, post } = usePostContext();
  const [state, setState] = useState({
    title: '',
    content: '',
    imgUrl: '',
    user: '',
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
    const postId = await createPost(state);
    navigate(`/posts/${postId}`);
  }

  useEffect(() => {
    user && setState({ ...state, user: user._id });
  }, [user]);

  return (
    <section>
      <h1 className='mb-3'>Create Post</h1>
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
            required
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='content' className='form-label'>
            Content
          </label>
          <input
            type='text'
            className='form-control'
            name='content'
            value={state.content}
            required
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='content' className='form-label'>
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
