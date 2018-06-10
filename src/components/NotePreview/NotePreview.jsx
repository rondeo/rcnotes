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
  preview: string,
}

type Props = {
  link: string,
  item: ItemProps,
  active?: boolean,
  noteless?: boolean,
  deleteHandler: void,
}

const NotePreview = ({
  link, item, active, noteless, deleteHandler,
}: Props) => {
  const Wrapper = !!link ? NavLink : 'div';
  const wrapperProps = !!link && {
    to: link,
    exact: true,
    activeClassName: styles.link_active,
  };

  return (
    <article className={cx(styles.wrapper, active && styles.link_active)} >
      <Wrapper
        {...wrapperProps}
        className={styles.link}
      >
        <div className={styles.date}>
          {format(new Date(item.editingDate), 'DD.MM.YYYY')}
        </div>
        <TextTruncate
          line={2}
          truncateText="…"
          text={item.title}
          className={cx(styles.title, noteless && styles.title_noteless)}
        />
        <TextTruncate
          line={2}
          truncateText="…"
          text={item.preview}
          className={styles.preview}
        />
      </Wrapper>
      <div className={styles.underside}>
        <button type="button" onClick={deleteHandler}>delete</button>
      </div>
    </article>
  );
};

export default NotePreview;
