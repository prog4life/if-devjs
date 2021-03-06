import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import immutabilityWatcher from 'redux-immutable-state-invariant';
import freeze from 'redux-freeze';
import { createLogger } from 'redux-logger';
// to use with Chrome Extension
import { composeWithDevTools } from 'redux-devtools-extension';
// import { composeWithDevTools } from 'remote-redux-devtools';
import rootReducer from '../reducers';

// must be the last middleware in chain
const logger = createLogger({
  duration: true,
  // predicate: (getState, action) => action.type !== 'SEARCH_UPDATE'
  predicate: (getState, action) => {
    const hiddenTypes = [
      // 'REQUEST_START',
      // 'REQUEST_SUCCESS',
      // 'REQUEST_FAIL',
    ];
    return !hiddenTypes.some(type => type === action.type);
  },
});

const watcher = immutabilityWatcher();

const middleware = [watcher, freeze, thunk, logger];

const configureStore = (preloadedState = {}) => {
  const composeEnhancers = composeWithDevTools({
    // realtime: true,
    // port: 8000, // the port local "remotedev-server" is running at
  });

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware)),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
