import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import createPromiseMiddleware from 'redux-promise-middleware';
// to use with Chrome Extension
import { composeWithDevTools } from 'redux-devtools-extension';
// import { composeWithDevTools } from 'remote-redux-devtools';
import rootReducer from '../reducers';

const middleware = [
  apiMiddleware,
  createPromiseMiddleware(),
  thunkMiddleware,
];

const configureStore = (preloadedState = {}) => {
  const composeEnhancers = composeWithDevTools({
  //   realtime: true,
  //   port: 8000, // the port local "remotedev-server" is running at
  });

  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware)),
    // applyMiddleware(...middleware),
  );
};

export default configureStore;
