import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../../context/users/userState';
import Spinner from '../../components/Spinner/Spinner';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { token, signUp, signUpError } = useUserContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && !signUpError) navigate(-1);
    return () => {
      setError(null);
    };
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords must match. Please try again.');
    }
    await signUp({ name, email, password });
    setLoading(false);
  }

  useEffect(() => {
    setError(signUpError);
  }, [signUpError]);

  return (
    <section className='p-4'>
      {error && <p className='text-center text-danger lead'>{error}</p>}
      <p>Loading -'{loading.toString()}'</p>
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
        {loading ? (
          <Spinner text={'Signing up'} />
        ) : (
          <button type='submit' className='btn btn-primary'>
            Sign Up
          </button>
        )}
        <small className='d-block mt-2'>
          Already have an account? <Link to='/login'>Login</Link>
        </small>
      </form>
    </section>
  );
}
