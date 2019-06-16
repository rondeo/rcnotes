// @flow
import React, { PureComponent } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import cx from 'classnames';
import Home from 'pages/Home';
import Notes from 'pages/Notes';
import NotFoundPage from 'pages/NotFoundPage';
import AuthPage from 'pages/AuthPage';
import Menu from 'components/Menu';
import AuthRoute from 'components/AuthRoute';
import routes from 'routes';

import styles from './root.styl';

class Root extends PureComponent {
  componentDidMount() {
    this.onResize()
    window.addEventListener('resize', () => this.onResize());
  }

  render() {
    return (
      <div
        className={styles.root}
        ref={el => this.rootNode = el}
      >
        <div className={styles.layout}>
          <Menu closeMenu={this.closeMenu} />
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
    if (!this.rootNode) return;
    this.rootNode.style.height = `${window.innerHeight}px`
  }
}

export default withRouter(Root);
