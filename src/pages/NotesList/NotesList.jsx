// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import cx from 'classnames';

import { notesLoadAction, noteDeleteAction } from 'store/actions';
import NotePreview from 'components/NotePreview';
import ListHeader from 'components/ListHeader';
import Icon from 'components/Icon';

import routes from 'routes';

import styles from './notes-list.styl';

class NotesList extends PureComponent {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { items, location, titlePlaceholder, textPlaceholder } = this.props;
    const isNewNotePage = routes.new.path === location.pathname;
    const showEmptyMessage = !items.length && !isNewNotePage;

    return (
      <div className={styles.wrapper}>
        <ListHeader />
        <div className={cx(styles.list, showEmptyMessage && styles.listEmpty)}>
          {isNewNotePage && (
            <NotePreview
              item={{
                title: titlePlaceholder,
                preview: textPlaceholder,
                editingDate: new Date(),
              }}
              noteless
              active
            />
          )}
          {!!items.length && (
            items.map(item => (
              <NotePreview
                key={item.id}
                link={`${routes.list.path}/${item.id}`}
                item={item}
                active
                deleteHandler={() => this.deleteHandler(item.id)}
              />
            ))
          )}
          {showEmptyMessage && (
            <div className={styles.empty}>
              <div className={styles.emptyTitle}>
                There are no notes
              </div>
              Create a fist one!
            </div>
          )}
        </div>
        <Link to={routes.new.path} className={styles.button}>
          <span className={styles.buttonText}>{routes.new.name}</span>
          <Icon type="note_add" />
        </Link>
      </div>
    );
  }

  deleteHandler = (id) => {
    this.props.onDelete(id);
  };
}

const mapStateToProps = ({notes: {
  items,
  titlePlaceholder,
  textPlaceholder,
}}) => ({
  items,
  titlePlaceholder,
  textPlaceholder,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(notesLoadAction()),
  onDelete: id => dispatch(noteDeleteAction(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotesList));
