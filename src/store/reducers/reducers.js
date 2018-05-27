import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import notes from './notesReducer';

export default combineReducers({ notes, router });
