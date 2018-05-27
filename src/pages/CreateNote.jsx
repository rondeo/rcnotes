// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { noteAddAction } from 'store/actions';

const CreateNote = ({ dispatch }) => {
  const onSubmit = (values) => {
    console.log('submit', values);
    dispatch(noteAddAction(values));
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={() => true}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <Field name="title" component="input" placeholder="title" autoComplete="off" />
          <Field name="text" component="textarea" placeholder="title" />
          <button type="submit" disabled={pristine || invalid}>
            Submit
          </button>
        </form>
      )}
    />
  );
};


export default connect()(CreateNote);
