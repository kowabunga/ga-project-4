import { Outlet, Link, NavLink } from 'react-router-dom';
import { useUserContext } from '../context/users/userState';

export default function Layout() {
  const { token, signOut } = useUserContext();

  function handleClick() {
    signOut();
  }

  return (
    <>
      <nav
        className='navbar navbar-expand-sm'
        style={{ backgroundColor: '#e3f2fd' }}
      >
        <div className='container-fluid'>
          <Link to='/' className='navbar-brand'>
            <i className='fa-solid fa-bowl-food'></i>
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <NavLink className='nav-link' aria-current='page' to='/'>
                  Home
                </NavLink>
              </li>
              {!token ? (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/login'>
                    Login
                  </NavLink>
                </li>
              ) : (
                <li className='nav-item'>
                  <button className='btn nav-link' onClick={handleClick}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <main className='container'>
        <Outlet />
      </main>
    </>
  );
}
