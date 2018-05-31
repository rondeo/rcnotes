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
      item={item}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  item: noteByIdSelector(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
  deleteHandler: id => dispatch(noteDeleteAction(id)),
  submitHandler: ({ id, title, text }) => dispatch(noteEditAction({ id, title, text })),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetail);
