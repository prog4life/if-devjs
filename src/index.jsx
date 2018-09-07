import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from 'store/configureStore';

import App from 'components/App';

// import 'styles/index.scss'; // included from webpack entry config

if (process.env.NODE_ENV === 'development') {
  const { registerObserver } = require('react-perf-devtool');

  registerObserver({ // both options for logging to console with additional lib
    // shouldLog: true,
    // port: 8080,
    // components: ['ControlButtons'],
  }, measures => measures); // can log "measures" right to console
}

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

const store = configureStore();

store.subscribe(() => console.log('State update'));

ReactDOM.render(<App store={store} />, document.getElementById('app'));
