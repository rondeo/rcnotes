// @flow
import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import routes from 'routes';

import Icon from 'components/Icon';

import styles from './search-panel.styl';

type Props = {
  className?: string,
}

const SearchPanel = ({ className }: Props) => (
  <div className={cx(styles.wrapper, className)} role="search">
    <input placeholder="search" />
    <Link to={routes.new.path} className={styles.link} title="Create a new note">
      Create a new note
      <Icon type="note" className={styles.icon} />
    </Link>
  </div>
);

export default SearchPanel;
