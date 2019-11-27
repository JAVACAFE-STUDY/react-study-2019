import produce from 'immer';

export default function createReducer(init, handleMap) {
  return function(state = init, action) {
    return produce(state, draft => {
      const handle = handleMap[action.type];
      if (handle) {
        handle(draft, action);
      }
    });
  };
};