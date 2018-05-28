// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { singleNoteLoadAction, noteEditAction, noteDeleteAction } from 'store/actions';
import NoteInner from 'components/NoteInner';
import NotFoundPage from 'components/NotFoundPage';

class NoteDetail extends PureComponent {
  componentDidMount() {
    this.props.dispatch(singleNoteLoadAction(this.props.id));
  }

  render() {
    const { item } = this.props;
    if (!item) return <NotFoundPage />;
    return (
      <NoteInner
        initialValues={item && { ...item }}
        submitHandler={this.submitHandler}
        title={item.title}
        text={item.text}
      />
    );
  }

  deleteHandler = (id) => {
    this.props.dispatch(noteDeleteAction(id));
  }
  submitHandler = ({ id, title, text }) => {
    this.props.dispatch(noteEditAction({ id, title, text }));
  }
}

export default connect(({ notes }) => ({ item: notes.item }))(NoteDetail);
