// @flow
import React from 'react';
import cx from 'classnames';
import Icon from 'components/Icon';
import styles from './controll-panel.styl';

const ControllPanel = ({
  openedToolbar, onSave, onDelete, toggleToolbar,
}) => (
  <div className={styles.wrapper}>
    <button type="button" onClick={onSave} className={styles.button}>
      <Icon type="done" />
    </button>
    <button type="button" onClick={onDelete} className={styles.button}>
      <Icon type="delete_outline" />
    </button>

    <div className={styles.bottom}>
      <button
        type="button"
        onClick={toggleToolbar}
        className={cx(styles.button, openedToolbar && styles.buttonActive)}
      >
        <Icon type="text_fields" />
      </button>
    </div>
  </div>
);

export default ControllPanel;
