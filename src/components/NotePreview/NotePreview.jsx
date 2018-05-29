// @flow
import React from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import { format } from 'date-fns';
import TextTruncate from 'react-text-truncate';

import styles from './note-preview.styl';

type ItemProps = {
  id: number,
  title: string,
  editingDate: number,
  text: string,
}

type Props = {
  link: string,
  item: ItemProps,
  active: boolean,
  deleteHandler: void,
}

const NotePreview = ({
  link, item, active, deleteHandler,
}: Props) => (
  <article className={cx(styles.root, active && styles.rootLinkActive)} >
    <NavLink
      to={link}
      exact
      className={styles.rootLink}
      activeClassName={styles.rootLinkActive}
    >
      <div className={styles.rootDate}>
        {format(new Date(item.editingDate), 'DD.MM.YYYY')}
      </div>
      <TextTruncate
        line={2}
        truncateText="…"
        text={item.title}
        className={styles.rootTitle}
      />
      <TextTruncate
        line={2}
        truncateText="…"
        text={item.text}
        className={styles.rootPreview}
      />
    </NavLink>
    <div className={styles.rootUnderside}>
      <button type="button" onClick={deleteHandler}>delete</button>
    </div>
  </article>
);

export default NotePreview;
