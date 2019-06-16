import {
  MENU_OPEN,
  MENU_CLOSE,
  MENU_TOGGLE,
} from './constants';

const defaultState = {
  isOpen: false,
};

export default (state = defaultState, action) => {
  const { type } = action;
  const newState = {...state};

  switch (type) {
    case MENU_OPEN: {
      newState.isOpen = true;
      break;
    }
    case MENU_CLOSE: {
      newState.isOpen = false;
      break;
    }
    case MENU_TOGGLE: {
      newState.isOpen = !state.isOpen;
      break;
    }
  }

  return newState;
};