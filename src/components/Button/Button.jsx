import React from 'react';
import cx from 'classnames';

import styles from './Button.styl';

type Props = {
  type: 'button' | 'submit',
  children: React.$Node,
  onClick: () => void,
  theme?: 'transparent' | 'common' | 'link',
  size?: 'wide' | 'none',
  className?: string,
}

const Button = ({ children, onClick, type = 'button', theme = 'common', size, className }: Props) => (
  <button
    type={type}
    onClick={onClick}
    className={cx(styles.button, styles[theme], styles[size], className)}
  >
    {children}
  </button>
);

export default Button;
