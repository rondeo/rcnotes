import db from 'database';
import {
  USER_LOGIN,
  USER_REGISTER,
  USER_LOGOUT,
} from './constants';
import {
  START,
  SUCCESS,
  FAIL,
} from 'store/constants';

export default store => next => (action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN: {
      return;
    }
    default: {
      next(action);
    }
  }
};
