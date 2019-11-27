//import createReducer from '../common/createReducer';

// const ADD = Symbol('friend/ADD');
// const REMOVE = Symbol('friend/REMOVE');
// const EDIT = Symbol('friend/EDIT');

// export const addFriend = friend => ({type: ADD, friend});
// export const removeFriend = friend => ({type: REMOVE, friend});
// export const editFriend = friend => ({type: EDIT, friend});

// const INIT_STATE = {friends: []};

// const reducer = createReducer(INIT_STATE, {
//   [ADD]: (state, action) => state.friends.push(action.friend),
//   [REMOVE]: (state, action) => (
//     state.friends = state.friends.filter(
//       friend => friend.id !== action.friend.id
//     )
//   ),
//   [EDIT]: (state, action) => {
//     const index = state.friends.findIndex(friend => friend.id === action.friend.id);

//     if (index >= 0) {
//       state.friends[index] = action.friend;
//     }
//   }
// });

import createItemLogic from '../common/createItemsLogic';

const {add, remove, edit, reducer} = createItemLogic('friends');

export const addFriend = add;
export const removeFriend = remove;
export const editFriend = edit;

export default reducer;