import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../../context/users/userState';

export default function LoginPage() {
  const { logIn, token, loginError } = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await logIn({ email, password });

    if (loginError !== null) {
      navigate(-1);
    }
  }

  useEffect(() => {
    if (token) navigate(-1);
  }, [token]);

  return (
    !token && (
      <section className='p-4'>
        {loginError && (
          <p className='text-center lead text-danger'>{loginError}</p>
        )}
        <h3 className='text-center'>Login</h3>
        <form
          style={{ width: '470px' }}
          className='mx-auto'
          onSubmit={handleSubmit}
        >
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Login
          </button>
          <small className='d-block mt-2'>
            Don't have an account? <Link to='/signup'>Create Account</Link>
          </small>
        </form>
      </section>
    )
  );
}
