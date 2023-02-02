import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

import './App.css';

import { useUserContext } from './context/users/userState';

import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RecipesPage from './pages/RecipesPage/RecipesPage';
import SingleRecipePage from './pages/RecipesPage/SingleRecipe/SingleRecipePage';
import NewRecipePage from './pages/RecipesPage/NewRecipePage/NewRecipePage';
import PostsPage from './pages/PostPage/PostsPage';
import SinglePostPage from './pages/PostPage/PostPage/SinglePostPage';

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
        <Route path='recipes/:id' element={<SingleRecipePage />} />
        <Route path='recipes/create' element={<NewRecipePage />} />
        <Route path='posts' element={<PostsPage />} />
        <Route path='posts/:id' element={<SinglePostPage />} />
      </Route>
    </Routes>
  );
}

export default App;
