// @flow
import React from 'react';
import cx from 'classnames';

import styles from './icon.styl';

type Props = {
  type: 'search' | 'new_note',
  className?: string,
}

const Icon = ({ type, className }: Props) => (
  <span className={cx(styles.item, styles[type], className)} aria-hidden="true">
    {type}
  </span>
);

export default Icon;
