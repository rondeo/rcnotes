// @flow
import React from 'react';
import { connect } from 'react-redux';
import { noteAddAction } from 'store/actions';

import NoteInner from 'components/NoteInner';

const CreateNote = ({ submitHandler }) => (
  <NoteInner submitHandler={submitHandler} value={{}} />
);

const mapDispatchToProps = dispatch => ({
  submitHandler: values => dispatch(noteAddAction(values)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CreateNote);
