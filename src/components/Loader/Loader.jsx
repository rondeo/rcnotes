// @flow
import React from 'react';
import cx from 'classnames';

import styles from './loader.styl';

type Props = {
  className?: string,
  absolute?: boolean,
}

const Icon = ({ className, absolute }: Props) => (
  <div className={cx(styles.loader, className, absolute && styles.loaderAbsolute)}>
    <div className={cx(styles.loaderItem)} />
  </div>
);

export default Icon;
