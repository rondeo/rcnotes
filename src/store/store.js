import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import reducer from './reducers';
import logger from './middlewares/loggerMiddleware';
import database from './middlewares/databaseMiddleware';
import history from './history';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;
/* eslint-enable */

const middlewares = composeEnhancers(applyMiddleware(
  database,
  routerMiddleware(history),
  logger,
));

const store = createStore(
  reducer,
  middlewares,
);
window.store = store;

export default store;
