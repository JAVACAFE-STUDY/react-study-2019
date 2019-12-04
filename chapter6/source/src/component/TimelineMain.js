import React, {useEffect, useState} from 'react';
import {getNextTimeline} from '../common/mockData';
import {addTimeline} from '../timeline/state';
import TimeLineList from './TimelineList';
import {useDispatch, useSelector} from 'react-redux';

function TimelineMain() {
  const dispatch = useDispatch();
  const timelines = useSelector(state => state.timeline.timelines); 

  const onAdd = () => {
    const timeline = getNextTimeline();
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

