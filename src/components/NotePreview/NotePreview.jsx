// @flow
import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import styles from './note-preview.styl';

type Props = {
  id: number,
  link: string,
  title: string,
  date: number,
  preview: string,
  active: ?boolean,
  deleteHandler: void,
}

const NotePreview = ({
  id, link, title, date, preview, active, deleteHandler,
}: Props) => (
  <article>
    <button type="button" onClick={deleteHandler}>delete</button>
    <Link to={link} className={cx(styles.root, active && styles['root--active'])}>
      <br />
      {date}
      <br />
      <div className={styles.root__title}>{title}</div>
      {preview}
    </Link>
  </article>

);

export default NotePreview;
