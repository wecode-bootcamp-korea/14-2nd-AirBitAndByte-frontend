import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyles';
import Main from './Pages/Main/Main';
import Nav from './Components/Nav/Nav.jsx';
import Footer from './Components/Footer/Footer.jsx';
import PropertyDetail from './Components/Property/Property.jsx';
import PropertyCalender from './Components/Property/PropertyCalender.jsx';
import PlaceList from './Pages/PlaceList/PlaceList.jsx';
import 'react-dates/lib/css/_datepicker.css';

const Routes = ({ authService }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Nav authService={authService} />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/property/:id' component={PropertyDetail} />
          <Route exact path='/property' component={PropertyDetail} />
          <Route exact path='/calender' component={PropertyCalender} />
          <Route exact path='/placelist' component={PlaceList} />
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default Routes;
