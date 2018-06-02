// @flow
import React from 'react';
import { Form, Field } from 'react-final-form';
import cx from 'classnames';

import NoteEditor from 'components/NoteEditor';

import commonStyles from 'styles/main.styl';
import styles from './note-inner.styl';

const NoteInner = ({ submitHandler, initialValues }) => (
  <Form
    initialValues={initialValues}
    onSubmit={submitHandler}
    validate={() => true}
    render={({ handleSubmit, pristine, invalid }) => (
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <div className={cx(commonStyles.h1, commonStyles.tag, commonStyles.tag_h1)}>
          <Field
            name="title"
            component="input"
            placeholder="title"
            autoComplete="off"
            className={styles.title}
          />
        </div>
        <Field name="text" component="textarea" placeholder="text" />
        <NoteEditor />
        <div className={styles.controlls}>
          <button type="submit" disabled={pristine || invalid}>
            Save
          </button>
        </div>
      </form>
    )}
  />
);

export default NoteInner;
