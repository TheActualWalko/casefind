import $ = require('jquery');
import {debounce} from 'lodash';
import {LOCATION_CHANGE} from 'react-router-redux';

const track = (action, data) => {
  if (typeof window !== 'undefined') {
    $.post(
      '/track', 
      { action, data }
    );
  }
}

const trackLoad = (pathname) => {
  track('load', pathname);
}

export default ({dispatch, getState}) => (next) => (action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      trackLoad(action.payload.pathname);
      break;
  }
  next(action);
}