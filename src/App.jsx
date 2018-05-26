// @flow
import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import Home from 'pages/Home';
import List from 'pages/List';

import Header from 'components/Header';
import Footer from 'components/Footer';

import routes from './routes';

const App = () => (
  <div>
    <Header title={42} />
    <div>
      <NavLink to={routes.home} activeStyle={{ color: 'red' }}>home</NavLink>
      <br />
      <NavLink to={routes.list} activeStyle={{ color: 'red' }}>list</NavLink>
    </div>
    <Switch>
      <Route exact path={routes.home} component={Home} />
      <Route exact path={routes.list} component={List} />
      <p>hello world</p>
    </Switch>
    <Footer />
  </div>
);

export default App;
