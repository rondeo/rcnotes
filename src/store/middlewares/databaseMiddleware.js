import db from '../../database';
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
      const { table, ...rest } = action.payload;
      const noteData = { ...rest, date: +new Date() };
      db
        .addItem(table, { ...rest })
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
        .catch(error => errorAction(error));
      return;
    }
    case NOTE_EDIT: {
      const { id, table, ...rest } = action.payload;
      const noteData = { ...rest, date: +new Date() };
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
          return noteId;
        })
        .catch((error) => {
          next({
            ...action,
            type: type + FAIL,
            error,
          });
        });
    }
    default: {
      next(action);
    }
  }
};
