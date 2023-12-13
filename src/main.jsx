import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from '../store.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
