/* eslint-disable no-underscore-dangle */

import { createStore, compose, applyMiddleware } from 'redux';
import { isProduction } from 'utils/environment';
import DevTools from 'utils/DevTools';
import reducers from 'redux/reducers';
import middleware from 'redux/middleware';

let enhancer = null;

if (isProduction) {
    enhancer = applyMiddleware(...middleware);
} else {
    enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? compose(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})(applyMiddleware(...middleware)))
        : compose(
              applyMiddleware(...middleware),
              DevTools.instrument()
          );
}

const store = createStore(reducers, enhancer);

export default store;
