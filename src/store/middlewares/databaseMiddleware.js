import { push } from 'react-router-redux';
import db from 'database';
import routes from 'routes';
import {
  NOTE_LOAD,
  NOTES_LOAD,
  NOTE_ADD,
  NOTE_EDIT,
  NOTE_DELETE,
  START,
  SUCCESS,
  FAIL,
} from '../constants';

const PREVIEW_LENGTH = 100;

export default store => next => (action) => {
  const { type, payload } = action;

  const errorAction = (error) => {
    next({
      ...action,
      type: type + FAIL,
      error,
    });
  };

  switch (type) {
    case NOTE_LOAD: {
      next({
        ...action,
        type: type + START,
      });

      db
        .getItem(payload.table, payload.id)
        .then((note) => {
          next({
            type: type + SUCCESS,
            payload: {
              ...payload,
              item: note,
            },
          });
        })
        .catch(error => errorAction(error));
      return;
    }
    case NOTES_LOAD: {
      next({
        ...action,
        type: type + START,
      });

      db
        .getItems(payload.table)
        .then((notes) => {
          next({
            type: type + SUCCESS,
            payload: {
              ...payload,
              items: notes,
            },
          });
        })
        .catch(error => errorAction(error));
      return;
    }
    case NOTE_ADD: {
      let { table, title, preview, ...rest } = action.payload;
      if (!title.length || title === ' ') {
        title = preview.split('\n')[0];
      }
      preview = preview.replace(/\n/ig, ' ').slice(0, PREVIEW_LENGTH);

      const noteData = { ...rest, title, preview, creationDate: +new Date(), editingDate: +new Date() };

      db
        .addItem(table, { ...noteData })
        .then((noteId) => {
          next({
            ...action,
            payload: {
              ...noteData,
              id: noteId,
            },
          });
          return noteId;
        })
        .then((noteId) => {
          store.dispatch(push(`${routes.list.path}/${noteId}`));
        })
        .catch(error => errorAction(error));
      return;
    }
    case NOTE_EDIT: {
      const { id, table, ...rest } = action.payload;
      const noteData = { ...rest, editingDate: +new Date() };
      db
        .editItem(table, id, noteData)
        .then((noteId) => {
          next({
            ...action,
            payload: {
              ...noteData,
              id,
            },
          });
          return noteId;
        })
        .catch(error => errorAction(error));
      return;
    }
    case NOTE_DELETE: {
      db
        .deleteItem(payload.table, payload.id)
        .then((noteId) => {
          next({
            ...action,
            payload: {
              ...action.payload,
              id: noteId,
            },
          });
        })
        .then(() => {
          store.dispatch(push(routes.list.path));
        })
        .catch(error => errorAction(error));
    }
    default: {
      next(action);
    }
  }
};
