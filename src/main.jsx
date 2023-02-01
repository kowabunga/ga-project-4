import 'vite/modulepreload-polyfill';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import { UserState } from './context/users/userState';
import { RecipeState } from './context/recipes/recipeState';
import { PostState } from './context/posts/postState';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <UserState>
        <RecipeState>
          <PostState>
            <App />
          </PostState>
        </RecipeState>
      </UserState>
    </Router>
  </React.StrictMode>
);
