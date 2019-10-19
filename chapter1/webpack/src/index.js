import {Container} from './simple4';
import React from 'react';
import ReactDOM from 'react-dom';

const domContainer = document.querySelector('#react-root');
ReactDOM.render(React.createElement(Container), domContainer);