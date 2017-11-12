import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import createBrowserHistory from 'history/createBrowserHistory';

ReactDOM.render(<App history={createBrowserHistory()} apiRoot='http://casefind.org' />, document.getElementById('root'));
registerServiceWorker();
