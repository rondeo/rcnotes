// @flow
import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { singleNoteLoadAction, noteEditAction, noteDeleteAction } from 'store/actions';
import NoteInner from 'components/NoteInner';
import NotFoundPage from 'components/NotFoundPage';

class NoteDetail extends PureComponent {
  componentDidMount() {
    this.props.dispatch(singleNoteLoadAction(this.props.id));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id === this.props.id) return;
    this.props.dispatch(singleNoteLoadAction(nextProps.id));
  }

  render() {
    const { item } = this.props;
    if (!item) return <NotFoundPage />;
    return (
      <NoteInner
        initialValues={item && { ...item }}
        submitHandler={this.submitHandler}
        item={item}
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

export default withRouter(connect(({ notes }) => ({ item: notes.item }))(NoteDetail));
