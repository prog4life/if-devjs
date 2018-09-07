export function makeActionCreator(type, ...names) {
  if (typeof type !== 'string' || type === '') {
    throw new Error('Expected first argument to be not empty action type string');
  }
  const [handler] = names;

  if (typeof handler === 'function') {
    // new action creator
    return (...args) => {
      const payload = handler(...args);

      return {
        type,
        ...payload,
      };
    };
  }

  if (names.some(name => typeof name !== 'string')) {
    throw new Error('Expected action creator property names to be strings');
  }
  // new action creator
  return (...args) => {
    const payload = names.reduce((acc, name, index) => {
      acc[name] = args[index];

      return acc;
    }, {});

    const action = {
      type,
      ...payload,
    };

    return action;
  };
}

export function makeActionCreators(handlers) {
  if (typeof handlers !== 'object') {
    throw new Error('Expected object as first argument');
  }
  const types = Object.keys(handlers);

  if (types.some(t => typeof t !== 'string')) {
    throw new Error('Expected action types to be strings');
  }
  if (types.some(t => typeof handlers[t] !== 'function')) {
    throw new Error('Expected action type properties to have function values');
  }
  // 'SOME_ACTION_TYPE' -> someActionType
  const parseActionCreatorName = type => (
    type.split('_').map((word, index) => {
      const lowercased = word.trim().toLowerCase();
      if (index === 0) {
        return lowercased;
      }
      const firstLetter = lowercased.charAt(0).toUpperCase();

      return firstLetter + lowercased.slice(1);
    }).join('')
  );

  const actionCreators = types.reduce((acc, type) => {
    const actionCreatorName = parseActionCreatorName(type);
    // new action creator
    acc[actionCreatorName] = (...args) => {
      const handler = handlers[type];
      const payload = handler(...args);

      return {
        type,
        ...payload,
      };
    };

    return acc;
  }, {});

  return actionCreators;
}
