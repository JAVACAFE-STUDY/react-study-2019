import React, {useEffect, useState} from 'react';
import store from '../common/store';
import {getNextTimeline} from '../common/mockData';
import {addTimeline} from '../timeline/state';
import TimeLineList from './TimelineList';
import {useDispatch, useSelector} from 'react-redux';

function TimelineMain() {
  const dispatch = useDispatch();
  //const [timelines, setTimelines] = useState([]);
  const timelines = useSelector(state => state.timeline.timelines); 

  // useEffect(() => {
  //   const unsubscrive = store.subscribe(() => {
  //     setTimelines(store.getState().timeline.timelines);
  //   });
    
  //   return () => unsubscrive();
  // }, []);

  const onAdd = () => {
    const timeline = getNextTimeline();
    //store.dispatch(addTimeline(timeline));
    dispatch(addTimeline(timeline));
  };

  return (
    <div>
      <button onClick={onAdd}>타임라인추가</button>
      <TimeLineList timelines={timelines} />
    </div>
  );
};

export default TimelineMain;

