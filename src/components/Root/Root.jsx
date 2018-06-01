// @flow
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from 'pages/Home';
import Notes from 'pages/Notes';
import NotFoundPage from 'pages/NotFoundPage';

import Menu from 'components/Menu';

import routes from 'routes';

import styles from './root.styl';

const Root = () => (
  <div className={styles.canvas} style={{ height: window.innerHeight }}>
    <div className={styles.layout}>
      <div className={styles.menu}>
        <Menu />
      </div>
      <main className={styles.main}>
        <Switch>
          <Redirect from="/" exact to={routes.list.path} />
          <Route exact path={routes.home.path} component={Home} />
          <Route path={routes.list.path} component={Notes} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </main>
    </div>
  </div>
);

export default Root;
