import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

// Automatically import all CSS files in ./css and subfolders
import.meta.glob('./css/**/*.css', { eager: true });

// Import your main App component

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
