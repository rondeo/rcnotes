// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from 'routes';

import styles from './menu.styl';

const Menu = () => (
  Object.keys(routes).map(key => (
    <div key={key}>
      <NavLink
        exact={key !== 'list'}
        to={routes[key].path}
        className={styles.rootItem}
        activeClassName={styles.rootItemActive}
      >
        {routes[key].name}
      </NavLink>
    </div>
  ))
);

export default Menu;
