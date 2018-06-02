// @flow
import React from 'react';
import NoteEditor from 'components/NoteEditor';
import styles from './note-inner.styl';

const NoteInner = ({ submitHandler, initialValues = {} }) => (
  <div className={styles.wrapper}>
    <NoteEditor
      submitHandler={submitHandler}
      value={initialValues}
    />
  </div>
);

export default NoteInner;
