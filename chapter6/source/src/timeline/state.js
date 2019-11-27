// import createReducer from '../common/createReducer';

// const ADD = Symbol('timeline/ADD');
// const REMOVE = Symbol('timeline/REMOVE');
// const EDIT = Symbol('timeline/EDIT');
// const INCREATE_NEXT_PAGE = Symbol('timeline/INCREATE_NEXT_PAGE');

// export const addTimeline = timeline => ({type: ADD, timeline});
// export const removeTimeline = timeline => ({type: REMOVE, timeline});
// export const editTimeline = timeline => ({type: EDIT, timeline});
// export const increaseNextPage = () => ({type: INCREATE_NEXT_PAGE});

// const INIT_STATE = {timelines: [], nextPage: 0};

// const reducer = createReducer(INIT_STATE, {
//   [ADD]: (state, action) => state.timelines.push(action.timeline),
//   [REMOVE]: (state, action) => (
//     state.timelines = state.timelines.filter(
//       timeline => timeline.id !== action.timeline.id
//     )
//   ),
//   [EDIT]: (state, action) => {
//     const index = state.timelines.findIndex(timeline => timeline.id === action.timeline.id);

//     if (index >= 0) {
//       state.timelines[index] = action.timeline;
//     }
//   },
//   [INCREATE_NEXT_PAGE]: (state, action) => (state.nextPage += 1),
// });

// export default reducer;


import createItemLogic from '../common/createItemsLogic';
import createReducer from '../common/createReducer';
import mergeReducers from '../common/mergeReducers';

const {add, remove, edit, reducer: timelineReducer} = createItemLogic('timelines');

const INCREATE_NEXT_PAGE = Symbol('timeline/INCREATE_NEXT_PAGE');

export const addTimeline = add;
export const removeTimeline = remove;
export const editTimeline = edit;
export const increaseNextPage = () => ({type: INCREATE_NEXT_PAGE});

const INIT_STATE = {nextPage: 0};

const reducer = createReducer(INIT_STATE, {
  [INCREATE_NEXT_PAGE]: (state, action) => (state.nextPage += 1),
});

const reducers = [timelineReducer, reducer];

export default mergeReducers(reducers);