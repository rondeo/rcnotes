// @flow
import React from 'react';
import { Route } from 'react-router-dom';

import NoteDetail from 'pages/NoteDetail';
import NotesList from 'pages/NotesList';

import routes from 'routes';

import styles from './notes.styl';

const Notes = () => (
  <div className={styles.root}>
    <section className={styles.rootList}>
      <NotesList />
    </section>
    <section className={styles.rootDetail}>
      <Route
        exact
        path={`${routes.list.path}/:id`}
        render={({ match }) => <NoteDetail id={+match.params.id} />}
      />
    </section>
  </div>
);


export default Notes;
