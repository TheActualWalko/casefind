// import * as $ from 'jquery';
// import {debounce} from 'lodash';
import {LOCATION_CHANGE} from 'react-router-redux';

const post = (url, params) => {
  console.log(`analytics posting to ${url}`, params);
}

const track = (action, data) => {
  if (typeof window !== 'undefined') {
    post(
      '/track', 
      { action, data }
    );
  }
}

const trackLoad = (pathname) => {
  track('load', pathname);
}

const middleware = ({dispatch, getState}) => (next) => (action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      trackLoad(action.payload.pathname);
      break;
    default:
      break;
  }
  next(action);
}

export default middleware;