import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../../context/users/userState';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { token, signUp } = useUserContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) navigate(-1);
    return () => {
      setError(null);
    };
  }, [token]);

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords must match. Please try again.');
    }
    signUp({ name, email, password });
  }

  return (
    <section className='p-4'>
      {error && <ErrorMessage error={error} />}
      <h3 className='text-center'>Create Account</h3>
      <form
        style={{ width: '470px' }}
        className='mx-auto'
        onSubmit={handleSubmit}
      >
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            onChange={e => setEmail(e.target.value)}
            required
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
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Confirm Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Sign Up
        </button>
        <small className='d-block mt-2'>
          Already have an account? <Link to='/login'>Login</Link>
        </small>
      </form>
    </section>
  );
}
