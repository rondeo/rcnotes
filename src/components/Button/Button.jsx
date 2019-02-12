import React from 'react';
import cx from 'classnames';

import styles from './Button.styl';

type Props = {
  children: React.$Node,
  onClick: () => void,
  type?: 'transparent' | 'common' | 'link',
  size?: 'wide' | 'none',
  className?: string,
}

const Button = ({ children, onClick, type = 'common', size, className }: Props) => (
  <button
    type="button"
    onClick={onClick}
    className={cx(styles.button, styles[type], styles[size], className)}
  >
    {children}
  </button>
);

export default Button;
