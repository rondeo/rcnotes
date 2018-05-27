/* eslint-disable import/prefer-default-export */
import {
  NOTES_LOAD,
  NOTE_ADD,
} from './constants';

export function notesLoadAction() {
  return {
    type: NOTES_LOAD,
    payload: {
      table: 'notes',
    },
  };
}

export function noteAddAction({ title, text }) {
  return {
    type: NOTE_ADD,
    payload: {
      title,
      text,
      table: 'notes',
    },
  };
}
