// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from './ThemeContext'; // Import ThemeProvider

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider> {/* Wrap App inside ThemeProvider */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
