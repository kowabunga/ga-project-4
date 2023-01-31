import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/users/userState';

export default function LoginPage() {
  const { logIn, token } = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await logIn({ email, password });
    navigate(-1);
  }

  useEffect(() => {
    if (token) navigate(-1);
  }, [token]);

  return (
    !token && (
      <section className='p-4'>
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
        </form>
      </section>
    )
  );
}
