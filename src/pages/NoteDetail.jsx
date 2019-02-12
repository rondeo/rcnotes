// @flow
import React from 'react';
import { connect } from 'react-redux';

import { noteEditAction, noteDeleteAction } from 'store/notes/actions';
import { noteByIdSelector } from 'store/notes/selectors';
import NoteInner from 'components/NoteInner';
import NotFoundPage from 'components/NotFoundPage';
import Loader from 'components/Loader';

const NoteDetail = ({ isLoading, item, submitHandler, deleteHandler }) => {
  if (isLoading) return <Loader absolute />;
  if (!item) return <NotFoundPage />;
  return (
    <NoteInner
      value={item}
      submitHandler={submitHandler}
      deleteHandler={() => deleteHandler(item.id)}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.notes.isLoading,
  item: noteByIdSelector(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
  deleteHandler: id => dispatch(noteDeleteAction(id)),
  submitHandler: note => dispatch(noteEditAction(note)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetail);
