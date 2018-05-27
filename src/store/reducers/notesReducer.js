import {
  NOTES_LOAD,
  NOTE_ADD,
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
  }

  return newState;
};
