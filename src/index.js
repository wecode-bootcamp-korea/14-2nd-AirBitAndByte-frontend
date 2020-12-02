import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes.js';
import { Reset } from 'styled-reset';
import GlobalStyles from './styles/GlobalStyles';
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";

ReactDOM.render(
  <>
    <GlobalStyles />
    <Reset />
    <Routes />
  </>,
  document.getElementById('root')
);
