
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Make sure this path is correct if you have global CSS

// Import your ThemeContextProvider component
// Ensure the path is correct based on where your ThemeContext.jsx is located
import { ThemeContextProvider } from './ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap your entire application with the ThemeContextProvider */}
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>,
);