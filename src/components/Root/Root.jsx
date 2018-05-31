// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'pages/Home';
import CreateNote from 'pages/CreateNote';
import Notes from 'pages/Notes';
import NotFoundPage from 'pages/NotFoundPage';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Menu from 'components/Menu';

import routes from 'routes';

import styles from './root.styl';

const Root = () => (
  <div className={styles.rootCanvas} style={{ height: window.innerHeight }}>
    <Header title={42} />
    <div className={styles.rootLayout}>
      <div className={styles.rootMenu}>
        <Menu />
      </div>
      <main className={styles.rootMain}>
        <Switch>
          <Route exact path={routes.home.path} component={Home} />
          <Route path={routes.list.path} component={Notes} />
          <Route exact path={routes.new.path} component={CreateNote} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </main>
    </div>
    <Footer />
  </div>
);

export default Root;
