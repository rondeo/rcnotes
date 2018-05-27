import db from '../../database';
import {
  NOTES_LOAD,
  NOTE_ADD,
  START,
  SUCCESS,
  FAIL,
} from '../constants';

export default store => next => (action) => {
  const { type, payload } = action;
  next({
    ...action,
    type: type + START,
  });

  switch (type) {
    case NOTES_LOAD: {
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
        .catch((error) => {
          next({
            ...action,
            type: type + FAIL,
            error,
          });
        });
      return;
    }
    case NOTE_ADD: {
      const noteContent = {
        title: action.payload.title,
        text: action.payload.text,
      };
      db
        .addItem(action.payload.table, noteContent)
        .then((noteId) => {
          next({
            ...action,
            payload: {
              ...action.payload,
              id: noteId,
            },
          });
          return noteId;
        });
      return;
    }
    default: {
      next(action);
    }
  }
};
