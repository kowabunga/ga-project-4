import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';

import { useUserContext } from './context/users/userState';

function App() {
  const { token, getToken } = useUserContext();

  useEffect(() => {
    getToken();
  }, [token]);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='login' element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
