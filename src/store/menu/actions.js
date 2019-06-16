/* eslint-disable import/prefer-default-export */
import {
  MENU_OPEN,
  MENU_CLOSE,
  MENU_TOGGLE,
} from './constants';

export const openMenuAction = () => ({
  type: MENU_OPEN,
});

export const closeMenuAction = () => ({
  type: MENU_CLOSE,
});

export const toggleMenuAction = () => ({
  type: MENU_TOGGLE,
});
