// @flow
import { createSelector } from 'reselect';

export const notesSelector = state => state.notes.items;
export const idSelector = (state, props) => +props.match.params.id;

export const noteByIdSelector = createSelector(notesSelector, idSelector, (notes, id) => {
  for (const item of notes) {
    if (item.id === id) return item;
  }
  return null;
});
