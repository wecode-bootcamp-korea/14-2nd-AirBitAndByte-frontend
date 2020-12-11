import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes.js';
import { Reset } from 'styled-reset';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store/reducers';

import GlobalStyles from './styles/GlobalStyles';
import AuthService from './service/auth_service';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const store = createStore(rootReducer);
const authService = new AuthService();

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles />
    <Reset />
    <Routes authService={authService} />
  </Provider>,
  document.getElementById('root')
);
