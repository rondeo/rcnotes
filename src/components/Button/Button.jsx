import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import styles from './Button.styl';

type Props = {
  to?: string,
  title?: string,
  type: 'button' | 'submit',
  children: React.$Node,
  onClick: () => void,
  theme?: 'transparent' | 'common' | 'link',
  size?: 'wide' | 'none',
  className?: string,
}

const Button = ({ children, onClick, to, type = 'button', theme = 'common', size, className }: Props) => {
  if (!!to) {
    return (
      <Link
        to={to}
        className={cx(styles.button, styles[theme], styles[size], className)}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cx(styles.button, styles[theme], styles[size], className)}
    >
      {children}
    </button>
  );
}

export default Button;
