// @flow
import React from 'react';
import { connect } from 'react-redux';

import NoteInner from 'components/NoteInner';
import NotFoundPage from 'components/NotFoundPage';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { noteAddAction, noteEditAction, noteDeleteAction } from 'store/notes/actions';
import { noteByIdSelector } from 'store/notes/selectors';
import routes from 'routes';

const NoteDetail = ({
  isLoading,
  item,
  titlePlaceholder,
  textPlaceholder,
  editHandler,
  addHandler,
  deleteHandler,
  isNewNote,
}) => {
  if (isLoading && !isNewNote) return <Loader absolute />;
  if (!item && !isNewNote) return <NotFoundPage />;
  return (
    <div>
      <Button theme="transparent" to={routes.list.path}>
          <Icon type="arrow_back" />
      </Button>
      <NoteInner
        value={isNewNote ? {} : item}
        submitHandler={isNewNote ? addHandler : editHandler}
        deleteHandler={isNewNote ? null : () => deleteHandler(item.id)}
        titlePlaceholder={titlePlaceholder}
        textPlaceholder={textPlaceholder}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {notes: {isLoading, titlePlaceholder, textPlaceholder}} = state;
  return ({
    isLoading,
    titlePlaceholder,
    textPlaceholder,
    item: ownProps.isNewNote ? null : noteByIdSelector(state, ownProps),
  });
}

const mapDispatchToProps = dispatch => ({
  deleteHandler: id => dispatch(noteDeleteAction(id)),
  editHandler: note => dispatch(noteEditAction(note)),
  addHandler: values => dispatch(noteAddAction(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetail);
