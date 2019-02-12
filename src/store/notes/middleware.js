import { push } from 'react-router-redux';
import db from 'database';
import routes from 'routes';
import { readFile, downloadFile } from 'utils';
import { notesLoadAction } from './actions';
import {
  NOTE_LOAD,
  NOTES_LOAD,
  NOTE_ADD,
  NOTE_EDIT,
  NOTE_DELETE,
  NOTE_EXPORT,
  NOTE_IMPORT,
} from './constants';
import {
  START,
  SUCCESS,
  FAIL,
} from 'store/constants';

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

      const date = +new Date();
      const noteData = {
        ...rest,
        id: date,
        title,
        preview,
        creationDate: date,
        editingDate: date,
      };

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
      return;
    }
    case NOTE_IMPORT: {
      next({
        ...action,
      });
      const { file, table } = action.payload;
      readFile(file)
        .then((data) => {
          db
            .addItems(table, JSON.parse(data))
            .then(() => {
              store.dispatch(notesLoadAction());
            })
            .catch(error => errorAction(error));
        });
      return;
    }
    case NOTE_EXPORT: {
      db
        .getItems(payload.table)
        .then((notes) => {
          const data = JSON.stringify(notes);
          downloadFile(data, 'rcnotes.json', 'application/json');
        })
        .catch(error => errorAction(error));
      return;
    }
    default: {
      next(action);
    }
  }
};
