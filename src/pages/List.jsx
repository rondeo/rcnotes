// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { notesLoadAction } from 'store/actions';
import Note from 'components/Note';

class List extends PureComponent {
  componentDidMount() {
    this.props.dispatch(notesLoadAction());
  }

  render() {
    const { items } = this.props;
    return (
      <section>
        {items.length
          ? items.map(item => (
            <Note
              key={item.id}
              title={item.title}
              date={item.date}
              preview={item.preview}
              active
            />
          ))
        : 'There are no notes'
        }
      </section>
    );
  }
}

export default connect(({ notes }) => ({ items: notes.items }))(List);
