import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UserList from './js/UserList';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<UserList />, document.getElementById('user-list'));
registerServiceWorker();
