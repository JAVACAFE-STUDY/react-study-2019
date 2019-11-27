import React from 'react';
import logo from './logo.svg';
import './App.css';
import TimelineMain from './component/TimelineMain';

// import {createStore, combineReducers} from 'redux';
// import timelineReducer, {
//   addTimeline,
//   removeTimeline,
//   editTimeline,
//   increaseNextPage
// } from './timeline/state';
// import friendReducer, {
//   addFriend,
//   removeFriend,
//   editFriend,
// } from './friend/state';

// const reducer = combineReducers({
//   timeline: timelineReducer,
//   friend: friendReducer,
// });

// const store = createStore(reducer);

// store.subscribe(() => {
//   const state = store.getState();
//   console.log(state);
// });

// store.dispatch(addTimeline({id: 1, desc: 'wdqwdqdqw'}));
// store.dispatch(addTimeline({id: 2, desc: 'xsxswdwdwd'}));
// store.dispatch(increaseNextPage());
// store.dispatch(editTimeline({id: 1, desc: 'wdqdwwdwwdwd'}));
// store.dispatch(removeTimeline({id: 1}));

// store.dispatch(addFriend({id: 1, desc: 'wdqwdqdqw'}));
// store.dispatch(addFriend({id: 2, desc: 'xsxswdwdwd'}));
// store.dispatch(editFriend({id: 1, desc: 'wdqdwwdwwdwd'}));
// store.dispatch(removeFriend({id: 1}));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <TimelineMain />
    </div>
  );
}

export default App;
