// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NoteDetail from 'pages/NoteDetail';
import NotesList from 'pages/NotesList';
import CreateNote from 'pages/CreateNote';

import routes from 'routes';

import styles from './notes.styl';

const Notes = () => (
  <div className={styles.wrapper}>
    <section className={styles.list}>
      <NotesList />
    </section>
    <section className={styles.detail}>
      <Switch>
        <Route exact path={routes.new.path} component={CreateNote} />
        <Route exact path={`${routes.list.path}/:id`} component={NoteDetail} />
      </Switch>
    </section>
  </div>
);

export default Notes;
