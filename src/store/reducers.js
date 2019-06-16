import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import notes from './notes/reducer';
import menu from './menu/reducer';
import user from './user/reducer';

export default combineReducers({
  user,
  menu,
  notes,
  router,
});
