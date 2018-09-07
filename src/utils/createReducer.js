let isProduction = true;
try {
  isProduction = process.env.NODE_ENV === 'production';
} catch (e) {} // eslint-disable-line

export default function createReducer(...args) {
  let initialState;
  let handlers;

  if (args.length > 1) {
    [initialState, handlers] = args;
  } else {
    [handlers] = args;
  }

  if (typeof handlers !== 'object') {
    throw new Error('Expected object as map of action types to functions');
  }
  if (!isProduction && handlers['undefined']) { // eslint-disable-line dot-notation
    console.warn(`Reducer contains an 'undefined' action type.
      Have you misspelled a constant?`);
  }

  const newReducer = (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) { // eslint-disable-line
      return handlers[action.type](state, action);
    }
    return state;
  };
  return newReducer;
}

// var __DEV__ = false;
// try {
//   __DEV__ = process.env.NODE_ENV !== 'production';
// } catch (e) {}
//
// exports.createReducer = function createReducer(initialState, handlers) {
//   if (__DEV__ && handlers['undefined']) {
//     console.warn(
//       'Reducer contains an \'undefined\' action type. ' +
//       'Have you misspelled a constant?'
//     )
//   }
//
//   return function reducer(state, action) {
//     if (state === undefined) state = initialState;
//
//     if (handlers.hasOwnProperty(action.type)) {
//       return handlers[action.type](state, action);
//     } else {
//       return state;
//     }
//   };
// };
