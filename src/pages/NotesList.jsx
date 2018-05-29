// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { notesLoadAction, noteDeleteAction } from 'store/actions';
import NotePreview from 'components/NotePreview';

import routes from 'routes';

class NotesList extends PureComponent {
  componentDidMount() {
    this.props.dispatch(notesLoadAction());
  }

  render() {
    const { items } = this.props;
    return (
      <div className="">
        search
        {items.length
          ? items.map(item => (
            <NotePreview
              key={item.id}
              link={`${routes.list.path}/${item.id}`}
              item={item}
              active
              deleteHandler={() => this.deleteHandler(item.id)}
            />
          ))
        : 'There are no notes, create a fist one!'
        }
      </div>
    );
  }

  deleteHandler = (id) => {
    this.props.dispatch(noteDeleteAction(id));
  };
}

export default withRouter(connect(({ notes }) => ({ items: notes.items }))(NotesList));
