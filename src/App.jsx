import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RecipesPage from './pages/RecipesPage/RecipesPage';

import { useUserContext } from './context/users/userState';

function App() {
  const { token, getToken, getUser } = useUserContext();

  useEffect(() => {
    getToken();
    getUser();
  }, [token]);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='recipes' element={<RecipesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
