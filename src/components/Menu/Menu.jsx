// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';

import routes from 'routes';

import styles from './menu.styl';

const Menu = () => (
  <div >
    <NavLink
      to={routes.list.path}
      className={styles.rootItem}
      activeClassName={styles.rootItemActive}
    >
      {routes.list.name}
    </NavLink>
  </div>
);

export default Menu;
