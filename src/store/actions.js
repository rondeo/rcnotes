/* eslint-disable import/prefer-default-export */
import {
  NOTE_LOAD,
  NOTES_LOAD,
  NOTE_ADD,
  NOTE_EDIT,
  NOTE_DELETE,
} from './constants';

export function singleNoteLoadAction(id) {
  return {
    type: NOTE_LOAD,
    payload: {
      id,
      table: 'notes',
    },
  };
}

export function notesLoadAction() {
  return {
    type: NOTES_LOAD,
    payload: {
      table: 'notes',
    },
  };
}

export function noteAddAction({ ...data }) {
  return {
    type: NOTE_ADD,
    payload: {
      ...data,
      table: 'notes',
    },
  };
}

export function noteEditAction({ id, ...data }) {
  return {
    type: NOTE_EDIT,
    payload: {
      id,
      ...data,
      table: 'notes',
    },
  };
}

export function noteDeleteAction(id) {
  return {
    type: NOTE_DELETE,
    payload: {
      id,
      table: 'notes',
    },
  };
}
