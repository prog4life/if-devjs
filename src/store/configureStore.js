module.exports = process.env.NODE_ENV === 'production'
  ? require('./configureStore.prod')
  : require('./configureStore.dev');

// if (process.env.NODE_ENV === 'production') {
//   module.exports = require('./configureStore.prod');
// } else {
//   module.exports = require('./configureStore.dev');
// }
