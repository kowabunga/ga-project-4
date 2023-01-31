import 'vite/modulepreload-polyfill';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import { UserState } from './context/users/userState';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <UserState>
        <App />
      </UserState>
    </Router>
  </React.StrictMode>
);
