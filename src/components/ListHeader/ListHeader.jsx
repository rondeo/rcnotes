// @flow
import React, { Fragment } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import routes from 'routes';

import Icon from 'components/Icon';

import styles from './list-header.styl';

const ListHeader = () => (
  <Fragment>
    <div className={cx(styles.wrapper, styles.wrapperDesktop)}>
      <input placeholder="search" className={styles.input} role="search" />
      <Link to={routes.new.path} className={styles.link} title="Create a new note">
        <span className={styles.linkHidden}>Create a new note</span>
        <Icon type="note_add" className={styles.icon} />
      </Link>
    </div>
    <div className={cx(styles.wrapper, styles.wrapperTablet)}>
      <Icon type="menu" className={styles.icon} />
      <span>NOTES</span>
      <Icon type="search" className={styles.icon} />
    </div>
  </Fragment>
);

export default ListHeader;
