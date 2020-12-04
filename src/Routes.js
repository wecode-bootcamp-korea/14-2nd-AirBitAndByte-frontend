import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyles';
import Main from './Pages/Main/Main';
import Nav from './Components/Nav/Nav.jsx';
import Footer from './Components/Footer/Footer.jsx';
import PropertyDetail from './Components/Property/Property.jsx';

const Routes = ({ authService }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Nav authService={authService}/>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/property' component={PropertyDetail} />
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default Routes;

