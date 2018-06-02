// @flow
import React from 'react';
import { connect } from 'react-redux';

import { noteEditAction, noteDeleteAction } from 'store/actions';
import { noteByIdSelector } from 'store/selectors';
import NoteInner from 'components/NoteInner';
import NotFoundPage from 'components/NotFoundPage';

const NoteDetail = ({ item, submitHandler, deleteHandler }) => {
  if (!item) return <NotFoundPage />;
  return (
    <NoteInner
      initialValues={item}
      submitHandler={submitHandler}
      deleteHandler={deleteHandler}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  item: noteByIdSelector(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
  deleteHandler: id => dispatch(noteDeleteAction(id)),
  submitHandler: note => dispatch(noteEditAction(note)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetail);
