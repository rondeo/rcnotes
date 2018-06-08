// @flow
import React from 'react';
import cx from 'classnames';
import Icon from 'components/Icon';

import styles from './controll-button.styl';

type Props = {
  type?: string,
  value: string,
  icon?: string,
  color?: string,
  label: string,
  onClick?: Function,
  className?: string,
};

const ControllButton = ({ type, value, icon, color, label, onClick, className }) => (
  <button
    aria-label={label}
    value={value}
    className={cx(
      styles.button,
      type && `ql-${type}`,
      className,
    )}
    onClick={onClick}
  >
    {color && (
      <span className={styles.color} style={{backgroundColor: value}}/>
    )}
    {icon && <Icon type={icon} className="ql-picker-label" />}
  </button>
);

export default ControllButton;
