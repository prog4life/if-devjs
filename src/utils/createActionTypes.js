export default function createActionTypes(types) {
  if (!Array.isArray(types)) {
    throw new Error('Expected array of action types');
  }

  const constants = {};

  types.forEach((type) => {
    constants[type] = type;
  });

  return constants;
}

// const actionTypes = createActionTypes([
//     'HELLO',
//     'THERE',
//     'WORLD'
// ]);
//
// export default actionTypes;
