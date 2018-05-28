// @flow
import React from 'react';
import { connect } from 'react-redux';
import { noteAddAction } from 'store/actions';

import NoteInner from 'components/NoteInner';

const CreateNote = ({ dispatch }) => {
  const submitHandler = (values) => {
    dispatch(noteAddAction(values));
  };

  return (
    <NoteInner submitHandler={submitHandler} />
  );
};


export default connect()(CreateNote);
