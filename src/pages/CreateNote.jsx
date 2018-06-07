// @flow
import React from 'react';
import { connect } from 'react-redux';
import { noteAddAction } from 'store/actions';

import NoteEditor from 'components/NoteInner';

const CreateNote = ({ submitHandler }) => (
  <NoteEditor submitHandler={submitHandler} value={{}} />
);

const mapDispatchToProps = dispatch => ({
  submitHandler: values => dispatch(noteAddAction(values)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CreateNote);
