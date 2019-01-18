import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import reducer from './reducers';
import customRouterMiddleware from './middlewares/routerMiddleware';
import logger from './middlewares/loggerMiddleware';
import database from './middlewares/databaseMiddleware';
import history from './history';

const isProduction = process.env.NODE_ENV === 'production';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;
/* eslint-enable */

const middlewares = [
  database,
  customRouterMiddleware,
  routerMiddleware(history),
];

if (!isProduction) middlewares.push(logger);

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);
window.store = store;

export default store;
