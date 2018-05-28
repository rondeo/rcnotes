import {
  NOTE_LOAD,
  NOTES_LOAD,
  NOTE_ADD,
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
    case NOTE_DELETE:
      newState.items = state.items.filter(el => el.id !== action.payload.id);
      return newState;
  }

  return newState;
};
