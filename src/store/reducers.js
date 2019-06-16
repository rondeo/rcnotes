import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import notes from './notes/reducer';
import menu from './menu/reducer';

export default combineReducers({
  menu,
  notes,
  router,
});
