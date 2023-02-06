import { useUserContext } from '../../../context/users/userState';
import { usePostContext } from '../../../context/posts/postState';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Spinner from '../../../components/Spinner/Spinner';

export default function EditPostPage() {
  const { user } = useUserContext();
  const { updatePost, getSinglePost, post } = usePostContext();
  const [state, setState] = useState({
    title: '',
    content: '',
    imgUrl: '',
    user: '',
    loading: false,
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
    setState({ ...state, loading: true });

    const postId = await updatePost(state, params.id);
    navigate(`/posts/${postId}`);

    setState({ ...state, loading: false });
  }

  useEffect(() => {
    post &&
      setState({
        ...state,
        title: post.title,
        content: post.content,
        imgUrl: post.imgUrl,
        user: user?._id || post?.user,
      });
  }, [post]);

  useEffect(() => {
    getSinglePost(params.id);
  }, []);

  return (
    user && (
      <section>
        <h1 className='mb-3'>Edit Post</h1>
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

          {state.loading ? (
            <Spinner />
          ) : (
            <button
              type='submit'
              className='btn btn-primary'
              data-bs-dismiss='modal'
            >
              Update
            </button>
          )}
        </form>
      </section>
    )
  );
}
