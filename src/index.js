import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './js/App';
import UserInput from './js/UserInput';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<lel />, document.getElementById('root'));
ReactDOM.render(<UserInput />, document.getElementById('user-input'));
registerServiceWorker();
