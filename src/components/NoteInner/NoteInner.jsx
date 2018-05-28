// @flow
import React from 'react';
import { Form, Field } from 'react-final-form';

import styles from './note-inner.styl';


const NoteInner = ({ submitHandler, initialValues }) => (
  <Form
    initialValues={initialValues}
    onSubmit={submitHandler}
    validate={() => true}
    render={({ handleSubmit, pristine, invalid }) => (
      <form onSubmit={handleSubmit}>
        <Field name="title" component="input" placeholder="title" autoComplete="off" />
        <Field name="text" component="textarea" placeholder="title" />
        <button type="submit" disabled={pristine || invalid}>
          Save
        </button>
      </form>
      )}
  />
);

export default NoteInner;
