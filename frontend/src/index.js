import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import reportWebVitals from './reportWebVitals';
import "core-js/stable";
import "regenerator-runtime/runtime";

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF8C00',
    },
    secondary: {
      main: '#333',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);


reportWebVitals();
