// @flow
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from 'pages/Home';
import Notes from 'pages/Notes';
import NotFoundPage from 'pages/NotFoundPage';
import AuthPage from 'pages/AuthPage';
import Menu from 'components/Menu';
import AuthRoute from 'components/AuthRoute';
import routes from 'routes';

import styles from './root.styl';

class Root extends Component {
  state = {
    height: window.innerHeight,
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.onResize());
  }

  render() {
    const { height } = this.state;
    return (
      <div className={styles.canvas} style={{ height }}>
        <div className={styles.layout}>
          <div className={styles.menu}>
            <Menu />
          </div>
          <main className={styles.main}>
            <Switch>
              {/* <Redirect from="/" to={routes.list.path} /> */}
              <Route exact path={routes.auth.path} component={AuthPage} />
              <AuthRoute exact path={routes.home.path} component={Home} />
              <AuthRoute path={routes.list.path} component={Notes} />
              <AuthRoute path="*" component={NotFoundPage} />
            </Switch>
          </main>
        </div>
      </div>
    );
  }

  onResize = () => {
    this.setState({ height: window.innerHeight });
  }
}

export default Root;
