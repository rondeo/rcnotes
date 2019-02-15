/* eslint-disable import/prefer-default-export */
import {
  USER_LOGIN,
  USER_REGISTER,
  USER_LOGOUT,
} from './constants';

export const loginAction = data => ({
  type: USER_LOGIN,
});

export const registerAction = data => ({
  type: USER_REGISTER,
});

export const logoutAction = () => ({
  type: USER_LOGOUT,
});
