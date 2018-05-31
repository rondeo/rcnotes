import {
  NOTE_LOAD,
  NOTES_LOAD,
  NOTE_ADD,
  NOTE_EDIT,
  NOTE_DELETE,
  START,
  SUCCESS,
  FAIL,
} from 'store/constants';

const defaultState = {
  items: [],
  isLoading: false,
};

export default (state = defaultState, action) => {
  const { type } = action;
  const newState = { ...state };

  switch (type) {
    case NOTE_LOAD + START: {
      newState.isLoading = true;
      break;
    }
    case NOTE_LOAD + SUCCESS: {
      newState.isLoading = false;
      newState.item = action.payload.item;
      break;
    }
    case NOTE_LOAD + FAIL: {
      newState.isLoading = false;
      break;
    }
    case NOTES_LOAD + START: {
      newState.isLoading = true;
      break;
    }
    case NOTES_LOAD + SUCCESS: {
      newState.isLoading = false;
      newState.items = action.payload.items;
      break;
    }
    case NOTES_LOAD + FAIL: {
      newState.isLoading = false;
      break;
    }
    case NOTE_ADD: {
      newState.items = [
        action.payload, // TODO: payload.item
        ...state.items,
      ];
      break;
    }
    case NOTE_EDIT: {
      const items = state.items.filter(el => el.id !== action.payload.id);
      newState.items = [
        action.payload, // TODO: payload.item
        ...items,
      ];
      break;
    }
    case NOTE_DELETE: {
      newState.items = state.items.filter(el => el.id !== action.payload.id);
      break;
    }
  }

  return newState;
};
