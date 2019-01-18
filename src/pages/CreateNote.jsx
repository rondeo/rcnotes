// @flow
import React from 'react';
import { connect } from 'react-redux';
import { noteAddAction } from 'store/actions';

import NoteInner from 'components/NoteInner';

const CreateNote = ({ titlePlaceholder, textPlaceholder, submitHandler }) => (
  <NoteInner
    value={{}}
    submitHandler={submitHandler}
    titlePlaceholder={titlePlaceholder}
    textPlaceholder={textPlaceholder}
  />
);

const mapStateToProps = ({notes: {
  titlePlaceholder,
  textPlaceholder,
}}) => ({
  titlePlaceholder,
  textPlaceholder,
});

const mapDispatchToProps = dispatch => ({
  submitHandler: values => dispatch(noteAddAction(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNote);
