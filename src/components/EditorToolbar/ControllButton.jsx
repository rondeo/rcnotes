// @flow
import React from 'react';
import cx from 'classnames';

import commonStyles from 'styles/main.styl';
import styles from './editor-toolbar.styl';

const ControllButton = ({ active, icon, onClick }) => (
  <button
    type="button"
    className={cx(styles.button, active && styles.button_active, commonStyles.icon)}
    onMouseDown={onClick}
  >
    <span className="material-icons">{icon}</span>
  </button>
);

export default ControllButton;
