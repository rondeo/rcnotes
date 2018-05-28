// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { notesLoadAction, noteDeleteAction } from 'store/actions';
import NotePreview from 'components/NotePreview';

import routes from '../routes';

class NotesList extends PureComponent {
  componentDidMount() {
    this.props.dispatch(notesLoadAction());
  }

  render() {
    const { items } = this.props;
    return (
      <section>
        {items.length
            ? items.map(item => (
              <NotePreview
                key={item.id}
                link={`${routes.list.path}/${item.id}`}
                id={item.id}
                title={item.title}
                date={item.date}
                preview={item.preview}
                active
                deleteHandler={() => this.deleteHandler(item.id)}
              />
            ))
          : 'There are no notes'
          }
      </section>
    );
  }

  deleteHandler = (id) => {
    this.props.dispatch(noteDeleteAction(id));
  };
}

export default connect(({ notes }) => ({ items: notes.items }))(NotesList);
