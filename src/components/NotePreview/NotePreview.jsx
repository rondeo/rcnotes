// @flow
import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import TextTruncate from 'react-text-truncate';

import styles from './note-preview.styl';

type Props = {
  id: number,
  link: string,
  title: string,
  editingDate: number,
  preview: string,
  active: ?boolean,
  deleteHandler: void,
}

const NotePreview = ({
  id, link, title, editingDate, preview, active, deleteHandler,
}: Props) => (
  <article className={cx(styles.root, active && styles.rootActive)} >
    <div className={styles.rootContainer}>
      <Link to={link} className={styles.rootLink} >
        <div className={styles.rootDate}>
          {format(new Date(editingDate), 'DD.MM.YYYY')}
        </div>
        <TextTruncate
          line={2}
          truncateText="…"
          text={title}
          className={styles.rootTitle}
        />
        <TextTruncate
          line={2}
          truncateText="…"
          text={preview}
          className={styles.rootPreview}
        />
      </Link>
      <div className={styles.rootUnderside}>
        <button type="button" onClick={deleteHandler}>delete</button>
      </div>
    </div>
  </article>
);

export default NotePreview;
