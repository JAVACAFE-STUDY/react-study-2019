import createReducer from '../common/createReducer';

export default function createItemsLogic(name) {

  const ADD = Symbol(`${name}/ADD`);
  const REMOVE = Symbol(`${name}/REMOVE`);
  const EDIT = Symbol(`${name}/EDIT`);
  
  const add = item => ({type: ADD, item});
  const remove = item => ({type: REMOVE, item});
  const edit = item => ({type: EDIT, item});
  
  const INIT_STATE = {[name]: []};

  const reducer = createReducer(INIT_STATE, {
    [ADD]: (state, action) => state[name].push(action.item),
    [REMOVE]: (state, action) => (
      state[name] = state[name].filter(
        item => item.id !== action.item.id
      )
    ),
    [EDIT]: (state, action) => {
      const index = state[name].findIndex(item => item.id === action.item.id);

      if (index >= 0) {
        state[name][index] = action.item;
      }
    },
  });

  return {add, remove, edit, reducer};

}
