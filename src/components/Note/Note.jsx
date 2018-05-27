// @flow
import React from 'react';
import cx from 'classnames';

import styles from './note.styl';

type Props = {
  title: string,
  date: number,
  preview: string,
  active: ?boolean,
}

const Note = ({
  title, date, preview, active,
}: Props) => (
  <article className={cx(styles.root, active && styles['root--active'])}>
    {date}
    <br />
    <div className={styles.root__title}>{title}</div>
    {preview}
  </article>
);

export default Note;
