declare var statics: any;

import * as React    from 'react';
import * as ReactDOM from 'react-dom';
import Root from './root';
import history from './helpers/history';

ReactDOM.render(
  React.createElement(Root, {statics, history}), 
  document.getElementById('react-container')
);
