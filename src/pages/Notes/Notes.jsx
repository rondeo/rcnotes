// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import cx from 'classnames';

import NoteDetail from 'pages/NoteDetail';
import NotesList from 'pages/NotesList';
import CreateNote from 'pages/CreateNote';

import routes from 'routes';

import styles from './notes.styl';

const Notes = ({ match }) => (
  <div className={styles.wrapper}>
    <section className={cx(styles.list, !match.isExact && styles.listHidden)}>
      <NotesList />
    </section>
    <section className={cx(styles.detail, match.isExact && styles.detailHidden)}>
      <Switch>
        <Route exact path={routes.new.path} component={CreateNote} />
        <Route exact path={`${routes.list.path}/:id`} component={NoteDetail} />
      </Switch>
    </section>
  </div>
);

export default Notes;
