import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Nav from './components/Nav/Nav.jsx';
import Footer from './components/Footer/Footer.jsx';
import PropertyDetail from './components/Property/Property.jsx';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/property' component={PropertyDetail} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default Routes;
