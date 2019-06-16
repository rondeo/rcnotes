// @flow
import React from 'react';
import cx from 'classnames';

import styles from './icon.styl';

type Props = {
  type: string,
  size: 'medium' | 'small',
  className?: string,
}


const Icon = ({ type, size = 'medium', className }: Props) => (
  <span
    className={cx(styles.item, styles[type], styles[`itemSize_${size}`], className)}
    aria-hidden="true"
  >
    {type}
  </span>
);

export default Icon;
