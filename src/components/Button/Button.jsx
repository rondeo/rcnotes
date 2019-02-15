import React from 'react';
import cx from 'classnames';

import styles from './Button.styl';

type Props = {
  type: 'button' | 'submit',
  children: React.$Node,
  onClick: () => void,
  styleType?: 'transparent' | 'common' | 'link',
  size?: 'wide' | 'none',
  className?: string,
}

const Button = ({ children, onClick, type = 'button', styleType = 'common', size, className }: Props) => (
  <button
    type={type}
    onClick={onClick}
    className={cx(styles.button, styles[styleType], styles[size], className)}
  >
    {children}
  </button>
);

export default Button;
