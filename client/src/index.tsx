import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {store} from './Store/index'
import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core';
import { blueGrey, purple } from '@material-ui/core/colors';

const theme = responsiveFontSizes(createTheme({
  palette: {
    type: 'dark',
    secondary: {
      main: purple[800],
    },
    primary: {
      main: blueGrey[100]
    },     
  },
}))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>

,
  document.getElementById('root')
);


