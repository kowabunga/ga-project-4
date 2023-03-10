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
import EditRecipePage from './pages/RecipesPage/EditRecipePage/EditRecipePage';
import PostsPage from './pages/PostPage/PostsPage';
import SinglePostPage from './pages/PostPage/PostPage/SinglePostPage';
import EditPostPage from './pages/PostPage/EditPostPage/EditPostsPage';
import SignUpPage from './pages/SignupPage/SignupPage';
import UserLandingPage from './pages/UserPages/UserLandingPage';
import NewPostPage from './pages/PostPage/NewPostPage/NewPostPage';

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
        <Route path='signup' element={<SignUpPage />} />
        <Route path='recipes' element={<RecipesPage />} />
        <Route path='recipes/create' element={<NewRecipePage />} />
        <Route path='recipes/:id/edit' element={<EditRecipePage />} />
        <Route path='recipes/:id' element={<SingleRecipePage />} />
        <Route path='posts' element={<PostsPage />} />
        <Route path='posts/create' element={<NewPostPage />} />
        <Route path='posts/:id/edit' element={<EditPostPage />} />
        <Route path='posts/:id' element={<SinglePostPage />} />
        <Route path='user' element={<UserLandingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
