import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes.js';
import { Reset } from 'styled-reset';
import GlobalStyles from './styles/GlobalStyles';
import AuthService from './service/auth_service';
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";

const authService = new AuthService();

ReactDOM.render(
  <>
    <GlobalStyles />
    <Reset />
    <Routes authService={authService}/>
  </>,
  document.getElementById('root')
);


