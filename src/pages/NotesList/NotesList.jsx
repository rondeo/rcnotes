// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { notesLoadAction, noteDeleteAction } from 'store/actions';
import NotePreview from 'components/NotePreview';
import ListHeader from 'components/ListHeader';

import routes from 'routes';

import styles from './notes-list.styl';

class NotesList extends PureComponent {
  componentDidMount() {
    this.props.dispatch(notesLoadAction());
  }

  render() {
    const { items, location } = this.props;
    return (
      <div className={styles.wrapper}>
        <ListHeader />
        <div className={styles.list}>
          {routes.new.path === location.pathname && (
            <NotePreview
              link={routes.new.path}
              item={{
                title: 'An awesome new note',
                text: 'Write something',
                editingDate: new Date(),
              }}
              noteless
              active
            />
          )}
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
      </div>
    );
  }

  deleteHandler = (id) => {
    this.props.dispatch(noteDeleteAction(id));
  };
}

export default withRouter(connect(({ notes }) => ({ items: notes.items }))(NotesList));
