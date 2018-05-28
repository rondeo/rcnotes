// @flow
import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import Home from 'pages/Home';
import CreateNote from 'pages/CreateNote';
import NotesList from 'pages/NotesList';
import NoteDetail from 'pages/NoteDetail';
import NotFoundPage from 'pages/NotFoundPage';

import Header from 'components/Header';
import Footer from 'components/Footer';

import routes from './routes';

const App = () => (
  <div>
    <Header title={42} />
    <div>
      {Object.keys(routes).map(key => (
        <div key={key}>
          <NavLink exact to={routes[key].path} activeStyle={{ color: 'red' }}>
            {routes[key].name}
          </NavLink>
        </div>
        ))}
    </div>
    <br />
    <br />
    <Switch>
      <Route exact path={routes.home.path} component={Home} />
      <Route exact path={routes.list.path} component={NotesList} />
      <Route
        exact
        path={`${routes.list.path}/:id`}
        render={({ match }) => <NoteDetail id={+match.params.id} />}
      />
      <Route exact path={routes.new.path} component={CreateNote} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
    <Footer />
  </div>
);

export default App;
