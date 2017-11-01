import * as $ from 'jquery';
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

// there's a type error here without the any. not sure what it's all about.
const middleware: any = ({dispatch, getState}) => (next) => (action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      trackLoad(action.payload.pathname);
      break;
  }
  next(action);
}

export default middleware;