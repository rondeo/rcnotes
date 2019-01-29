import {
  USER_LOGIN,
  USER_REGISTER,
  USER_LOGOUT,
} from './constants';

const defaultState = {
  isLoggined: false,
  name: '',
  email: '',
};

export default (state = defaultState, action) => {
  const { type } = action;
  const newState = { ...state };

  switch (type) {
    case USER_LOGIN:
    case USER_REGISTER: {
      newState.isLoggined = true;
      break;
    }
    case USER_LOGOUT: {
      newState.isLoggined = false;
      break;
    }
  }

  return newState;
};
