import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes.js';
import { Reset } from 'styled-reset';
import GlobalStyles from './styles/GlobalStyles';

ReactDOM.render(
  <>
    <GlobalStyles />
    <Reset />
    <Routes />
  </>,
  document.getElementById('root')
);
